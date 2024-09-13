import { hashMessage, getAddress } from "ethers";

export const encodeAddrToBucketName = (addr: string) => {
  return `bas-${hashMessage(getAddress(addr)).substring(2, 42)}`;
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
