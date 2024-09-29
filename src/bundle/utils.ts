import { SignedOffchainAttestation } from "../bas";
import { getbBundleUID, serializeJsonString } from "../greenfield/utils";
import { Bundle } from "./bundle";

async function readStreamToBuffer(
  stream: NodeJS.ReadableStream
): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

export type SingleBundleObject = {
  Name: string;
  Data: Buffer;
};
export async function getBundleBuffer(
  schemaUid: string,
  attestations: SignedOffchainAttestation[]
) {
  let objs: SingleBundleObject[] = [];
  let attestationUids: string[] = [];
  for (let attestation of attestations) {
    attestationUids.push(attestation.uid);
    objs.push({
      Name: attestation.uid,
      Data: Buffer.from(serializeJsonString(attestation)),
    });
  }
  const bundle = await _getBundle(objs);
  const bundleUid = getbBundleUID(attestationUids);
  const objectName = `bundle.${schemaUid}.` + bundleUid;
  const buffer = await readStreamToBuffer(bundle);
  console.log(`buffer size is ${buffer.length}`);
  // fd.close();
  return { objectName: objectName, buffer };
}
// Buffer to ReadableStream
function bufferToReadableStream(bufferData: Buffer): ReadableStream {
  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue(bufferData);
      controller.close();
    },
  });
  return readable;
}

async function _getBundle(objs: SingleBundleObject[]) {
  const { bundle, fd } = await Bundle.newBundle();
  // wait  0.1s second
  await new Promise((resolve) => setTimeout(resolve, 100));
  try {
    for await (const object of objs) {
      const data = object.Data;
      const readableStream = bufferToReadableStream(data);
      // Buffer to ReadableStream
      await bundle.appendObject(object.Name, readableStream);
    }

    const result = await bundle.finalizeBundle();
    
    fd.close();

    return result;
  } catch (err) {
    console.log(err);
  }
  // finally {
  //   console.log("finally");
  //   // bundle.close();
  // }
  return null;
}
