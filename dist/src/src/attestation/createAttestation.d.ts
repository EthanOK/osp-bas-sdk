import { EAS } from "@ethereum-attestation-service/eas-sdk";
import { Signer } from "ethers";
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
/**
 * Create attestation
 * @param signer signer
 * @param bas bas
 * @param params attestation params
 * @returns attestation string
 */
export declare const createAttestOffChain: (signer: Signer, bas: EAS, params: AttestParams) => Promise<string>;
