// import { SchemaEncoder, BAS } from "@bnb-attestation-service/bas-sdk";
import {
  EAS,
  EIP712AttestationParams,
  Offchain,
  OffchainAttestationParams,
  SchemaEncoder,
  SignedOffchainAttestation,
} from "@ethereum-attestation-service/eas-sdk";
import { ethers, Signer } from "ethers";
import { BNB_schemaRegistryAddress } from "../../tests/config";
import { getSchemaByUID } from "../schema/register";
import { throws } from "assert";
import { AttestationRequestData, MultiAttestationRequest } from "../bas";
import { OspDataType, OspDataTypeMap } from "./encodedOspData";
import {
  HandleOspReturnData,
  HandleOspReturnDataOffChain,
} from "../handle/handleOsp";
import { off } from "process";
import { getAttestationBAS } from "../greenfield/utils";

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
 * @returns attestation Json Object
 */
export const getAttestationOffChain = async (
  offchain: Offchain,
  signer: Signer,
  params: AttestParams
) => {
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

  return attestation;
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

export const getAttestationRequestData = (
  recipient: string,
  encodedData: string
) => {
  const attestationRequestData: AttestationRequestData = {
    recipient: recipient,
    expirationTime: BigInt(0),
    revocable: true,
    data: encodedData,
    refUID:
      "0x0000000000000000000000000000000000000000000000000000000000000000",
    value: BigInt(0),
  };
  return attestationRequestData;
};

export const getAttestParamsOffChain = (
  dataType: OspDataType,
  recipient: string,
  encodedData: string
) => {
  const params: AttestParams = {
    schemaUID: OspDataTypeMap.get(dataType),
    encodedData: encodedData,
    recipient: recipient,
    refUID:
      "0x0000000000000000000000000000000000000000000000000000000000000000",
  };
  return params;
};

export const getMulAttestParams = (
  params: HandleOspReturnData[]
): MultiAttestationRequest[] => {
  const groupedParams: { [key: number]: HandleOspReturnData[] } = {};

  params.forEach((param) => {
    if (!groupedParams[param.dataType]) {
      groupedParams[param.dataType] = [];
    }
    groupedParams[param.dataType].push(param);
  });

  const result: MultiAttestationRequest[] = Object.keys(groupedParams).map(
    (dataTypeStr) => ({
      schema: OspDataTypeMap.get(parseInt(dataTypeStr)),
      data: groupedParams[parseInt(dataTypeStr)].map(
        (param) => param.requestData
      ),
    })
  );

  return result;
};

/**
 * Create multi attestation
 * @param signer signer
 * @param params multi attestation params
 * @returns attestation uids
 */
export const multiAttestBASOnChain = async (
  signer: Signer,
  params: MultiAttestationRequest[]
) => {
  try {
    const basAddress = process.env.BAS_ADDRESS_OPBNB;
    if (basAddress == null || basAddress == "") {
      throw new Error("BAS_ADDRESS_OPBNB is not config in env file");
    }

    const bas = new EAS(basAddress);
    bas.connect(signer);
    const txs = await bas.multiAttest(params);
    const attestUIDs = await txs.wait();
    return attestUIDs;
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 * Create multi attestation
 * @param signer signer
 * @param params multi attestation params
 * @returns attestations type is json object[]
 */
export const multiAttestBASOffChain = async (
  signer: Signer,
  unHandleDatas: HandleOspReturnDataOffChain[]
): Promise<SignedOffchainAttestation[]> => {
  const offchain = await new EAS(process.env.BAS_ADDRESS_BNB!)
    .connect(signer)
    .getOffchain();
 
  const attestations: SignedOffchainAttestation[] = [];
  try {
    for (let i = 0; i < unHandleDatas.length; i++) {
      const data = unHandleDatas[i];
      if (data.dataType == OspDataType.None) {
        continue;
      }
      // TODO: 优化签名
      const attestation = await getAttestationOffChain(
        offchain,
        signer,
        data.requestData
      ); 
      const attestation_new = await getAttestationBAS(signer, attestation);
      attestations.push(attestation_new);
    }
    return attestations;
  } catch (error) {
    console.log(error);
    return null;
  }
};
