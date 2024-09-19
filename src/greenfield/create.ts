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
   */
  async createBucket(bucketName: string, privateKey: string) {
    const spInfo = await selectSp(this.client);
    // console.log("spInfo", spInfo);

    if (!privateKey.startsWith("0x")) {
      privateKey = "0x" + privateKey;
    }

    // Bucket is existed
    let isBucketExist = false;
    try {
      const bucketMeta = await this.client.bucket.getBucketMeta({ bucketName });
      console.log("bucketMeta", bucketMeta);

      isBucketExist = true;
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
    } catch (error) {
      if (!isBucketExist) {
        console.log(error);
      }
    }

    return isBucketExist;
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
    // console.log("started");
    // console.log(this.address, this.chainId);
    if (!privateKey.startsWith("0x")) {
      privateKey = "0x" + privateKey;
    }

    const attest = JSON.parse(attestation);
    const fileName = `${attest.message.schema}.${attest.uid}`;

    const fileBuffer = Buffer.from(attestation);

    const expectCheckSums = rs.encode(Uint8Array.from(fileBuffer));
    // const expectCheckSums = await rs.encodeInWorker(
    //   __filename,
    //   Uint8Array.from(fileBuffer)
    // );

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
    // console.log(simulateInfo);
    const { transactionHash } = await createObjectTx.broadcast({
      denom: "BNB",
      gasLimit: Number(simulateInfo.gasLimit),
      gasPrice: simulateInfo.gasPrice,
      payer: this.address,
      granter: "",
      privateKey: privateKey,
    });

    console.log("create object success", transactionHash);

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
      console.log("upload object success", uploadRes);
    }

    return transactionHash;
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
    console.log("started");
    // console.log(this.address, this.chainId);
    if (!privateKey.startsWith("0x")) {
      privateKey = "0x" + privateKey;
    }
    const attest = JSON.parse(attestations);

    // const fileName = `${attest[0].message.schema}.${attest[0].uid}`;

    const fileBuffer = Buffer.from(attestations);

    const expectCheckSums = rs.encode(Uint8Array.from(fileBuffer));
    // const expectCheckSums = await rs.encodeInWorker(
    //   __filename,
    //   Uint8Array.from(fileBuffer)
    // );

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
    // console.log(simulateInfo);
    const { transactionHash } = await createObjectTx.broadcast({
      denom: "BNB",
      gasLimit: Number(simulateInfo.gasLimit),
      gasPrice: simulateInfo.gasPrice,
      payer: this.address,
      granter: "",
      privateKey: privateKey,
    });

    console.log("create object success", transactionHash);

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
      console.log("upload object success", uploadRes);
    }

    return transactionHash;
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
