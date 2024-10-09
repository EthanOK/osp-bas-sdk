import { hashMessage, getAddress, ethers, Signature, Signer } from "ethers";
import { SignedOffchainAttestation } from "../bas";
import crypto from "crypto";

/**
 * encode address to bucket name
 * @param addr
 * @returns bucket name
 */
export const encodeAddrToBucketName = (prefix: string, addr: string) => {
  return `${prefix}-${hashMessage(getAddress(addr)).substring(2, 42)}`;
};
export const getSps = async (client) => {
  const sps = await client.sp.getStorageProviders();
  const finalSps = (sps ?? []).filter((v) => v.endpoint.includes("nodereal"));
  return finalSps;
};
export const getAllSps = async (client) => {
  const sps = await getSps(client);
  return sps.map((sp) => {
    return {
      address: sp.operatorAddress,
      endpoint: sp.endpoint,
      name: sp.description?.moniker,
    };
  });
};
export const selectSp = async (client) => {
  const finalSps = await getSps(client);
  const selectIndex = Math.floor(Math.random() * finalSps.length);
  const secondarySpAddresses = [
    ...finalSps.slice(0, selectIndex),
    ...finalSps.slice(selectIndex + 1),
  ].map((item) => item.operatorAddress);
  const selectSpInfo = {
    //@ts-ignore
    id: finalSps[selectIndex].id || 0,
    endpoint: finalSps[selectIndex].endpoint,
    primarySpAddress: finalSps[selectIndex]?.operatorAddress,
    sealAddress: finalSps[selectIndex].sealAddress,
    secondarySpAddresses,
  };
  return selectSpInfo;
};

/**
 * Serialize Object To json string
 * @param data data type is object
 * @returns Json string
 */
export function serializeJsonString(data: any): string {
  return JSON.stringify(data, (key, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  });
}

export function getOffchainUIDBAS(
  version: number,
  schema: string,
  recipient: string,
  time: bigint,
  expirationTime: bigint,
  revocable: boolean,
  refUID: string,
  data: string
) {
  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
  return ethers.solidityPackedKeccak256(
    [
      "uint16",
      "bytes",
      "address",
      "address",
      "uint64",
      "uint64",
      "bool",
      "bytes32",
      "bytes",
      "uint32",
    ],
    [
      version,
      schema,
      recipient,
      ZERO_ADDRESS,
      time,
      expirationTime,
      revocable,
      refUID,
      data,
      0,
    ]
  );
}

export async function getAttestationBAS(
  signer: Signer,
  attestation: SignedOffchainAttestation
) {
  attestation.types = {
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
  attestation.domain.name = "BAS Attestation";
  const signature = await signer.signTypedData(
    attestation.domain,
    attestation.types,
    attestation.message
  );
  const new_signature = {
    v: Signature.from(signature).v,
    r: Signature.from(signature).r,
    s: Signature.from(signature).s,
  };
  attestation.signature = new_signature;
  const uid = getOffchainUIDBAS(
    attestation.message.version,
    attestation.message.schema,
    attestation.message.recipient,
    attestation.message.time,
    attestation.message.expirationTime,
    attestation.message.revocable,
    attestation.message.refUID,
    attestation.message.data
  );
  attestation.uid = uid;

  return attestation;
}

export function getbBundleUID(attestationUIDs: string[]): string {
  attestationUIDs.sort();
  const rr = attestationUIDs.join("");
  return sha256(rr);
}

function sha256(input: string): string {
  const hash = crypto.createHash("sha256");
  hash.update(input);
  return "0x" + hash.digest("hex");
}
