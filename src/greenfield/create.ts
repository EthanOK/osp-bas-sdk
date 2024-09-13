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

const rs = new ReedSolomon();

export class GreenFieldClientTS {
  client: Client;
  chainId = null;
  address = null;
  constructor(url, chainId) {
    this.client = Client.create(url, chainId);
  }

  init(address, chainId) {
    this.address = address;
    this.chainId = chainId;
  }

  /**
   * create bucket
   */
  async createBucket(bucketName: string, ACCOUNT_PRIVATEKEY: string) {
    const spInfo = await selectSp(this.client);
    // console.log("spInfo", spInfo);

    if (!ACCOUNT_PRIVATEKEY.startsWith("0x")) {
      ACCOUNT_PRIVATEKEY = "0x" + ACCOUNT_PRIVATEKEY;
    }

    // Bucket 是否存在？
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
        privateKey: ACCOUNT_PRIVATEKEY,
      });

      console.log("transactionHash", res.transactionHash);
    } catch (error) {
      if (!isBucketExist) {
        console.log(error);
      }
    }

    return isBucketExist;
  }

  async createObject(
    str: string,
    ACCOUNT_PRIVATEKEY: string,
    isPrivate = false
  ) {
    console.log("started");
    console.log(this.address, this.chainId);
    if (!ACCOUNT_PRIVATEKEY.startsWith("0x")) {
      ACCOUNT_PRIVATEKEY = "0x" + ACCOUNT_PRIVATEKEY;
    }

    const attest = JSON.parse(str);
    const fileName = `${attest.message.schema}.${attest.uid}`;

    const fileBuffer = Buffer.from(str);

    const expectCheckSums = rs.encode(Uint8Array.from(fileBuffer));

    // createObject
    const createObjectTx = await this.client.object.createObject({
      bucketName: encodeAddrToBucketName(this.address),
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
      privateKey: ACCOUNT_PRIVATEKEY,
    });

    console.log("create object success", transactionHash);

    // uploadObject
    const uploadRes = await this.client.object.uploadObject(
      {
        bucketName: encodeAddrToBucketName(this.address),
        objectName: fileName,
        body: createFile(fileName, fileBuffer),
        txnHash: transactionHash,
      },
      // highlight-start
      {
        type: "ECDSA",
        privateKey: ACCOUNT_PRIVATEKEY,
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
