import {
  EAS as BaseEAS,
  SchemaEncoder as BaseSchemaEncoder,
  MultiAttestationRequest as BaseMultiAttestationRequest,
  AttestationRequestData as BaseAttestationRequestData,
} from "@ethereum-attestation-service/eas-sdk";

export const BAS = BaseEAS;
export const SchemaEncoder = BaseSchemaEncoder;
export type MultiAttestationRequest = BaseMultiAttestationRequest;
export type AttestationRequestData = BaseAttestationRequestData;
