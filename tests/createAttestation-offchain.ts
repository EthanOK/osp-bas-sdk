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
      ALIBABA_CLOUD_ACCESS_KEY_ID: process.env.ALIBABA_CLOUD_ACCESS_KEY_ID!,
      ALIBABA_CLOUD_ACCESS_KEY_SECRET:
        process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET!,
      ALIBABA_CLOUD_REGION_ID: process.env.ALIBABA_CLOUD_REGION_ID!,
      ALIBABA_CLOUD_KMS_KEY_ID: process.env.ALIBABA_CLOUD_KMS_KEY_ID!,
    },
    greenfieldConfig: {
      GREEN_RPC_URL: process.env.GREEN_RPC_URL!,
      GREEN_CHAIN_ID: process.env.GREEN_CHAIN_ID!,
      GREEN_PAYMENT_ADDRESS: process.env.GREEN_PAYMENT_ADDRESS!,
      GREEN_PAYMENT_MNEMONIC_CIPHERTEXT:
        process.env.GREEN_PAYMENT_MNEMONIC_CIPHERTEXT!,
    },
  });

  const Global_UnHandle_Data: HandleOspReturnDataOffChain[] = [];

  let timestamp = Math.floor(Date.now() / 1000);

  let dataType = 1;

  for (let i = 0; i < 5; i++) {
    const recipient = ethers.Wallet.createRandom().address;
    const followedAddress = ethers.Wallet.createRandom().address;
    const followHash = hexlify(randomBytes(32));
    if (dataType === 1) {
      Global_UnHandle_Data.push({
        dataType: OspDataType.Follow,
        requestData: getAttestParamsOffChain(
          OspDataType.Follow,
          recipient,
          encodeFollowData({
            followTx: followHash,
            follower: recipient,
            followedAddress: followedAddress,
            followedProfileId: i.toString(),
          })
        ),
      });
    } else if (dataType == 2) {
      Global_UnHandle_Data.push({
        dataType: OspDataType.Profile,
        requestData: getAttestParamsOffChain(
          OspDataType.Profile,
          recipient,
          encodeProfileData({
            createProfileTx: followHash,
            profileOwner: recipient,
            profileId: i.toString(),
            handle: `demo${i}`,
          })
        ),
      });
    }
  }
  console.log("组装数据:", Math.floor(Date.now() / 1000) - timestamp, "S");
  try {
    timestamp = Math.floor(Date.now() / 1000);
    const schemaUID = Global_UnHandle_Data[0].requestData.schemaUID;
    const success = await multiAttestBasUploadGreenField(
      encodeAddrToBucketName("obas", "0x0000000000000000000000000000000000000001"),
      schemaUID,
      Global_UnHandle_Data,
      false
    );
    console.log("createObjects success:", success);

    console.log("上传时间:", Math.floor(Date.now() / 1000) - timestamp, "S");
  } catch (error) {
    console.log(error);
  }
}

main();
