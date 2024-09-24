// npm link osp-bas-sdk
import {
  encodeAddrToBucketName,
  encodeFollowData,
  encodeProfileData,
  getAttestParamsOffChain,
  OspDataType,
  HandleOspReturnDataOffChain,
  multiAttestBasUploadGreenField,
  oneAttestBasUploadGreenField,
} from "osp-bas-sdk";
import { ethers, hexlify, keccak256, randomBytes } from "ethers";

async function main() {
  const Global_UnHandle_Data: HandleOspReturnDataOffChain[] = [];

  let timestamp = Math.floor(Date.now() / 1000);
  for (let i = 0; i < 100; i++) {
    const recipient = ethers.Wallet.createRandom().address;

    const followHash = hexlify(randomBytes(32));
    if (i % 2 === 0) {
      Global_UnHandle_Data.push({
        dataType: OspDataType.Follow,
        requestData: getAttestParamsOffChain(
          OspDataType.Follow,
          recipient,
          encodeFollowData({
            followTx: followHash,
            follower: recipient,
            followedProfileId: i.toString(),
          })
        ),
      });
    } else {
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
    // 上传 1个 attestation 至 GreenField
    const success_ = await oneAttestBasUploadGreenField(
      encodeAddrToBucketName(process.env.GREEN_PAYMENT_ADDRESS!),
      Global_UnHandle_Data[0],
      true
    );
    console.log("createObjects success:", success_);

    // TODO: 上传 attestations 至 GreenField 【适配中】
    timestamp = Math.floor(Date.now() / 1000);
    // TODO: need change
    const fileName = `${
      Global_UnHandle_Data[0].requestData.schemaUID
    }.${keccak256(randomBytes(32))}`;

    const success = await multiAttestBasUploadGreenField(
      encodeAddrToBucketName(process.env.GREEN_PAYMENT_ADDRESS!),
      Global_UnHandle_Data,
      fileName,
      true
    );
    console.log("createObjects success:", success);

    console.log("上传时间:", Math.floor(Date.now() / 1000) - timestamp, "S");
  } catch (error) {
    console.log(error);
  }
}

main();
