/**
 * @description encode address to bucket name
 * @param addr
 * @returns bucket name
 */
export declare const encodeAddrToBucketName: (addr: string) => string;
export declare const getSps: (client: any) => Promise<any>;
export declare const getAllSps: (client: any) => Promise<any>;
export declare const selectSp: (client: any) => Promise<{
    id: any;
    endpoint: any;
    primarySpAddress: any;
    sealAddress: any;
    secondarySpAddresses: any[];
}>;
