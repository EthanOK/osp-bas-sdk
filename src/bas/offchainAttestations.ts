import { ethers, Provider } from "ethers";
import { multiAttestBASOffChain } from "../attestation/createAttestation";
import { HandleOspReturnDataOffChain } from "../handle/handleOsp";
import { createObjectMulAttestOSP } from "../greenfield/createObjectOSP";

/**
 *  multiAttestBasUploadGreenField
 * @param privateKey  sign Attest and upload object to Greenfield
 * @param provider_BNB
 * @param bucketName
 * @param unHandleDatas
 * @param fileName
 * @param isPrivate
 * @returns
 */
export const multiAttestBasUploadGreenField = async (
  privateKey: string,
  provider_BNB: Provider,
  bucketName: string,
  unHandleDatas: HandleOspReturnDataOffChain[],
  fileName: string,
  isPrivate?: boolean
) => {
  try {
    const signer = new ethers.Wallet(privateKey, provider_BNB);

    const attestations = await multiAttestBASOffChain(signer, unHandleDatas);
    // TODO: need change
    fileName = `${attestations[0].message.schema}.${attestations[0].uid}`;
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
