// import { SchemaEncoder, BAS } from "@bnb-attestation-service/bas-sdk";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { ethers, Signer } from "ethers";
import { BNB_schemaRegistryAddress } from "../../tests/config";
import { getSchemaByUID } from "../schema/register";

// Initialize SchemaEncoder with the schema string

export type AttestParams = {
  schemaUID: string;
  encodedData: string;
  refUID: string;
  recipient: string;
};

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
