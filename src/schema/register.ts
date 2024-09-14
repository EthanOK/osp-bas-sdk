// import {BAS, SchemaRegistry} from "@bnb-attestation-service/bas-sdk";
import { EAS, SchemaRegistry,SchemaRecord } from "@ethereum-attestation-service/eas-sdk";
import { ethers, Provider, Signer } from "ethers";
import { BNB_basAddress, GFTESTCHAINID, GFTESTRPC } from "../../tests/config";


export const initEAS = (provider: any, BASContractAddress: string) => {
  const bas = new EAS(BASContractAddress);
  bas.connect(provider);
};

/**
 * Register a schema Parameters
 * @param schema The schema string
 * @param resolverAddress The address of the resolver
 * @param revocable Whether the schema is revocable
 */
export type RegisterSchemaParams = {
  schema: string;
  resolverAddress?: string;
  revocable?: boolean;
};

/**
 * Register a schema on the Schema Registry
 * @param signer The signer object
 * @param schemaRegistryAddress The address of the Schema Registry
 * @param params The parameters for the schema
 * @returns The UID of the registered schema
 */
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

/**
 * Get a schema by its UID
 * @param provider The provider object
 * @param schemaRegistryAddress The address of the Schema Registry
 * @param schemaUID The UID of the schema
 * @returns The schema record
 */
export const getSchemaByUID = async (
  provider: Provider,
  schemaRegistryAddress: string,
  schemaUID: string
):Promise<SchemaRecord> => {
  const schemaRegistry = new SchemaRegistry(schemaRegistryAddress);
  schemaRegistry.connect(provider);

  const schemaRecord = await schemaRegistry.getSchema({ uid: schemaUID });

  return schemaRecord;
};
