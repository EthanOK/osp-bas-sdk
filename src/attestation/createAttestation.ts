// import { SchemaEncoder, BAS } from "@bnb-attestation-service/bas-sdk";
import {
  EAS,
  EIP712AttestationParams,
  Offchain,
  OffchainAttestationParams,
  SchemaEncoder,
  SignedOffchainAttestation,
} from "@ethereum-attestation-service/eas-sdk";
import { ethers, Signature, Signer } from "ethers";
import { BNB_schemaRegistryAddress } from "../../tests/config";
import { getSchemaByUID } from "../schema/register";
import { throws } from "assert";
import { AttestationRequestData, MultiAttestationRequest } from "../bas";
import { OspDataType, OspDataTypeMap } from "./encodedOspData";
import {
  HandleOspReturnData,
  HandleOspReturnDataOffChain,
} from "../handle/handleOsp";
import { getAttestationBAS, getOffchainUIDBAS } from "../greenfield/utils";
import { getBasConfig } from "../config/config";

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
  timestamp?: string | number;
  expirationTime?: string | number;
};

export interface DelegatedAttestParams extends AttestParams {
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
export const getAttestationOffChain = async (
  offchain: Offchain,
  signer: Signer,
  params: AttestParams
): Promise<SignedOffchainAttestation> => {
  const timestamp_temp = Math.floor(Date.now() / 1000);

  const attestation = await offchain.signOffchainAttestation(
    {
      recipient: params.recipient,
      // Unix timestamp of when attestation expires. (0 for no expiration)
      expirationTime: BigInt(params.expirationTime ? params.expirationTime : 0),
      // Unix timestamp of current time
      time: BigInt(params.timestamp ? params.timestamp : timestamp_temp),
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

export const getAttestationOffChainV1 = async (
  offchain: Offchain,
  signer: Signer,
  params: AttestParams
): Promise<SignedOffchainAttestation> => {
  const timestamp = Math.floor(Date.now() / 1000);
  const temp_domain = offchain.getDomainTypedData();

  const message = {
    recipient: params.recipient,
    // Unix timestamp of when attestation expires. (0 for no expiration)
    expirationTime: BigInt(params.expirationTime ? params.expirationTime : 0),
    // Unix timestamp of current time
    time: BigInt(params.timestamp ? params.timestamp : timestamp),
    revocable: true,
    version: 1, // Fixed value
    nonce: BigInt(0), // Fixed value
    schema: params.schemaUID,
    refUID: params.refUID,
    data: params.encodedData,
  };

  const types = {
    Attest: [
      { name: "version", type: "uint16" },
      { name: "schema", type: "bytes32" },
      { name: "recipient", type: "address" },
      { name: "time", type: "uint64" },
      { name: "expirationTime", type: "uint64" },
      { name: "revocable", type: "bool" },
      { name: "refUID", type: "bytes32" },
      { name: "data", type: "bytes" },
      { name: "nonce", type: "uint64" },
    ],
  };

  const domain = {
    name: "BAS Attestation",
    version: temp_domain.version,
    chainId: temp_domain.chainId,
    verifyingContract: temp_domain.verifyingContract,
  };
  const signature = await signer.signTypedData(domain, types, message);
  const new_signature = {
    v: Signature.from(signature).v,
    r: Signature.from(signature).r,
    s: Signature.from(signature).s,
  };

  const uid = getOffchainUIDBAS(
    message.version,
    message.schema,
    message.recipient,
    message.time,
    message.expirationTime,
    message.revocable,
    message.refUID,
    message.data
  );

  const attestation: SignedOffchainAttestation = {
    domain: domain,
    primaryType: "Attest",
    message: message,
    types: types as any,
    signature: new_signature,
    uid: uid,
  };

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
  encodedData: string,
  timestamp?: string | number,
  expirationTime?: string | number
) => {
  const params: AttestParams = {
    schemaUID: OspDataTypeMap.get(dataType),
    encodedData: encodedData,
    recipient: recipient,
    refUID:
      "0x0000000000000000000000000000000000000000000000000000000000000000",
    timestamp: timestamp,
    expirationTime: expirationTime,
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
    const basConfig = getBasConfig();
    if (basConfig == null) {
      throw new Error("basConfig is null");
    }
    const basAddress = basConfig.BAS_ADDRESS;
    if (basAddress == null || basAddress == "") {
      throw new Error("BAS_ADDRESS is null");
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
 * get multi attestation
 * @param signer signer
 * @param unHandleDatas
 * @returns attestations  SignedOffchainAttestation[]
 */
export const multiAttestBASOffChain = async (
  signer: Signer,
  unHandleDatas: HandleOspReturnDataOffChain[]
): Promise<SignedOffchainAttestation[]> => {
  const basConfig = getBasConfig();
  if (basConfig == null) {
    throw new Error("basConfig is null");
  }

  const offchain = await new EAS(basConfig.BAS_ADDRESS)
    .connect(signer)
    .getOffchain();

  const attestations: SignedOffchainAttestation[] = [];
  try {
    for (let i = 0; i < unHandleDatas.length; i++) {
      const data = unHandleDatas[i];
      if (data.dataType == OspDataType.None) {
        continue;
      }
      // const attestation = await getAttestationOffChain(
      //   offchain,
      //   signer,
      //   data.requestData
      // );
      // Re-sign:
      // const attestation_new = await getAttestationBAS(signer, attestation);
      const attestation_new = await getAttestationOffChainV1(
        offchain,
        signer,
        data.requestData
      );
      attestations.push(attestation_new);
    }
    return attestations;
  } catch (error) {
    console.log(error);
    return null;
  }
};
