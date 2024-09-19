// npm link osp-bas-sdk
import {
  encodeAddrToBucketName,
  encodeFollowData,
  encodeProfileData,
  getAttestParams,
  getDeployer,
  GreenFieldClientTS,
  multiAttestBASOffChain,
  OspDataType,
  HandleOspReturnDataOffChain,
  createObjectMulAttestOSP,
  createObjectAttestOSP,
  getKmsSigner,
} from "osp-bas-sdk";
import { ethers, hexlify, randomBytes } from "ethers";

const GREEN_PAYMENT_PRIVATE_KEY = process.env.GREEN_PAYMENT_PRIVATE_KEY!;

async function main() {
  const provider = new ethers.JsonRpcProvider(
    "https://rpc.ankr.com/bsc_testnet_chapel"
  );

  // TODO: 签名速度 和kms有关
  const signer = new ethers.Wallet(GREEN_PAYMENT_PRIVATE_KEY, provider);
  // const signer = getKmsSigner(provider);

  const Global_UnHandle_Data: HandleOspReturnDataOffChain[] = [];

  let timestamp = Math.floor(Date.now() / 1000);
  for (let i = 0; i < 100; i++) {
    const recipient = ethers.Wallet.createRandom().address;

    const followHash = hexlify(randomBytes(32));
    if (i % 2 === 0) {
      Global_UnHandle_Data.push({
        dataType: OspDataType.Follow,
        requestData: getAttestParams(
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
        requestData: getAttestParams(
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

    const attestations = await multiAttestBASOffChain(
      signer,
      Global_UnHandle_Data
    );
    console.log(
      "批量签名时间:",
      Math.floor(Date.now() / 1000) - timestamp,
      "S"
    );
    // console.log(attestations)

    const bucketName = encodeAddrToBucketName(
      "0x6278A1E803A76796a3A1f7F6344fE874ebfe94B2"
    );

    //  上传 attestations 至 GreenField
    // await createObjectAttestOSP(
    //   bucketName,
    //   attestations[1],
    //   GREEN_PAYMENT_PRIVATE_KEY,
    //   false
    // );
    // console.log(attestations[999]);

    // TODO: GreenField 适配中
    timestamp = Math.floor(Date.now() / 1000);
    const fileName = `${attestations[0].message.schema}.${attestations[0].uid}`;
    await createObjectMulAttestOSP(
      bucketName,
      attestations,
      fileName,
      GREEN_PAYMENT_PRIVATE_KEY,
      false
    );
    console.log(
      "上传时间:",
      Math.floor(Date.now() / 1000) - timestamp,
      "S"
    );
  } catch (error){
    console.log(error);
  }
}

main();
