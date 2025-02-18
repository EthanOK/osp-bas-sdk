import {
  EAS as BaseEAS,
  SchemaEncoder as BaseSchemaEncoder,
  MultiAttestationRequest as BaseMultiAttestationRequest,
  AttestationRequestData as BaseAttestationRequestData,
  MultiDelegatedAttestationRequest as BaseMultiDelegatedAttestationRequest,
  SignedOffchainAttestation as BaseSignedOffchainAttestation,
} from "@ethereum-attestation-service/eas-sdk";

export const BAS = BaseEAS;
export const SchemaEncoder = BaseSchemaEncoder;
export type MultiAttestationRequest = BaseMultiAttestationRequest;
export type AttestationRequestData = BaseAttestationRequestData;
export type MultiDelegatedAttestationRequest =
  BaseMultiDelegatedAttestationRequest;
export type SignedOffchainAttestation = BaseSignedOffchainAttestation;
export interface Signature {
  r: string;
  s: string;
  v: number;
}
