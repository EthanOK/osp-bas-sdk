import { ethers, Provider } from "ethers";
import { multiAttestBASOffChain } from "../attestation/createAttestation";
import { HandleOspReturnDataOffChain } from "../handle/handleOsp";
import { createObjectMulAttestOSP } from "../greenfield/createObjectOSP";

/**
 *  multiAttestBasUploadGreenField
 * @param bucketName
 * @param unHandleDatas
 * @param fileName
 * @param isPrivate
 * @returns
 */
export const multiAttestBasUploadGreenField = async (
  bucketName: string,
  unHandleDatas: HandleOspReturnDataOffChain[],
  fileName: string,
  isPrivate?: boolean
) => {
  try {
    const privateKey = process.env.GREEN_PAYMENT_PRIVATE_KEY!;
    const signer = new ethers.Wallet(
      privateKey,
      new ethers.JsonRpcProvider(process.env.BNB_RPC_URL!)
    );

    const attestations = await multiAttestBASOffChain(signer, unHandleDatas);
    const success = await createObjectMulAttestOSP(
      bucketName,
      attestations,
      fileName,
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
  unHandleDatas: string,
  fileName: string,
  isPrivate?: boolean
) => {
  try {
    const privateKey = process.env.GREEN_PAYMENT_PRIVATE_KEY!;
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
      attestations,
      fileName,
      privateKey,
      isPrivate
    );
    return success;
  } catch (e) {
    // console.log(e);
  }
  return false;
};
