// import { SchemaEncoder, BAS } from "@bnb-attestation-service/bas-sdk";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { ethers, Signer } from "ethers";
import { BNB_schemaRegistryAddress } from "../../tests/config";
import { getSchemaByUID } from "../schema/register";

// Initialize SchemaEncoder with the schema string

export const createAttestOffChain = async (
  signer: Signer,
  BASContractAddress: string
) => {
  //   const bas = new BAS(BASContractAddress, "", "");
  const bas = new EAS(BASContractAddress);
  bas.connect(signer);

  const offchain = await bas.getOffchain();
  const schemaUID =
    "0x599b1dc37382faa679ffc8af28adaa01357950c8947f090c54a608ba6f63ba6d";
  const isPrivate = false;

  const schema = await getSchemaByUID(
    signer.provider,
    BNB_schemaRegistryAddress,
    schemaUID
  );
  console.log(schema);

  const schemaEncoder = new SchemaEncoder(schema.schema);

  const encodedData = schemaEncoder.encodeData([
    { name: "Post", value: "this a post 2", type: "string" },
  ]);

  const attestation = await offchain.signOffchainAttestation(
    {
      recipient: "0x0000000000000000000000000000000000000000",
      // Unix timestamp of when attestation expires. (0 for no expiration)
      expirationTime: BigInt(0),
      // Unix timestamp of current time
      time: BigInt(1725939809),
      revocable: true,
      version: 1, // Fixed value
      nonce: BigInt(0), // Fixed value
      schema: schemaUID,
      refUID:
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      data: encodedData,
    },
    signer
  );

  const attestation_ = JSON.stringify(attestation, (key, value) =>
    typeof value === "bigint" ? Number(value).toString() : value
  );

  return attestation_;
};
