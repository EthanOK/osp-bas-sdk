import { ethers, Provider } from "ethers";
import { multiAttestBASOffChain } from "../attestation/createAttestation";
import { HandleOspReturnDataOffChain } from "../handle/handleOsp";
import {
  createObjectAttestOSP,
  createObjectMulAttestOSP,
} from "../greenfield/createObjectOSP";
import KmsClient from "../kms/kms_client";
import {
  getBasConfig,
  getGreenfieldConfig,
  getKmsCryptConfig,
} from "../config/config";

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
      if (privateKey == "") return false;
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
      isPrivate
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
    if (privateKey == "") {
      privateKey = await getPrivateKeyByKms();
      if (privateKey == "") return false;
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
    if (privateKey == "") {
      privateKey = await getPrivateKeyByKms();
      if (privateKey == "") return false;
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

async function getPrivateKeyByKms(): Promise<string> {
  try {
    console.log("init KmsClient");

    const kmsConfig = getKmsCryptConfig();
    if (kmsConfig === null) {
      console.log("kms config is null");
      return "";
    }

    const client = new KmsClient({
      accessKeyId: kmsConfig.ALIBABA_CLOUD_ACCESS_KEY_ID!,
      accessKeySecret: kmsConfig.ALIBABA_CLOUD_ACCESS_KEY_SECRET!,
      regionId: kmsConfig.ALIBABA_CLOUD_REGION_ID!,
      keyId: kmsConfig.ALIBABA_CLOUD_KMS_KEY_ID!,
    });
    const greenfieldConfig = getGreenfieldConfig();
    if (greenfieldConfig === null) {
      console.log("greenfield config is null");
      return "";
    }

    let decryptRes = await client.decrypt(
      greenfieldConfig.GREEN_PAYMENT_PRIVATE_KEY_KMS_CIPHERTEXT,
      {}
    );

    return decryptRes.body.plaintext;
  } catch (e) {
    console.log(e);
    return "";
  }
}
