import { SignedOffchainAttestation } from "../bas";
import { GreenFieldClientTS } from "./create";
import "dotenv/config";
import { serializeJsonString } from "./utils";

const client = new GreenFieldClientTS(
  process.env.GREEN_RPC_URL!,
  process.env.GREEN_CHAIN_ID!,
  process.env.GREEN_PAYMENT_ADDRESS!
);

/**
 * Create object with attestation
 * @param bucketName bucket name
 * @param attestation attestation type is json object
 * @param privateKey creator private key
 * @param isPrivate is private object
 * @returns boolean
 */
export const createObjectAttestOSP = async (
  bucketName: string,
  attestation: SignedOffchainAttestation,
  privateKey: string,
  isPrivate = false
): Promise<boolean> => {
  const txHash = await client.createObject(
    bucketName,
    serializeJsonString(attestation),
    privateKey,
    isPrivate
  );
  return txHash !== null;
};

/**
 * Create object with multiple attestation
 * @param bucketName bucket name
 * @param attestations attestations
 * @param fileName file name
 * @param privateKey creator private key
 * @param isPrivate is private object
 * @returns boolean
 */
export const createObjectMulAttestOSP = async (
  bucketName: string,
  attestations: SignedOffchainAttestation[],
  fileName: string,
  privateKey: string,
  isPrivate = false
): Promise<boolean> => {
  const txHash = await client.createObjectMulAttest(
    bucketName,
    serializeJsonString(attestations),
    fileName,
    privateKey,
    isPrivate
  );

  if (txHash === null) {
    return false;
  }
  return true;
};
