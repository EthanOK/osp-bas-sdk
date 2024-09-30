import { ethers, Provider } from "ethers";
import { multiAttestBASOffChain } from "../attestation/createAttestation";
import { HandleOspReturnDataOffChain } from "../handle/handleOsp";
import {
  createObjectAttestOSP,
  createObjectMulAttestOSP,
} from "../greenfield/createObjectOSP";
import KmsClient from "../kms/kms_client";

let privateKey = "";
/**
 *  multiAttestBasUploadGreenField
 * @param bucketName
 * @param schemaUID
 * @param unHandleDatas
 * @param isPrivate
 * @returns boolean
 */
export const multiAttestBasUploadGreenField = async (
  bucketName: string,
  schemaUID: string,
  unHandleDatas: HandleOspReturnDataOffChain[],
  isPrivate?: boolean
) => {
  try {
    if (privateKey == "") {
      privateKey = await getPrivateKeyByKms();
    }
    const signer = new ethers.Wallet(
      privateKey,
      new ethers.JsonRpcProvider(process.env.BNB_RPC_URL!)
    );

    const attestations = await multiAttestBASOffChain(signer, unHandleDatas);

    const success = await createObjectMulAttestOSP(
      bucketName,
      schemaUID,
      attestations,
      privateKey,
      isPrivate
    );
    return success;
  } catch (e) {
    console.log(e);
    return false;
  }
  return false;
};

export const oneAttestBasUploadGreenField = async (
  bucketName: string,
  unHandleData: HandleOspReturnDataOffChain,
  isPrivate?: boolean
) => {
  try {
    if (privateKey == "") {
      privateKey = await getPrivateKeyByKms();
    }
    const signer = new ethers.Wallet(
      privateKey,
      new ethers.JsonRpcProvider(process.env.BNB_RPC_URL!)
    );

    const attestations = await multiAttestBASOffChain(signer, [unHandleData]);
    const success = await createObjectAttestOSP(
      bucketName,
      attestations[0],
      privateKey,
      isPrivate
    );
    return success;
  } catch (e) {
    // console.log(e);
  }
  return false;
};

export const multiAttestBasUploadGreenField_String = async (
  bucketName: string,
  schemaUID: string,
  unHandleDatas: string,
  isPrivate?: boolean
) => {
  try {
    if (privateKey == "") {
      privateKey = await getPrivateKeyByKms();
    }
    const signer = new ethers.Wallet(
      privateKey,
      new ethers.JsonRpcProvider(process.env.BNB_RPC_URL!)
    );

    const attestations = await multiAttestBASOffChain(
      signer,
      JSON.parse(unHandleDatas)
    );
    const success = await createObjectMulAttestOSP(
      bucketName,
      schemaUID,
      attestations,
      privateKey,
      isPrivate
    );
    return success;
  } catch (e) {
    // console.log(e);
  }
  return false;
};

async function getPrivateKeyByKms(): Promise<string> {
  try {
    console.log("init KmsClient");

    let client = new KmsClient({
      accessKeyId: process.env.ALIBABA_CLOUD_ACCESS_KEY_ID!,
      accessKeySecret: process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET!,
      regionId: process.env.ALIBABA_CLOUD_REGION_ID!,
      keyId: process.env.ALIBABA_CLOUD_KMS_KEY_ID!,
    });

    let decryptRes = await client.decrypt(
      process.env.GREEN_PAYMENT_PRIVATE_KEY_KMS_CIPHERTEXT,
      {}
    );

    return decryptRes.body.plaintext;
  } catch (e) {
    console.log(e);
  }
  return "";
}
