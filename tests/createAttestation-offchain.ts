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

    const seasonPassJson = {
      vid: timestamp + i,
      season_pass_id: 1,
      user: recipient,
      count: 1,
      currency: "0x0000000000000000000000000000000000000000",
      amount: 5000000000000000,
      timestamp: 1726714967,
      block_number: 34961244,
      block_timestamp: 1726714967,
      transaction_hash: transaction_hash,
      event_name: "season_pass_purchased",
      address: "0x067b5ab68e8db251f3f497f2273cdd9ab05567b2",
    };
    const handleOspReturnData = handleOspRequestPrepareOffChainV2(
      null,
      JSON.stringify(seasonPassJson)
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
