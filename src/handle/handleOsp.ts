import { AttestationRequestData } from "@ethereum-attestation-service/eas-sdk";
import {
  encodeCommunityData,
  encodeFollowData,
  encodeJoinData,
  encodeProfileData,
  OspDataType,
} from "../attestation/encodedOspData";
import {
  AttestParams,
  getAttestationRequestData,
  getAttestParamsOffChain,
} from "../attestation/createAttestation";

export type HandleOspReturnData = {
  dataType: number;
  requestData: AttestationRequestData;
};

export const handleOspRequestData = (
  chainId: number,
  jsonData: string
): HandleOspReturnData => {
  const data = JSON.parse(jsonData);

  if (Number(data.chainId) === chainId || chainId === 0) {
    if (data.name === "FollowSBTTransferred") {
      // console.log("FollowSBTTransferred");
      // console.log(data);
      const encodedData = encodeFollowData({
        followTx: data.transactionHash,
        follower: data.userAddress,
        followedProfileId: BigInt(data.referencedProfileId).toString(),
      });
      return {
        dataType: OspDataType.Follow,
        requestData: getAttestationRequestData(data.userAddress, encodedData),
      };
    } else if (data.name === "JoinNFTTransferred") {
      const encodedData = encodeJoinData({
        joinTx: data.transactionHash,
        joiner: data.userAddress,
        communityId: BigInt(data.communityId).toString(),
      });
      return {
        dataType: OspDataType.Join,
        requestData: getAttestationRequestData(data.userAddress, encodedData),
      };
    } else if (data.name === "ProfileCreated") {
      const encodedData = encodeProfileData({
        createProfileTx: data.transactionHash,
        profileOwner: data.userAddress,
        profileId: BigInt(data.profileId).toString(),
        handle: data.handle,
      });
      return {
        dataType: OspDataType.Profile,
        requestData: getAttestationRequestData(data.userAddress, encodedData),
      };
    } else if (data.name === "CommunityCreated") {
      const encodedData = encodeCommunityData({
        createCommunityTx: data.transactionHash,
        communityOwner: data.userAddress,
        communityId: BigInt(data.communityId).toString(),
        handle: data.handle,
        joinNFT: data.joinNFT,
      });
      return {
        dataType: OspDataType.Community,
        requestData: getAttestationRequestData(data.userAddress, encodedData),
      };
    }
  }

  return {
    dataType: OspDataType.None,
    requestData: null,
  };
};

export type HandleOspReturnDataOffChain = {
  dataType: number;
  requestData: AttestParams;
};
export const handleOspRequestPrepareOffChain = (
  chainId: number,
  jsonData: string
): HandleOspReturnDataOffChain => {
  const data = JSON.parse(jsonData);

  if (Number(data.chainId) === chainId || chainId === 0) {
    if (data.name === "FollowSBTTransferred") {
      // console.log("FollowSBTTransferred");
      // console.log(data);
      const encodedData = encodeFollowData({
        followTx: data.transactionHash,
        follower: data.userAddress,
        followedProfileId: BigInt(data.referencedProfileId).toString(),
      });
      return {
        dataType: OspDataType.Follow,
        requestData: getAttestParamsOffChain(
          OspDataType.Follow,
          data.userAddress,
          encodedData
        ),
      };
    } else if (data.name === "JoinNFTTransferred") {
      const encodedData = encodeJoinData({
        joinTx: data.transactionHash,
        joiner: data.userAddress,
        communityId: BigInt(data.communityId).toString(),
      });
      return {
        dataType: OspDataType.Join,
        requestData: getAttestParamsOffChain(
          OspDataType.Join,
          data.userAddress,
          encodedData
        ),
      };
    } else if (data.name === "ProfileCreated") {
      const encodedData = encodeProfileData({
        createProfileTx: data.transactionHash,
        profileOwner: data.userAddress,
        profileId: BigInt(data.profileId).toString(),
        handle: data.handle,
      });
      return {
        dataType: OspDataType.Profile,
        requestData: getAttestParamsOffChain(
          OspDataType.Profile,
          data.userAddress,
          encodedData
        ),
      };
    } else if (data.name === "CommunityCreated") {
      const encodedData = encodeCommunityData({
        createCommunityTx: data.transactionHash,
        communityOwner: data.userAddress,
        communityId: BigInt(data.communityId).toString(),
        handle: data.handle,
        joinNFT: data.joinNFT,
      });
      return {
        dataType: OspDataType.Community,
        requestData: getAttestParamsOffChain(
          OspDataType.Community,
          data.userAddress,
          encodedData
        ),
      };
    }
  }

  return {
    dataType: OspDataType.None,
    requestData: null,
  };
};
