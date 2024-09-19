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
  // const signer = new ethers.Wallet(PrivateKey, provider);
  const signer = getKmsSigner(provider);

  const Global_UnHandle_Data: HandleOspReturnDataOffChain[] = [];

  for (let i = 0; i < 10; i++) {
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

  try {
    // 获取已签名的数据
    const attestations = await multiAttestBASOffChain(
      signer,
      Global_UnHandle_Data
    );
    // console.log(attestations);

    const bucketName = encodeAddrToBucketName(
      "0x6278A1E803A76796a3A1f7F6344fE874ebfe94B2"
    );

    //  上传 attestations 至 GreenField
    await createObjectAttestOSP(
      bucketName,
      attestations[1],
      GREEN_PAYMENT_PRIVATE_KEY,
      false
    );

    // TODO: GreenField 适配中
    const fileName = `${attestations[0].message.schema}.${attestations[0].uid}`;
    await createObjectMulAttestOSP(
      bucketName,
      attestations,
      fileName,
      GREEN_PAYMENT_PRIVATE_KEY,
      false
    );
  } catch {}
}

main();
