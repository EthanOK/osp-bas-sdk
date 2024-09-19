import { SchemaRecord, EAS, SchemaEncoder as SchemaEncoder$1, MultiAttestationRequest as MultiAttestationRequest$1, AttestationRequestData as AttestationRequestData$1, MultiDelegatedAttestationRequest as MultiDelegatedAttestationRequest$1 } from '@ethereum-attestation-service/eas-sdk';
import { Signer, Provider, ethers } from 'ethers';
import * as _ethereum_attestation_service_eas_sdk_dist_offchain_typed_data_handler from '@ethereum-attestation-service/eas-sdk/dist/offchain/typed-data-handler';
import { Client } from '@bnb-chain/greenfield-js-sdk';
import { AwsKmsSigner } from '@cuonghx.gu-tech/ethers-aws-kms-signer';

declare const initEAS: (provider: any, BASContractAddress: string) => void;
/**
 * Register a schema Parameters
 * @param schema The schema string
 * @param resolverAddress The address of the resolver
 * @param revocable Whether the schema is revocable
 */
type RegisterSchemaParams = {
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
declare const registerSchema: (signer: Signer, schemaRegistryAddress: string, params: RegisterSchemaParams) => Promise<string>;
/**
 * Get a schema by its UID
 * @param provider The provider object
 * @param schemaRegistryAddress The address of the Schema Registry
 * @param schemaUID The UID of the schema
 * @returns The schema record
 */
declare const getSchemaByUID: (provider: Provider, schemaRegistryAddress: string, schemaUID: string) => Promise<SchemaRecord>;

/**
 * Attestation params
 * @param schemaUID schema uid
 * @param encodedData encoded data
 * @param refUID reference uid
 * @param recipient recipient address
 */
type AttestParams = {
    schemaUID: string;
    encodedData: string;
    refUID: string;
    recipient: string;
};
interface DelegatedAttestParams extends AttestParams {
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
declare const createAttestOffChain: (signer: Signer, bas: EAS, params: AttestParams) => Promise<object>;
declare const getSigatureByDelegation: (bas: EAS, params: DelegatedAttestParams, signer: Signer) => Promise<_ethereum_attestation_service_eas_sdk_dist_offchain_typed_data_handler.Signature>;

/**
 * GreenField Client
 */
declare class GreenFieldClientTS {
    client: Client;
    address: any;
    /**
     * @param url greenfield rpc url
     * @param chainId greenfield chainId
     * @param creator creator address
     */
    constructor(url: string, chainId: string, creator: string);
    /**
     * create bucket
     * @param bucketName bucket name
     * @param privateKey creator private key
     */
    createBucket(bucketName: string, privateKey: string): Promise<boolean>;
    /**
     * create object
     * @param bucketName bucket name
     * @param attestation attestation is Json String
     * @param privateKey creator private key
     * @param isPrivate is private object
     */
    createObject(bucketName: string, attestation: string, privateKey: string, isPrivate?: boolean): Promise<string>;
    /**
     * create object multiple attestations
     * @param bucketName bucket name
     * @param attestations attestations is Json String
     * @param privateKey creator private key
     * @param isPrivate is private object
     */
    createObjectMulAttest(bucketName: string, attestations: string, privateKey: string, isPrivate?: boolean): Promise<string>;
}

/**
 * encode address to bucket name
 * @param addr
 * @returns bucket name
 */
declare const encodeAddrToBucketName: (addr: string) => string;
declare const getSps: (client: any) => Promise<any>;
declare const getAllSps: (client: any) => Promise<any>;
declare const selectSp: (client: any) => Promise<{
    id: any;
    endpoint: any;
    primarySpAddress: any;
    sealAddress: any;
    secondarySpAddresses: any[];
}>;

declare const BAS: typeof EAS;
declare const SchemaEncoder: typeof SchemaEncoder$1;
type MultiAttestationRequest = MultiAttestationRequest$1;
type AttestationRequestData = AttestationRequestData$1;
type MultiDelegatedAttestationRequest = MultiDelegatedAttestationRequest$1;
interface Signature {
    r: string;
    s: string;
    v: number;
}

declare const getDeployer: () => Promise<AwsKmsSigner<ethers.JsonRpcProvider>>;

export { type AttestParams, type AttestationRequestData, BAS, type DelegatedAttestParams, GreenFieldClientTS, type MultiAttestationRequest, type MultiDelegatedAttestationRequest, type RegisterSchemaParams, SchemaEncoder, type Signature, createAttestOffChain, encodeAddrToBucketName, getAllSps, getDeployer, getSchemaByUID, getSigatureByDelegation, getSps, initEAS, registerSchema, selectSp };
