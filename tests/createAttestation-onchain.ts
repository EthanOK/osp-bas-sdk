// npm link osp-bas-sdk
import {
  encodeFollowData,
  encodeProfileData,
  getAttestationRequestData,
  MultiAttestationRequest,
  HandleOspReturnData,
  OspDataType,
  getMulAttestParams,
  getDeployer,
  multiAttestBASOnChain,
  getKmsSigner,
} from "osp-bas-sdk";
import { ethers, hexlify, randomBytes } from "ethers";

async function createAttestation() {
  const provider = new ethers.JsonRpcProvider(
    "https://opbnb-testnet-rpc.bnbchain.org"
  );
  // const signer = new ethers.Wallet(PrivateKey, provider);
  const signer = getKmsSigner(provider);

  const Global_UnHandle_Data: HandleOspReturnData[] = [];
  for (let i = 0; i < 4; i++) {
    const recipient = ethers.Wallet.createRandom().address;

    const followHash = hexlify(randomBytes(32));
    if (i % 2 === 0) {
      Global_UnHandle_Data.push({
        dataType: OspDataType.Follow,
        requestData: getAttestationRequestData(
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
        requestData: getAttestationRequestData(
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

  const params: MultiAttestationRequest[] =
    getMulAttestParams(Global_UnHandle_Data);

  const uids = await multiAttestBASOnChain(signer, params);
  console.log("uids:", uids);
  Global_UnHandle_Data.length = 0;
  console.log(Global_UnHandle_Data);
}

createAttestation();
