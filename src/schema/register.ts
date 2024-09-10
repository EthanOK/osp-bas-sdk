// import {BAS, SchemaRegistry} from "@bnb-attestation-service/bas-sdk";
import { EAS, SchemaRegistry,SchemaRecord } from "@ethereum-attestation-service/eas-sdk";
import { ethers, Signer } from "ethers";
import { BNB_basAddress, GFTESTCHAINID, GFTESTRPC } from "../../tests/config";

export const initBAS = (provider: any, BASContractAddress: string) => {
  // const bas = new bassdk.BAS(BASContractAddress, GFTESTRPC, GFTESTCHAINID);
  // bas.connect(provider);
};

export const initEAS = (provider: any, BASContractAddress: string) => {
  const bas = new EAS(BASContractAddress);
  bas.connect(provider);
};

export type RegisterSchemaParams = {
  schema: string;
  resolverAddress?: string;
  revocable?: boolean;
};

export const registerSchema = async (
  signer: Signer,
  schemaRegistryAddress: string,
  params: RegisterSchemaParams
) => {
  const schemaRegistry = new SchemaRegistry(schemaRegistryAddress);

  schemaRegistry.connect(signer);

  const transaction = await schemaRegistry.register({
    schema: params.schema,
    resolverAddress: params.resolverAddress,
    revocable: params.revocable,
  });

  // Optional: Wait for transaction to be validated
  const schemaUID = await transaction.wait();
  return schemaUID;
};

export const getSchemaByUID = async (
  provider: any,
  schemaRegistryAddress: string,
  schemaUID: string
):Promise<SchemaRecord> => {
  const schemaRegistry = new SchemaRegistry(schemaRegistryAddress);
  schemaRegistry.connect(provider);

  const schemaRecord = await schemaRegistry.getSchema({ uid: schemaUID });

  return schemaRecord;
};
