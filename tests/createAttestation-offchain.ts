// npm link osp-bas-sdk
import {
  encodeAddrToBucketName,
  encodeFollowData,
  encodeProfileData,
  getAttestParamsOffChain,
  OspDataType,
  HandleOspReturnDataOffChain,
  multiAttestBasUploadGreenField,
  setOspBasSdkConfig,
  updateBucketQuota,
  handleOspRequestPrepareOffChainV2,
  // } from "osp-bas-sdk";
} from "../src";
import { ethers, hexlify, keccak256, randomBytes } from "ethers";
async function main() {
  // TODO: Set Osp Bas Config
  await setOspBasSdkConfig({
    basConfig: {
      RPC_URL: process.env.RPC_URL_OPBNB!,
      BAS_ADDRESS: process.env.BAS_ADDRESS_OPBNB!,
      SCHEMA_REGISTRY_ADDRESS: process.env.SCHEMA_REGISTRY_OPBNB!,
    },
    kmsCryptConfig: {
      clientParams: {
        accessKeyId: process.env.ALIBABA_CLOUD_ACCESS_KEY_ID!,
        accessKeySecret: process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET!,
        regionId: process.env.ALIBABA_CLOUD_REGION_ID!,
      },
      keyId: process.env.ALIBABA_CLOUD_KMS_KEY_ID!,
    },
    greenfieldConfig: {
      GREEN_RPC_URL: process.env.GREEN_RPC_URL!,
      GREEN_CHAIN_ID: process.env.GREEN_CHAIN_ID!,
      GREEN_PAYMENT_ADDRESS: process.env.GREEN_PAYMENT_ADDRESS!,
      GREEN_PAYMENT_MNEMONIC_CIPHERTEXT: process.env.GREEN_PAYMENT_MNEMONIC_CIPHERTEXT!,
    },
  });

  const Global_UnHandle_Data: HandleOspReturnDataOffChain[] = [];

  let timestamp = Math.floor(Date.now() / 1000);

  for (let i = 0; i < 5; i++) {
    const recipient = ethers.Wallet.createRandom().address;
    const followedAddress = ethers.Wallet.createRandom().address;
    const transaction_hash = hexlify(randomBytes(32));

    const subscriptionJson = {
      vid: 1,
      community_id: 2,
      account: recipient,
      currency: "0x0000000000000000000000000000000000000000",
      price: 5000000000000000,
      timestamp: 1726725562 + i,
      duration: 1000,
      deadline: 1726735562,
      block_timestamp: 1726725562,
      transaction_hash:
        "0x5466a8f379b3030d64276d41ea39e0976085a5f50cd84aacda3059341a1f18b4",
      event_name: "subscription_purchased",
      address: "0x0000004b90ba819700af15b052ee151ccc49fb34",
    };
    const handleOspReturnData = handleOspRequestPrepareOffChainV2(
      null,
      JSON.stringify(subscriptionJson)
    );

    Global_UnHandle_Data.push(handleOspReturnData[0]);
  }
  console.log("组装数据:", Math.floor(Date.now() / 1000) - timestamp, "S");
  try {
    timestamp = Math.floor(Date.now() / 1000);
    const schemaUID = Global_UnHandle_Data[0].requestData.schemaUID;
    const success = await multiAttestBasUploadGreenField(
      encodeAddrToBucketName("obas", "0x1000000000000000000000000000000000000002"),
      schemaUID,
      Global_UnHandle_Data,
      false,
      2
    );
    console.log("createObjects success:", success);

    console.log("上传时间:", Math.floor(Date.now() / 1000) - timestamp, "S");
  } catch (error) {
    console.log(error);
  }
}

main();
