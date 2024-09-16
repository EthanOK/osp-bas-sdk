// import { SchemaEncoder, BAS } from "@bnb-attestation-service/bas-sdk";
import {
  EAS,
  EIP712AttestationParams,
  OffchainAttestationParams,
  SchemaEncoder,
} from "@ethereum-attestation-service/eas-sdk";
import { ethers, Signer } from "ethers";
import { BNB_schemaRegistryAddress } from "../../tests/config";
import { getSchemaByUID } from "../schema/register";
import { throws } from "assert";

// Initialize SchemaEncoder with the schema string

/**
 * Attestation params
 * @param schemaUID schema uid
 * @param encodedData encoded data
 * @param refUID reference uid
 * @param recipient recipient address
 */
export type AttestParams = {
  schemaUID: string;
  encodedData: string;
  refUID: string;
  recipient: string;
};

export interface DelegatedAttestParams extends AttestParams {
  deadline: bigint;
  nonce?: bigint;
}

/**
 * Create attestation
 * @param signer signer
 * @param bas bas
 * @param params attestation params
 * @returns attestation string
 */
export const createAttestOffChain = async (
  signer: Signer,
  bas: EAS,
  params: AttestParams
) => {
  bas.connect(signer);

  const offchain = await bas.getOffchain();

  // const schema = await getSchemaByUID(
  //   signer.provider,
  //   BNB_schemaRegistryAddress,
  //   params.schemaUID
  // );
  // console.log(schema);

  const timestamp = Math.floor(Date.now() / 1000);

  const attestation = await offchain.signOffchainAttestation(
    {
      recipient: params.recipient,
      // Unix timestamp of when attestation expires. (0 for no expiration)
      expirationTime: BigInt(0),
      // Unix timestamp of current time
      time: BigInt(timestamp),
      revocable: true,
      version: 1, // Fixed value
      nonce: BigInt(0), // Fixed value
      schema: params.schemaUID,
      refUID: params.refUID,
      data: params.encodedData,
    },
    signer
  );

  const attestation_ = JSON.stringify(attestation, (key, value) =>
    typeof value === "bigint" ? Number(value).toString() : value
  );

  return attestation_;
};

export const getSigatureByDelegation = async (
  bas: EAS,
  params: DelegatedAttestParams,
  signer: Signer
) => {
  if (signer.provider == null) {
    throw new Error("Signer provider is not defined");
  }
  bas.connect(signer);
  const delegated = await bas.getDelegated();

  const params_: EIP712AttestationParams = {
    schema: params.schemaUID,
    recipient: params.recipient,
    expirationTime: BigInt(0),
    revocable: true,
    refUID: params.refUID,
    data: params.encodedData,
    value: BigInt(0),
    deadline: params.deadline,
    nonce: params.nonce,
  };
  // console.log(params_);

  const attestation = await delegated.signDelegatedAttestation(params_, signer);
  // console.log(attestation.types);
  // console.log(attestation);

  return attestation.signature;
};
