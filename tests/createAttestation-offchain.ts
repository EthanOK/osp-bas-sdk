// npm link osp-bas-sdk
import {
  encodeAddrToBucketName,
  encodeFollowData,
  encodeProfileData,
  getAttestParamsOffChain,
  getDeployer,
  GreenFieldClientTS,
  multiAttestBASOffChain,
  OspDataType,
  HandleOspReturnDataOffChain,
  createObjectMulAttestOSP,
  createObjectAttestOSP,
  getKmsSigner,
  getAttestationOffChain,
  BAS,
} from "osp-bas-sdk";
import { ethers, hexlify, randomBytes } from "ethers";

const GREEN_PAYMENT_PRIVATE_KEY = process.env.GREEN_PAYMENT_PRIVATE_KEY!;

async function main() {
  const provider = new ethers.JsonRpcProvider(
    "https://rpc.ankr.com/bsc_testnet_chapel"
  );

  const Attester_Address = "0x043d36c82561c1733e22c07d9af17f21e270174c";
  const Attester_PRIVATE_KEY =
    "0x807eb862f8a714bf08a4bab6cd5fcdb33da056444480647f09163909ce0ecbe8";
  const signer = new ethers.Wallet(Attester_PRIVATE_KEY, provider);
  // const signer = getKmsSigner(provider);

  const Global_UnHandle_Data: HandleOspReturnDataOffChain[] = [];

  let timestamp = Math.floor(Date.now() / 1000);
  for (let i = 0; i < 1000; i++) {
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
    //
    const offchain = await new BAS(process.env.BAS_ADDRESS_BNB!)
      .connect(signer)
      .getOffchain();

    const result = offchain.verifyOffchainAttestationSignature(
      Attester_Address,
      attestations[1]
    );
    console.log("验证签名结果:", result);

    const bucketName = encodeAddrToBucketName(
      "0x6278A1E803A76796a3A1f7F6344fE874ebfe94B2"
    );

    //  上传 attestation 至 GreenField
    await createObjectAttestOSP(
      bucketName,
      attestations[1],
      GREEN_PAYMENT_PRIVATE_KEY,
      false
    );

    // console.log(attestations);
    return;

    // TODO: 上传 attestations 至 GreenField 适配中
    timestamp = Math.floor(Date.now() / 1000);
    const fileName = `${attestations[0].message.schema}.${attestations[0].uid}`;
    await createObjectMulAttestOSP(
      bucketName,
      attestations,
      fileName,
      GREEN_PAYMENT_PRIVATE_KEY,
      false
    );
    console.log("上传时间:", Math.floor(Date.now() / 1000) - timestamp, "S");
  } catch (error) {
    console.log(error);
  }
}

main();
