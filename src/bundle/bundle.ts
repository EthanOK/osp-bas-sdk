import { Buffer } from "buffer";
import * as fs from "fs";
import * as path from "path";
import * as os from "node:os";
import { BundleMeta, HashAlgo, BundleVersion } from "./proto/meta";
type BundleMetaType = {
  meta?: ReturnType<
    () => {
      name?: string;
      offset?: number;
      size?: number;
      hash_algo?: HashAlgo;
      hash?: Uint8Array;
      content_type?: string;
      tags?: { [p: string]: string };
    }
  >[];
};
type ObjectMetaType = {
  name?: string;
  offset?: number;
  size?: number;
  hash_algo?: HashAlgo;
  hash?: Uint8Array;
  content_type?: string;
  tags?: { [p: string]: string };
};

export class Bundle {
  version: BundleVersion;
  metaSize: number;
  meta: BundleMetaType;
  writeFile: fs.WriteStream | null;
  readFile: fs.ReadStream | null;
  bundleFileName: string;
  dataSize: number;
  finalized: boolean;
  constructor(options?: {
    version: BundleVersion;
    metaSize: number;
    meta: BundleMetaType;
    writeFile: fs.WriteStream | null;
    readFile: fs.ReadStream | null;
    bundleFileName: string;
    dataSize: number;
    finalized: boolean;
  }) {
    if (options) {
      this.version = options.version;
      this.metaSize = options.metaSize;
      this.meta = options.meta;
      this.writeFile = options.writeFile;
      this.readFile = options.readFile;
      this.bundleFileName = options.bundleFileName;
    } else {
      this.version = BundleVersion.V1;
      this.metaSize = 0;
      this.meta = { meta: [] };
      this.writeFile = null;
      this.readFile = null;
      this.bundleFileName = "";
    }
    this.dataSize = 0;
    this.finalized = false;
  }

  static async newBundle(): Promise<{
    bundle: Bundle;
    fd: fs.promises.FileHandle;
  }> {
    const tempDir = path.join(process.env.TEMP || os.tmpdir(), "tempBundleDir");
    await fs.promises.mkdir(tempDir, { recursive: true });

    // const dir = await fs.promises.mkdtemp(path.join(tempDir, "tempBundle"));
    const bundleFile = path.join(tempDir, `tempFile-${Date.now()}.tmp`);

    const fd = await fs.promises.open(bundleFile, "w");
    // await fd.close()

    const readFile = fs.createReadStream(bundleFile);
    const bundle = new Bundle({
      version: BundleVersion.V1,
      metaSize: 0,
      meta: { meta: [] },
      writeFile: fs.createWriteStream(bundleFile),
      readFile,
      bundleFileName: bundleFile,
      dataSize: 0,
      finalized: false,
    });
    return { bundle, fd };
  }

  static async newBundleFromFile(path: string): Promise<Bundle> {
    const bundleFile = await fs.promises.open(path, "r");
    const stat = await fs.promises.stat(path);
    const dataSize = stat.size;
    const seekPosition = dataSize - (8 + 8); // VersionLength + MetaSizeLength

    const buf = Buffer.alloc(16);
    await bundleFile.read(buf, seekPosition);

    const version = buf.readBigUInt64BE(8);
    if (version !== BigInt(BundleVersion.V1)) {
      throw new Error("Invalid version");
    }

    const metaSize = buf.readBigUInt64BE(0);
    if (metaSize === BigInt(0)) {
      throw new Error("Empty bundle");
    }

    const metaBuf = Buffer.alloc(Number(metaSize));
    await bundleFile.read(metaBuf, dataSize - (Number(metaSize) + 8 + 8));

    const bundle = new Bundle({
      version: Number(version),
      metaSize: Number(metaSize),
      meta: { meta: [] },
      writeFile: null,
      readFile: fs.createReadStream(path),
      bundleFileName: path,
      dataSize: stat.size,
      finalized: true,
    });

    bundle.meta = BundleMeta.deserialize(metaBuf).toObject();
    return bundle;
  }

  async appendObject(
    name: string,
    reader: ReadableStream,
    options?: AppendObjectOptions
  ): Promise<ObjectMetaType> {
    if (this.finalized) {
      throw new Error("Append not allowed");
    }

    const objMeta = this.getObjectMeta(name);
    if (objMeta) {
      throw new Error("Duplicated name");
    }

    const written = await new Promise<number>((resolve, reject) => {
      const readerDefault = reader.getReader();
      let totalWritten = 0;

      const readStream = async () => {
        let result = await readerDefault.read();
        while (!result.done) {
          try {
            // console.log(result.value.length);
            this.writeFile!.write(result.value);
            totalWritten += result.value.length;
            // console.log(`totalWritten = ${totalWritten}`);
            result = await readerDefault.read();
          } catch (e) {
            console.error("!!!!!!!!!!");
          }
        }
        if (result.value) {
          this.writeFile!.write(result.value);
          totalWritten += result.value.length;
        }
        // console.log(totalWritten);
        resolve(totalWritten);
      };
      readStream().catch(reject);
    });
    // console.log(`appendObject written = ${written}`);
    //this.dataSize+= written;

    const objMetaNew = {
      name: name,
      offset: this.dataSize,
      size: written,
      hash_algo: HashAlgo.Unknown,
      hash: new Uint8Array(0),
      content_type: "",
      tags: {},
    };

    if (options) {
      objMetaNew.hash_algo = options.hashAlgo ?? HashAlgo.Unknown;
      objMetaNew.hash = options.hash ?? new Uint8Array(0);
      objMetaNew.content_type = options.contentType ?? "";
      objMetaNew.tags = options.tags ?? {};
    }

    this.dataSize += written;
    this.meta.meta.push(objMetaNew);
    return objMetaNew;
  }

  getObjectMeta(name: string): ObjectMetaType | null {
    return this.meta.meta.find((objMeta) => objMeta.name === name) || null;
  }

  getBundledObject(): fs.ReadStream {
    return fs.createReadStream(this.bundleFileName);
  }

  async finalizeBundle(): Promise<fs.ReadStream> {
    if (this.finalized) {
      throw new Error("Bundle finalized");
    }

    if (this.dataSize === 0) {
      throw new Error("Empty bundle");
    }

    let metaData = Buffer.from(BundleMeta.fromObject(this.meta).serialize());

    this.metaSize = metaData.length;
    const buf = Buffer.alloc(16);
    buf.writeBigUInt64BE(BigInt(this.metaSize), 0);
    buf.writeBigUInt64BE(BigInt(this.version), 8);
    metaData = Buffer.concat([metaData, buf]);

    this.writeFile!.write(metaData);

    this.dataSize += this.metaSize + 16;
    this.finalized = true;
    return this.getBundledObject();
  }

  close() {
    if (this.writeFile) {
      this.writeFile.close();
    }
    if (this.readFile) {
      this.readFile.close();
    }
  }

  getBundleMetaSize(): number {
    return this.metaSize;
  }

  getBundleObjectsMeta(): ObjectMetaType[] {
    return this.meta.meta;
  }

  getBundleSize(): number {
    return this.dataSize;
  }

  getBundleVersion(): BundleVersion {
    return this.version;
  }
}

interface AppendObjectOptions {
  hashAlgo?: HashAlgo;
  hash?: Uint8Array;
  contentType?: string;
  tags?: Record<string, string>;
}
