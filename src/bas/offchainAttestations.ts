import { ethers, Provider } from "ethers";
import { multiAttestBASOffChain } from "../attestation/createAttestation";
import { HandleOspReturnDataOffChain } from "../handle/handleOsp";
import {
  createObjectAttestOSP,
  createObjectMulAttestOSP,
} from "../greenfield/createObjectOSP";

import {
  getBasConfig,
  getGreenfieldConfig,
  getKmsCryptConfig,
  getPrivateKey,
} from "../config/config";

/**
 *  multiAttestBasUploadGreenField
 * @param bucketName
 * @param schemaUID
 * @param unHandleDatas
 * @param isPrivate object is private
 * @param quota_GB  bucket quota
 * @returns boolean
 */
export const multiAttestBasUploadGreenField = async (
  bucketName: string,
  schemaUID: string,
  unHandleDatas: HandleOspReturnDataOffChain[],
  isPrivate?: boolean,
  quota_GB?: number
) => {
  try {
    const privateKey = getPrivateKey();
    if (privateKey == "") {
      console.log("private key is null");
      return false;
    }

    const basConfig = getBasConfig();
    if (basConfig === null) {
      console.log("bas config is null");
      return false;
    }

    const signer = new ethers.Wallet(
      privateKey,
      new ethers.JsonRpcProvider(basConfig.RPC_URL)
    );

    const attestations = await multiAttestBASOffChain(signer, unHandleDatas);

    const success = await createObjectMulAttestOSP(
      bucketName,
      schemaUID,
      attestations,
      privateKey,
      isPrivate,
      quota_GB
    );
    return success;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const oneAttestBasUploadGreenField = async (
  bucketName: string,
  unHandleData: HandleOspReturnDataOffChain,
  isPrivate?: boolean
) => {
  try {
    const privateKey = getPrivateKey();
    if (privateKey == "") {
      console.log("private key is null");
      return false;
    }

    const basConfig = getBasConfig();
    if (basConfig === null) {
      console.log("bas config is null");
      return false;
    }

    const signer = new ethers.Wallet(
      privateKey,
      new ethers.JsonRpcProvider(basConfig.RPC_URL!)
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
    console.log(e);
    return false;
  }
};

export const multiAttestBasUploadGreenField_String = async (
  bucketName: string,
  schemaUID: string,
  unHandleDatas: string,
  isPrivate?: boolean
) => {
  try {
    const privateKey = getPrivateKey();
    if (privateKey == "") {
      console.log("private key is null");
      return false;
    }

    const basConfig = getBasConfig();
    if (basConfig === null) {
      console.log("bas config is null");
      return false;
    }
    const signer = new ethers.Wallet(
      privateKey,
      new ethers.JsonRpcProvider(basConfig.RPC_URL)
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
    console.log(e);
    return false;
  }
};
