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
  attestation: any,
  privateKey: string,
  isPrivate = false
) => {
  await client.createObject(
    bucketName,
    JSON.stringify(attestation),
    privateKey,
    isPrivate
  );
};

/**
 * Create object with multiple attestation
 * @param bucketName bucket name
 * @param attestations attestation type is json object[]
 * @param fileName file name
 * @param privateKey creator private key
 * @param isPrivate is private object
 */
export const createObjectMulAttestOSP = async (
  bucketName: string,
  attestations: object,
  fileName: string,
  privateKey: string,
  isPrivate = false
) => {
  await client.createObjectMulAttest(
    bucketName,
    JSON.stringify(attestations),
    fileName,
    privateKey,
    isPrivate
  );
};
