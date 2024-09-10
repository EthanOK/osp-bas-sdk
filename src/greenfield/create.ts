import { Client, PermissionTypes } from "@bnb-chain/greenfield-js-sdk";
import { hashMessage, getAddress } from "ethers";
import { DeliverTxResponse } from "@cosmjs/stargate";

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
        console.log(error.message);
        return null;
      }
    }
    console.log("transactionHash", res.transactionHash);
    return res;
  }
}
