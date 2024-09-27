import {
  bytesFromBase64,
  Client,
  Long,
  RedundancyType,
  VisibilityType,
} from "@bnb-chain/greenfield-js-sdk";
import { DeliverTxResponse } from "@cosmjs/stargate";
import { encodeAddrToBucketName, selectSp } from "./utils";
import { ReedSolomon } from "@bnb-chain/reed-solomon";
import { ethers, getUint } from "ethers";
import * as appendBuffer from "append-buffer";

// import { NodeAdapterReedSolomon } from "@bnb-chain/reed-solomon/node.adapter";

const rs = new ReedSolomon();
// const rs = new NodeAdapterReedSolomon();

/**
 * GreenField Client
 */
export class GreenFieldClientTS {
  client: Client;
  // chainId = null;
  address = null;
  /**
   * @param url greenfield rpc url
   * @param chainId greenfield chainId
   * @param creator creator address
   */
  constructor(url: string, chainId: string, creator: string) {
    this.client = Client.create(url, chainId);
    this.address = creator;
  }

  /**
   * create bucket
   * @param bucketName bucket name
   * @param privateKey creator private key
   * @returns boolean
   */
  async createBucket(bucketName: string, privateKey: string) {
    const spInfo = await selectSp(this.client);
    // console.log("spInfo", spInfo);

    if (!privateKey.startsWith("0x")) {
      privateKey = "0x" + privateKey;
    }

    try {
      const bucketMeta = await this.client.bucket.getBucketMeta({ bucketName });
      // console.log("bucketMeta", bucketMeta.body.GfSpGetBucketMetaResponse);
      return true;
    } catch (error) {}

    let res: DeliverTxResponse;
    try {
      const createBucketTx = await this.client.bucket.createBucket({
        bucketName: bucketName,
        creator: this.address,
        visibility: VisibilityType.VISIBILITY_TYPE_PUBLIC_READ,
        chargedReadQuota: Long.fromString("0"),
        paymentAddress: this.address,
        primarySpAddress: spInfo.primarySpAddress,
      });
      // console.log({ createBucketTx });

      const simulateInfo = await createBucketTx.simulate({
        denom: "BNB",
      });
      // console.log("simulateInfo", simulateInfo);
      res = await createBucketTx.broadcast({
        denom: "BNB",
        gasLimit: Number(simulateInfo?.gasLimit),
        gasPrice: simulateInfo?.gasPrice || "5000000000",
        payer: this.address,
        granter: "",
        privateKey: privateKey,
      });

      console.log("transactionHash", res.transactionHash);
      return true;
    } catch (error) {}

    return false;
  }

  /**
   * create object
   * @param bucketName bucket name
   * @param attestation attestation is Json String
   * @param privateKey creator private key
   * @param isPrivate is private object
   */
  async createObject(
    bucketName: string,
    attestation: string,
    privateKey: string,
    isPrivate = false
  ) {
    if (!privateKey.startsWith("0x")) {
      privateKey = "0x" + privateKey;
    }

    const attest = JSON.parse(attestation);
    const fileName = `bundle.0xb375a6d216ba084094bbaae989bf76a31357cc88e7fe270fd477a96e1fbdadb1.${[
      ethers.solidityPackedKeccak256(["bytes32"], [attest.uid]),
    ]}`;

    const fileBuffer = Buffer.from(attestation);

    const meta = [
      {
        object_name: attest.uid,
        offset: 0,
        size: fileBuffer.byteLength,
        hash_algo: "",
        hash: "",
        content_type: "",
        tags: "",
      },
    ];

    const metaBuffer = Buffer.from(JSON.stringify(meta));
    // console.log("metaBuffer", metaBuffer.byteLength);

    const metaSizeBuffer = Buffer.from([0, 0, 0, 0, 0, 0, 0, 162]);
    const versionBuffer = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0]);
    // const stringVersionBuffer = versionBuffer.toString()
    const buffers = Buffer.concat([
      fileBuffer,
      metaBuffer,
      metaSizeBuffer,
      versionBuffer,
    ]);
    console.log("buffers:", buffers);
    // fileBuffer.write(metaBuffer.toString());
    // fileBuffer.write(metaSizeBuffer.toString())
    // fileBuffer.write(versionBuffer.toString())
    // versionBuffer.write(metaSizeBuffer.toString());
    // versionBuffer.write(metaBuffer.toString());
    // versionBuffer.write(fileBuffer.toString());

    const expectCheckSums = rs.encode(Uint8Array.from(buffers));

    try {
      console.log("trying...");
      // createObject
      const createObjectTx = await this.client.object.createObject({
        bucketName: bucketName,
        objectName: fileName,
        creator: this.address,
        visibility: isPrivate
          ? VisibilityType.VISIBILITY_TYPE_PRIVATE
          : VisibilityType.VISIBILITY_TYPE_PUBLIC_READ,
        contentType: "Document",
        redundancyType: RedundancyType.REDUNDANCY_EC_TYPE,
        payloadSize: Long.fromInt(buffers.byteLength),
        expectChecksums: expectCheckSums.map((x) => bytesFromBase64(x)),
      });

      const simulateInfo = await createObjectTx.simulate({
        denom: "BNB",
      });
      // console.log(simulateInfo);
      const { transactionHash } = await createObjectTx.broadcast({
        denom: "BNB",
        gasLimit: Number(simulateInfo.gasLimit),
        gasPrice: simulateInfo.gasPrice,
        payer: this.address,
        granter: "",
        privateKey: privateKey,
      });

      // uploadObject
      const uploadRes = await this.client.object.uploadObject(
        {
          bucketName: bucketName,
          objectName: fileName,
          body: createFile(fileName, buffers),
          txnHash: transactionHash,
        },
        // highlight-start
        {
          type: "ECDSA",
          privateKey: privateKey,
        }
        // highlight-end
      );
      console.log("uploadRes", uploadRes);
      if (uploadRes.code === 0) {
        return transactionHash;
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async createObjectByBundle(
    bucketName: string,
    fileName: string,
    bundleBuffer: Buffer,
    privateKey: string,
    isPrivate = false
  ) {
    if (!privateKey.startsWith("0x")) {
      privateKey = "0x" + privateKey;
    }

    const expectCheckSums = rs.encode(Uint8Array.from(bundleBuffer));

    try {
      console.log("trying...");
      // createObject
      const createObjectTx = await this.client.object.createObject({
        bucketName: bucketName,
        objectName: fileName,
        creator: this.address,
        visibility: isPrivate
          ? VisibilityType.VISIBILITY_TYPE_PRIVATE
          : VisibilityType.VISIBILITY_TYPE_PUBLIC_READ,
        contentType: "Document",
        redundancyType: RedundancyType.REDUNDANCY_EC_TYPE,
        payloadSize: Long.fromInt(bundleBuffer.byteLength),
        expectChecksums: expectCheckSums.map((x) => bytesFromBase64(x)),
      });

      const simulateInfo = await createObjectTx.simulate({
        denom: "BNB",
      });
      // console.log(simulateInfo);
      const { transactionHash } = await createObjectTx.broadcast({
        denom: "BNB",
        gasLimit: Number(simulateInfo.gasLimit),
        gasPrice: simulateInfo.gasPrice,
        payer: this.address,
        granter: "",
        privateKey: privateKey,
      });

      // uploadObject
      const uploadRes = await this.client.object.uploadObject(
        {
          bucketName: bucketName,
          objectName: fileName,
          body: createFile(fileName, bundleBuffer),
          txnHash: transactionHash,
        },
        // highlight-start
        {
          type: "ECDSA",
          privateKey: privateKey,
        }
        // highlight-end
      );
      console.log("uploadRes", uploadRes);
      if (uploadRes.code === 0) {
        return transactionHash;
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  /**
   * create object multiple attestations
   * @param bucketName bucket name
   * @param attestations attestations is Json String
   * @param privateKey creator private key
   * @param isPrivate is private object
   */
  async createObjectMulAttest(
    bucketName: string,
    attestations: string,
    fileName: string,
    privateKey: string,
    isPrivate = false
  ) {
    if (!privateKey.startsWith("0x")) {
      privateKey = "0x" + privateKey;
    }

    const fileBuffer = Buffer.from(attestations);

    const expectCheckSums = rs.encode(Uint8Array.from(fileBuffer));

    // createObject
    const createObjectTx = await this.client.object.createObject({
      bucketName: bucketName,
      objectName: fileName,
      creator: this.address,
      visibility: isPrivate
        ? VisibilityType.VISIBILITY_TYPE_PRIVATE
        : VisibilityType.VISIBILITY_TYPE_PUBLIC_READ,
      contentType: "json",
      redundancyType: RedundancyType.REDUNDANCY_EC_TYPE,
      payloadSize: Long.fromInt(fileBuffer.byteLength),
      expectChecksums: expectCheckSums.map((x) => bytesFromBase64(x)),
    });

    const simulateInfo = await createObjectTx.simulate({
      denom: "BNB",
    });

    try {
      const { transactionHash } = await createObjectTx.broadcast({
        denom: "BNB",
        gasLimit: Number(simulateInfo.gasLimit),
        gasPrice: simulateInfo.gasPrice,
        payer: this.address,
        granter: "",
        privateKey: privateKey,
      });

      // uploadObject
      const uploadRes = await this.client.object.uploadObject(
        {
          bucketName: bucketName,
          objectName: fileName,
          body: createFile(fileName, fileBuffer),
          txnHash: transactionHash,
        },
        // highlight-start
        {
          type: "ECDSA",
          privateKey: privateKey,
        }
        // highlight-end
      );
      if (uploadRes.code === 0) {
        return transactionHash;
      }
    } catch (error) {
      return null;
    }
    return null;
  }
}
function createFile(fileName: string, fileBuffer: Buffer) {
  return {
    name: fileName,
    type: "",
    size: fileBuffer.byteLength,
    content: fileBuffer,
  };
}
