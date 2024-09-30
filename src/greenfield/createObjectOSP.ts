import { SignedOffchainAttestation } from "../bas";
import { GreenFieldClientTS } from "./create";
import "dotenv/config";
import { serializeJsonString } from "./utils";
import { getBundleBuffer } from "../bundle/utils";

let client = null;
function getGreenFieldClientTS() {
  console.log("init greenfield client");

  const client_gf = new GreenFieldClientTS(
    process.env.GREEN_RPC_URL!,
    process.env.GREEN_CHAIN_ID!,
    process.env.GREEN_PAYMENT_ADDRESS!
  );
  return client_gf;
}

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
  if (client === null) {
    client = getGreenFieldClientTS();
  }
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
 * @param schemaUID schema uid
 * @param attestations attestations
 * @param privateKey creator private key
 * @param isPrivate is private object
 * @returns boolean
 */
export const createObjectMulAttestOSP = async (
  bucketName: string,
  schemaUID: string,
  attestations: SignedOffchainAttestation[],
  privateKey: string,
  isPrivate = false
): Promise<boolean> => {
  if (client === null) {
    client = getGreenFieldClientTS();
  }
  const { objectName, buffer } = await getBundleBuffer(schemaUID, attestations);

  if (buffer.length === 0) {
    return false;
  }

  const txHash = await client.createObjectByBundle(
    bucketName,
    objectName,
    buffer,
    privateKey,
    isPrivate
  );

  if (txHash === null) {
    return false;
  }
  return true;
};
