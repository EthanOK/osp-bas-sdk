import * as _ethereum_attestation_service_eas_sdk from '@ethereum-attestation-service/eas-sdk';
import { SchemaRecord, EAS, SchemaEncoder as SchemaEncoder$1, MultiAttestationRequest as MultiAttestationRequest$1, AttestationRequestData as AttestationRequestData$1, MultiDelegatedAttestationRequest as MultiDelegatedAttestationRequest$1, SignedOffchainAttestation as SignedOffchainAttestation$1, Offchain } from '@ethereum-attestation-service/eas-sdk';
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

declare const BAS: typeof EAS;
declare const SchemaEncoder: typeof SchemaEncoder$1;
type MultiAttestationRequest = MultiAttestationRequest$1;
type AttestationRequestData = AttestationRequestData$1;
type MultiDelegatedAttestationRequest = MultiDelegatedAttestationRequest$1;
type SignedOffchainAttestation = SignedOffchainAttestation$1;
interface Signature {
    r: string;
    s: string;
    v: number;
}

declare enum OspDataType {
    None = 0,
    Follow = 1,
    Profile = 2,
    Community = 3,
    Join = 4
}
declare const FollowSchemaUID = "0x1c9575bc318527d66fad7fc50aae6e2153185fcc624e14cf0af562d87d869be2";
declare const ProfileSchemaUID = "0x7c90370dcf194ce4c2851abec14da05abd98d8860ae7147ac714755430d42f6e";
declare const CommunitySchemaUID = "0x18c1dbf9c1a1c6a64b661c23110116f80b7d6897839334b724ea2a46056bee94";
declare const JoinSchemaUID = "0x3a017e34de4075a58f3a6a2826823a95bf38924b87646b68621c5fb4c2201069";
declare const OspDataTypeMap: Map<OspDataType, string>;
declare const FollowSchema = "bytes32 followTx, address follower, uint256 followedProfileId";
declare const ProfileSchema = "bytes32 createProfileTx, address profileOwner, uint256 profileId, string handle";
declare const CommunitySchema = "bytes32 createCommunityTx, address communityOwner, uint256 communityId, string handle, address joinNFT";
declare const JoinSchema = "bytes32 joinTx, address joiner, uint256 communityId";
declare const OspSchemaMap: Map<OspDataType, string>;
type encodeFollowDataParams = {
    followTx: string;
    follower: string;
    followedProfileId: string;
};
declare const encodeFollowData: (param: encodeFollowDataParams) => string;
type encodeProfileDataParams = {
    createProfileTx: string;
    profileOwner: string;
    profileId: string;
    handle: string;
};
declare const encodeProfileData: (param: encodeProfileDataParams) => string;
type encodeCommunityDataParams = {
    createCommunityTx: string;
    communityOwner: string;
    communityId: string;
    handle: string;
    joinNFT: string;
};
declare const encodeCommunityData: (param: encodeCommunityDataParams) => string;
type encodeJoinDataParams = {
    joinTx: string;
    joiner: string;
    communityId: string;
};
declare const encodeJoinData: (param: encodeJoinDataParams) => string;

type HandleOspReturnData = {
    dataType: number;
    requestData: AttestationRequestData$1;
};
declare const handleOspRequestData: (chainId: number, jsonData: string) => HandleOspReturnData;
type HandleOspReturnDataOffChain = {
    dataType: number;
    requestData: AttestParams;
};
declare const handleOspRequestPrepareOffChain: (chainId: number, jsonData: string) => HandleOspReturnDataOffChain;

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
 * @returns attestation Json Object
 */
declare const getAttestationOffChain: (offchain: Offchain, signer: Signer, params: AttestParams) => Promise<SignedOffchainAttestation$1>;
declare const getSigatureByDelegation: (bas: EAS, params: DelegatedAttestParams, signer: Signer) => Promise<_ethereum_attestation_service_eas_sdk_dist_offchain_typed_data_handler.Signature>;
declare const getAttestationRequestData: (recipient: string, encodedData: string) => _ethereum_attestation_service_eas_sdk.AttestationRequestData;
declare const getAttestParamsOffChain: (dataType: OspDataType, recipient: string, encodedData: string) => AttestParams;
declare const getMulAttestParams: (params: HandleOspReturnData[]) => MultiAttestationRequest[];
/**
 * Create multi attestation
 * @param signer signer
 * @param params multi attestation params
 * @returns attestation uids
 */
declare const multiAttestBASOnChain: (signer: Signer, params: MultiAttestationRequest[]) => Promise<string[]>;
/**
 * Create multi attestation
 * @param signer signer
 * @param params multi attestation params
 * @returns attestations type is json object[]
 */
declare const multiAttestBASOffChain: (signer: Signer, unHandleDatas: HandleOspReturnDataOffChain[]) => Promise<SignedOffchainAttestation$1[]>;

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
     * @returns boolean
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
    createObjectByBundle(bucketName: string, fileName: string, bundleBuffer: Buffer, privateKey: string, isPrivate?: boolean): Promise<string>;
    /**
     * create object multiple attestations
     * @param bucketName bucket name
     * @param attestations attestations is Json String
     * @param privateKey creator private key
     * @param isPrivate is private object
     */
    createObjectMulAttest(bucketName: string, attestations: string, fileName: string, privateKey: string, isPrivate?: boolean): Promise<string>;
}

/**
 * Create object with attestation
 * @param bucketName bucket name
 * @param attestation attestation type is json object
 * @param privateKey creator private key
 * @param isPrivate is private object
 * @returns boolean
 */
declare const createObjectAttestOSP: (bucketName: string, attestation: SignedOffchainAttestation, privateKey: string, isPrivate?: boolean) => Promise<boolean>;
/**
 * Create object with multiple attestation
 * @param bucketName bucket name
 * @param attestations attestations
 * @param fileName file name
 * @param privateKey creator private key
 * @param isPrivate is private object
 * @returns boolean
 */
declare const createObjectMulAttestOSP: (bucketName: string, schemaUID: string, attestations: SignedOffchainAttestation[], privateKey: string, isPrivate?: boolean) => Promise<boolean>;

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
/**
 * Serialize Object To json string
 * @param data data type is object
 * @returns Json string
 */
declare function serializeJsonString(data: any): string;
declare function getOffchainUIDBAS(version: number, schema: string, recipient: string, time: bigint, expirationTime: bigint, revocable: boolean, refUID: string, data: string): string;
declare function getAttestationBAS(signer: Signer, attestation: SignedOffchainAttestation): Promise<_ethereum_attestation_service_eas_sdk.SignedOffchainAttestation>;
declare function getbBundleUID(attestationUIDs: string[]): string;

/**
 *  multiAttestBasUploadGreenField
 * @param bucketName
 * @param unHandleDatas
 * @param fileName
 * @param isPrivate
 * @returns boolean
 */
declare const multiAttestBasUploadGreenField: (bucketName: string, schemaUID: string, unHandleDatas: HandleOspReturnDataOffChain[], isPrivate?: boolean) => Promise<boolean>;
declare const oneAttestBasUploadGreenField: (bucketName: string, unHandleData: HandleOspReturnDataOffChain, isPrivate?: boolean) => Promise<boolean>;
declare const multiAttestBasUploadGreenField_String: (bucketName: string, schemaUID: string, unHandleDatas: string, isPrivate?: boolean) => Promise<boolean>;

declare const getDeployer: () => Promise<AwsKmsSigner<ethers.JsonRpcProvider>>;
declare const getKmsSigner: (provider?: Provider) => AwsKmsSigner<ethers.Provider>;

export { type AttestParams, type AttestationRequestData, BAS, CommunitySchema, CommunitySchemaUID, type DelegatedAttestParams, FollowSchema, FollowSchemaUID, GreenFieldClientTS, type HandleOspReturnData, type HandleOspReturnDataOffChain, JoinSchema, JoinSchemaUID, type MultiAttestationRequest, type MultiDelegatedAttestationRequest, OspDataType, OspDataTypeMap, OspSchemaMap, ProfileSchema, ProfileSchemaUID, type RegisterSchemaParams, SchemaEncoder, type Signature, type SignedOffchainAttestation, createObjectAttestOSP, createObjectMulAttestOSP, encodeAddrToBucketName, encodeCommunityData, type encodeCommunityDataParams, encodeFollowData, type encodeFollowDataParams, encodeJoinData, type encodeJoinDataParams, encodeProfileData, type encodeProfileDataParams, getAllSps, getAttestParamsOffChain, getAttestationBAS, getAttestationOffChain, getAttestationRequestData, getDeployer, getKmsSigner, getMulAttestParams, getOffchainUIDBAS, getSchemaByUID, getSigatureByDelegation, getSps, getbBundleUID, handleOspRequestData, handleOspRequestPrepareOffChain, initEAS, multiAttestBASOffChain, multiAttestBASOnChain, multiAttestBasUploadGreenField, multiAttestBasUploadGreenField_String, oneAttestBasUploadGreenField, registerSchema, selectSp, serializeJsonString };
