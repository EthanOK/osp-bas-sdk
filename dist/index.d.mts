import * as _ethereum_attestation_service_eas_sdk from '@ethereum-attestation-service/eas-sdk';
import { SchemaRecord, EAS, SchemaEncoder as SchemaEncoder$1, MultiAttestationRequest as MultiAttestationRequest$1, AttestationRequestData as AttestationRequestData$1, MultiDelegatedAttestationRequest as MultiDelegatedAttestationRequest$1, SignedOffchainAttestation as SignedOffchainAttestation$1, Offchain } from '@ethereum-attestation-service/eas-sdk';
import { Signer, Provider, ethers } from 'ethers';
import * as _ethereum_attestation_service_eas_sdk_dist_offchain_typed_data_handler from '@ethereum-attestation-service/eas-sdk/dist/offchain/typed-data-handler';
import { Client } from '@bnb-chain/greenfield-js-sdk';
import { AwsKmsSigner } from '@cuonghx.gu-tech/ethers-aws-kms-signer';
import * as Kms20160120 from '@alicloud/kms20160120';
import Kms20160120__default from '@alicloud/kms20160120';
import { GlobalParameters } from '@alicloud/openapi-client';

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
    Profile = 1,
    Follow = 2,
    Followed = 3,
    Community = 4,
    Join = 5,
    Joined = 6,
    SeasonPass = 7,
    Subscribe = 8,
    FixFeePaid = 9
}
declare const ProfileSchemaUID = "0x7c90370dcf194ce4c2851abec14da05abd98d8860ae7147ac714755430d42f6e";
declare const FollowSchemaUID = "0xc21ba57124d1c884e89d561c9ba60a80a98733d2553d000d06cc5a98a0534b11";
declare const FollowedSchemaUID = "0xa0d8de56036149d7613854b8e58ce2bcc402cd065bae55a96d7a5f86095d5221";
declare const CommunitySchemaUID = "0x18c1dbf9c1a1c6a64b661c23110116f80b7d6897839334b724ea2a46056bee94";
declare const JoinSchemaUID = "0x15ce785a4cd0951c813f27917308bb632162855f33d4a93b3bf05e35a70c8510";
declare const JoinedSchemaUID = "0xe1685d5f5e58134cbcd44a1f3250027c2192a2c9552cb1fbe048ad3e6e999ed6";
declare const SeasonPassSchemaUID = "0xa34e00fdc96e3686fa961f6d4ae9f904e42fc2717a214226f9840b8a7b9eca7c";
declare const SubscribeSchemaUID = "0x8e4bf4cb7a111ae35b49994893ff6f33803b52305c0ba980c4150dd4e7b344f9";
declare const FixFeePaidSchemaUID = "0x16da17e8b479593ccaf2fea0dbc801b0a69c7ddb443facb1f129fdfe8afbc85b";
declare const OspDataTypeMap: Map<OspDataType, string>;
declare const ProfileSchema = "bytes32 createProfileTx, address profileOwner, uint256 profileId, string handle";
declare const FollowSchema = "bytes32 followTx, address follower, address followedAddress, uint256 followedProfileId";
declare const FollowedSchema = "bytes32 followTx, string type, address follower, address followedAddress, uint256 followedProfileId";
declare const CommunitySchema = "bytes32 createCommunityTx, address communityOwner, uint256 communityId, string handle, address joinNFT";
declare const JoinSchema = "bytes32 joinTx, address joiner, uint256 communityId, address communityOwner";
declare const JoinedSchema = "bytes32 joinTx, string type, address joiner, uint256 communityId, address communityOwner";
declare const SeasonPassSchema = "bytes32 purchaseTx, address purchaser, uint256 seasonId, uint256 count, address currency, uint256 amount";
declare const SubscribeSchema = "bytes32 subscribeTx, address subscriber, uint256 communityId, address currency, uint256 price, uint256 duration";
declare const FixFeePaidSchema = "bytes32 fixFeePaidTx, address payer, string handle, uint256 price";
declare const OspSchemaMap: Map<OspDataType, string>;
type encodeFollowDataParams = {
    followTx: string;
    follower: string;
    followedAddress: string;
    followedProfileId: string;
};
declare const encodeFollowData: (param: encodeFollowDataParams) => string;
declare const encodeFollowedData: (param: encodeFollowDataParams) => string;
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
    communityOwner: string;
};
declare const encodeJoinData: (param: encodeJoinDataParams) => string;
declare const encodeJoinedData: (param: encodeJoinDataParams) => string;
type encodeSeasonPassDataParams = {
    purchaseTx: string;
    purchaser: string;
    seasonId: string;
    count: string;
    currency: string;
    amount: string;
};
declare const encodeSeasonPassData: (param: encodeSeasonPassDataParams) => string;
type encodeSubscribeDataParams = {
    subscribeTx: string;
    subscriber: string;
    communityId: string;
    currency: string;
    price: string;
    duration: string;
};
declare const encodeSubscribeData: (param: encodeSubscribeDataParams) => string;
type encodeFixFeePaidDataParams = {
    fixFeePaidTx: string;
    payer: string;
    handle: string;
    price: string;
};
declare const encodeFixFeePaidData: (param: encodeFixFeePaidDataParams) => string;

type HandleOspReturnData = {
    dataType: number;
    requestData: AttestationRequestData$1;
};
declare const handleOspRequestData: (chainId: number, jsonData: string) => HandleOspReturnData;
type HandleOspReturnDataOffChain = {
    dataType: number;
    requestData: AttestParams;
};
declare const handleOspRequestPrepareOffChain: (chainId: number, jsonData: string) => HandleOspReturnDataOffChain[];
declare const handleOspRequestPrepareOffChainV2: (chainId: number, jsonData: string) => HandleOspReturnDataOffChain[];

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
    timestamp?: string | number;
};
interface DelegatedAttestParams extends AttestParams {
    deadline: bigint;
    nonce?: bigint;
}
/**
 * get attestation
 * @param offchain offchain instance
 * @param signer signer
 * @param params attestation params
 * @returns attestation
 */
declare const getAttestationOffChain: (offchain: Offchain, signer: Signer, params: AttestParams) => Promise<SignedOffchainAttestation$1>;
declare const getAttestationOffChainV1: (offchain: Offchain, signer: Signer, params: AttestParams) => Promise<SignedOffchainAttestation$1>;
declare const getSigatureByDelegation: (bas: EAS, params: DelegatedAttestParams, signer: Signer) => Promise<_ethereum_attestation_service_eas_sdk_dist_offchain_typed_data_handler.Signature>;
declare const getAttestationRequestData: (recipient: string, encodedData: string) => _ethereum_attestation_service_eas_sdk.AttestationRequestData;
declare const getAttestParamsOffChain: (dataType: OspDataType, recipient: string, encodedData: string, timestamp?: string | number) => AttestParams;
declare const getMulAttestParams: (params: HandleOspReturnData[]) => MultiAttestationRequest[];
/**
 * Create multi attestation
 * @param signer signer
 * @param params multi attestation params
 * @returns attestation uids
 */
declare const multiAttestBASOnChain: (signer: Signer, params: MultiAttestationRequest[]) => Promise<string[]>;
/**
 * get multi attestation
 * @param signer signer
 * @param unHandleDatas
 * @returns attestations  SignedOffchainAttestation[]
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
     * @param quota_GB quota GB/month
     * @param privateKey creator private key
     * @returns boolean
     */
    createBucket(bucketName: string, quota_GB: number, privateKey: string): Promise<boolean>;
    updateBucketQuota(bucketName: string, chargedQuota_GB: number, privateKey: string): Promise<boolean>;
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
declare const createObjectAttestOSP: (bucketName: string, attestation: SignedOffchainAttestation, privateKey: string, isPrivate?: boolean, quota_GB?: number) => Promise<boolean>;
/**
 * Create object with multiple attestation
 * @param bucketName bucket name
 * @param schemaUID schema uid
 * @param attestations attestations
 * @param privateKey creator private key
 * @param isPrivate  object default is public
 * @param quota_GB  default 0
 * @returns boolean
 */
declare const createObjectMulAttestOSP: (bucketName: string, schemaUID: string, attestations: SignedOffchainAttestation[], privateKey: string, isPrivate?: boolean, quota_GB?: number) => Promise<boolean>;
declare const updateBucketQuota: (bucketName: string, chargedQuota_GB: number) => Promise<boolean>;

/**
 * encode address to bucket name
 * @param addr
 * @returns bucket name
 */
declare const encodeAddrToBucketName: (prefix: string, addr: string) => string;
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
 * @param schemaUID
 * @param unHandleDatas
 * @param isPrivate object is private
 * @param quota_GB  bucket quota
 * @returns boolean
 */
declare const multiAttestBasUploadGreenField: (bucketName: string, schemaUID: string, unHandleDatas: HandleOspReturnDataOffChain[], isPrivate?: boolean, quota_GB?: number) => Promise<boolean>;
declare const oneAttestBasUploadGreenField: (bucketName: string, unHandleData: HandleOspReturnDataOffChain, isPrivate?: boolean) => Promise<boolean>;
declare const multiAttestBasUploadGreenField_String: (bucketName: string, schemaUID: string, unHandleDatas: string, isPrivate?: boolean) => Promise<boolean>;

declare const getDeployer: () => Promise<AwsKmsSigner<ethers.JsonRpcProvider>>;
declare const getKmsSigner: (provider?: Provider) => AwsKmsSigner<ethers.Provider>;

type ClientParams = {
    accessKeyId?: string;
    accessKeySecret?: string;
    securityToken?: string;
    bearerToken?: string;
    protocol?: string;
    method?: string;
    regionId?: string;
    readTimeout?: number;
    connectTimeout?: number;
    httpProxy?: string;
    httpsProxy?: string;
    credential?: Credential;
    endpoint?: string;
    noProxy?: string;
    maxIdleConns?: number;
    network?: string;
    userAgent?: string;
    suffix?: string;
    socks5Proxy?: string;
    socks5NetWork?: string;
    endpointType?: string;
    openPlatformEndpoint?: string;
    type?: string;
    signatureVersion?: string;
    signatureAlgorithm?: string;
    globalParameters?: GlobalParameters;
    key?: string;
    cert?: string;
    ca?: string;
    disableHttp2?: boolean;
};
type KmsClientParams = {
    clientParams: ClientParams;
    keyId: string;
};
/**
 * KMS client
 */
declare class KmsClient {
    client: Kms20160120__default;
    keyId: string;
    constructor(params: KmsClientParams);
    static createClient(param: ClientParams): Kms20160120__default;
    decrypt(ciphertextBlob: string, encryptionContext: {
        [key: string]: any;
    }): Promise<Kms20160120.DecryptResponse>;
    encrypt(plaintext: string, encryptionContext: {
        [key: string]: any;
    }): Promise<Kms20160120.EncryptResponse>;
}
declare const getKmsCipherText: (kms_params: KmsClientParams, plaintext: string) => Promise<string>;
declare const getKmsPlainText: (kms_params: KmsClientParams, ciphertextBlob: string) => Promise<string>;

type GreenfieldConfig = {
    GREEN_RPC_URL: string;
    GREEN_CHAIN_ID: string;
    GREEN_PAYMENT_ADDRESS: string;
    GREEN_PAYMENT_MNEMONIC_CIPHERTEXT: string;
};
type KmsCryptConfig = KmsClientParams;
type BasConfig = {
    RPC_URL: string;
    BAS_ADDRESS: string;
    SCHEMA_REGISTRY_ADDRESS: string;
};
declare const getGreenfieldConfig: () => GreenfieldConfig;
declare const setGreenfieldConfig: (config: GreenfieldConfig) => void;
declare const getKmsCryptConfig: () => KmsClientParams;
declare const setKmsCryptConfig: (config: KmsCryptConfig) => void;
declare const getBasConfig: () => BasConfig;
declare const setBasConfig: (config: BasConfig) => void;
declare const getPrivateKey: () => string;
declare const setPrivateKey: (key: string) => void;
declare function getPrivateKeyByKms(): Promise<string>;
declare function setPrivateKeyByKms(ciphertextBlob: string): Promise<boolean>;
declare const setOspBasSdkConfig: (config: {
    basConfig: BasConfig;
    kmsCryptConfig: KmsCryptConfig;
    greenfieldConfig: GreenfieldConfig;
}) => Promise<boolean>;

export { type AttestParams, type AttestationRequestData, BAS, type BasConfig, type ClientParams, CommunitySchema, CommunitySchemaUID, type DelegatedAttestParams, FixFeePaidSchema, FixFeePaidSchemaUID, FollowSchema, FollowSchemaUID, FollowedSchema, FollowedSchemaUID, GreenFieldClientTS, type GreenfieldConfig, type HandleOspReturnData, type HandleOspReturnDataOffChain, JoinSchema, JoinSchemaUID, JoinedSchema, JoinedSchemaUID, KmsClient, type KmsClientParams, type KmsCryptConfig, type MultiAttestationRequest, type MultiDelegatedAttestationRequest, OspDataType, OspDataTypeMap, OspSchemaMap, ProfileSchema, ProfileSchemaUID, type RegisterSchemaParams, SchemaEncoder, SeasonPassSchema, SeasonPassSchemaUID, type Signature, type SignedOffchainAttestation, SubscribeSchema, SubscribeSchemaUID, createObjectAttestOSP, createObjectMulAttestOSP, encodeAddrToBucketName, encodeCommunityData, type encodeCommunityDataParams, encodeFixFeePaidData, type encodeFixFeePaidDataParams, encodeFollowData, type encodeFollowDataParams, encodeFollowedData, encodeJoinData, type encodeJoinDataParams, encodeJoinedData, encodeProfileData, type encodeProfileDataParams, encodeSeasonPassData, type encodeSeasonPassDataParams, encodeSubscribeData, type encodeSubscribeDataParams, getAllSps, getAttestParamsOffChain, getAttestationBAS, getAttestationOffChain, getAttestationOffChainV1, getAttestationRequestData, getBasConfig, getDeployer, getGreenfieldConfig, getKmsCipherText, getKmsCryptConfig, getKmsPlainText, getKmsSigner, getMulAttestParams, getOffchainUIDBAS, getPrivateKey, getPrivateKeyByKms, getSchemaByUID, getSigatureByDelegation, getSps, getbBundleUID, handleOspRequestData, handleOspRequestPrepareOffChain, handleOspRequestPrepareOffChainV2, initEAS, multiAttestBASOffChain, multiAttestBASOnChain, multiAttestBasUploadGreenField, multiAttestBasUploadGreenField_String, oneAttestBasUploadGreenField, registerSchema, selectSp, serializeJsonString, setBasConfig, setGreenfieldConfig, setKmsCryptConfig, setOspBasSdkConfig, setPrivateKey, setPrivateKeyByKms, updateBucketQuota };
