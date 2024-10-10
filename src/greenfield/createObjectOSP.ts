import { SignedOffchainAttestation } from "../bas";
import { GreenFieldClientTS } from "./create";
import "dotenv/config";
import { serializeJsonString } from "./utils";
import { getBundleBuffer } from "../bundle/utils";
import { getGreenfieldConfig } from "../config/config";

let client: GreenFieldClientTS = null;
let bucketNameTemp: string = null;
function getGreenFieldClientTS() {
  console.log("init greenfield client");

  const greenfieldConfig = getGreenfieldConfig();
  if (greenfieldConfig === null) {
    console.log("greenfield config is null");
    return null;
  }

  const client_gf = new GreenFieldClientTS(
    greenfieldConfig.GREEN_RPC_URL!,
    greenfieldConfig.GREEN_CHAIN_ID!,
    greenfieldConfig.GREEN_PAYMENT_ADDRESS!
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

  if (bucketNameTemp === null) {
    const success_ = await client.createBucket(bucketName, privateKey);
    if (!success_) {
      return false;
    }
    bucketNameTemp = bucketName;
    console.log("createBucket:", bucketNameTemp);

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

  if (bucketNameTemp === null) {
    const success_ = await client.createBucket(bucketName, privateKey);
    if (!success_) {
      return false;
    }
    bucketNameTemp = bucketName;
    console.log("createBucket:", bucketNameTemp);
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
