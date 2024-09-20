import { SignedOffchainAttestation } from "../bas";
import { GreenFieldClientTS } from "./create";
import "dotenv/config";

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
 */
export const createObjectAttestOSP = async (
  bucketName: string,
  attestation: SignedOffchainAttestation,
  privateKey: string,
  isPrivate = false
) => {
  await client.createObject(
    bucketName,
    serializeJsonString(attestation),
    privateKey,
    isPrivate
  );
};

/**
 * Create object with multiple attestation
 * @param bucketName bucket name
 * @param attestations attestations
 * @param fileName file name
 * @param privateKey creator private key
 * @param isPrivate is private object
 */
export const createObjectMulAttestOSP = async (
  bucketName: string,
  attestations: SignedOffchainAttestation[],
  fileName: string,
  privateKey: string,
  isPrivate = false
) => {
  await client.createObjectMulAttest(
    bucketName,
    serializeJsonString(attestations),
    fileName,
    privateKey,
    isPrivate
  );
};

export function serializeJsonString(data: any): string {
  return JSON.stringify(data, (key, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  });
}
