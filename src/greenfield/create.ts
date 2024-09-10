import { Client, PermissionTypes } from "@bnb-chain/greenfield-js-sdk";
import { hashMessage, getAddress } from "ethers";
import { DeliverTxResponse } from "@cosmjs/stargate";
import { getCheckSums } from "@bnb-chain/greenfiled-file-handle";
import fs from "fs";

export const encodeAddrToBucketName = (addr: string) => {
  return `bas-${hashMessage(getAddress(addr)).substring(2, 42)}`;
};
export const getSps = async (client) => {
  const sps = await client.sp.getStorageProviders();
  const finalSps = (sps ?? []).filter((v) => v.endpoint.includes("nodereal"));
  return finalSps;
};
export const getAllSps = async (client) => {
  const sps = await getSps(client);
  return sps.map((sp) => {
    return {
      address: sp.operatorAddress,
      endpoint: sp.endpoint,
      name: sp.description?.moniker,
    };
  });
};
export const selectSp = async (client) => {
  const finalSps = await getSps(client);
  const selectIndex = Math.floor(Math.random() * finalSps.length);
  const secondarySpAddresses = [
    ...finalSps.slice(0, selectIndex),
    ...finalSps.slice(selectIndex + 1),
  ].map((item) => item.operatorAddress);
  const selectSpInfo = {
    //@ts-ignore
    id: finalSps[selectIndex].id || 0,
    endpoint: finalSps[selectIndex].endpoint,
    primarySpAddress: finalSps[selectIndex]?.operatorAddress,
    sealAddress: finalSps[selectIndex].sealAddress,
    secondarySpAddresses,
  };
  return selectSpInfo;
};
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
    let res: DeliverTxResponse;
    try {
      const createBucketTx = await this.client.bucket.createBucket(
        {
          bucketName: bucketName,
          creator: this.address,
          visibility: "VISIBILITY_TYPE_PUBLIC_READ",
          chargedReadQuota: "0",
          spInfo: {
            primarySpAddress: spInfo.primarySpAddress,
          },
          paymentAddress: this.address,
        },
        {
          type: "ECDSA",
          privateKey: ACCOUNT_PRIVATEKEY,
          // type: "EDDSA",
          // domain: window.location.origin,
          // seed: offChainData.seedString,
          // address: this.address,
        }
      );
      // console.log({ createBucketTx });

      const simulateInfo = await createBucketTx.simulate({
        denom: "BNB",
      });
      console.log("simulateInfo", simulateInfo);
      res = await createBucketTx.broadcast({
        denom: "BNB",
        gasLimit: Number(simulateInfo?.gasLimit),
        gasPrice: simulateInfo?.gasPrice || "5000000000",
        payer: this.address,
        granter: "",
        privateKey: ACCOUNT_PRIVATEKEY,
      });
    } catch (error) {
      if (error.code === -1) {
        console.log(error.message, bucketName);
        return null;
      }
    }
    console.log("transactionHash", res.transactionHash);
    return res;
  }

  // https://docs.bnbchain.org/bnb-greenfield/for-developers/apis-and-sdks/sdk-js/#21-construct-create-object-tx
  async createObject(
    str: string,
    ACCOUNT_PRIVATEKEY: string,
    isPrivate = true
  ) {
    console.log("started");
    console.log(this.address, this.chainId);
    if (!this.address || !str || !this.chainId) {
      alert("Please select a file or address");
      return;
    }
    if (!ACCOUNT_PRIVATEKEY.startsWith("0x")) {
      ACCOUNT_PRIVATEKEY = "0x" + ACCOUNT_PRIVATEKEY;
    }

    const attest = JSON.parse(str);
    const fileName = `${attest.message.schema}.${attest.uid}`;
    fs.writeFileSync(fileName, str);

    const filePath = fileName;
    const fileBuffer = fs.readFileSync(filePath);

    const hashResult = await getCheckSums(new Uint8Array(fileBuffer));
    const { contentLength, expectCheckSums } = hashResult;
    // console.log("hashResult", hashResult);
    const tx = await this.client.object.createObject(
      {
        bucketName: encodeAddrToBucketName(this.address),
        objectName: fileName,
        creator: this.address,
        visibility: isPrivate
          ? "VISIBILITY_TYPE_PRIVATE"
          : "VISIBILITY_TYPE_PUBLIC_READ",
        fileType: "json",
        redundancyType: "REDUNDANCY_EC_TYPE",
        contentLength: contentLength,
        expectCheckSums: JSON.parse(expectCheckSums),
      },
      {
        type: "ECDSA",
        privateKey: ACCOUNT_PRIVATEKEY,
      }
    );

    const simulateInfo = await tx.simulate({
      denom: "BNB",
    });
    console.log(simulateInfo);
    const { transactionHash } = await tx.broadcast({
      denom: "BNB",
      gasLimit: Number(simulateInfo.gasLimit),
      gasPrice: simulateInfo.gasPrice,
      payer: this.address,
      granter: "",
      privateKey: ACCOUNT_PRIVATEKEY,
    });

    const file = createFile(fileName, fileName);
    console.log(file);

    const uploadRes = await this.client.object.uploadObject(
      {
        bucketName: encodeAddrToBucketName(this.address),
        objectName: fileName,
        body: file,
        txnHash: transactionHash,
      },
      // highlight-start
      {
        type: "ECDSA",
        privateKey: ACCOUNT_PRIVATEKEY,
      }
      // highlight-end
    );
    console.log("uploadRes", uploadRes);

    return uploadRes;
  }
}
function createFile(path, fileName) {
  const stats = fs.statSync(path);
  const fileSize = stats.size;

  return {
    name: fileName,
    type: "",
    size: fileSize,
    content: fs.readFileSync(path),
  };
}
