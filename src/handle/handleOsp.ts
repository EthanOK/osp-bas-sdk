import { AttestationRequestData } from "@ethereum-attestation-service/eas-sdk";
import {
  encodeCommunityData,
  encodeFollowData,
  encodeFollowedData,
  encodeJoinData,
  encodeJoinedData,
  encodeProfileData,
  encodeSeasonPassData,
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
        followedAddress: data.referencedUserAddress,
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
        communityOwner: data.communityOwnerAddress,
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
): HandleOspReturnDataOffChain[] => {
  const data = JSON.parse(jsonData);
  let handledDatas = new Array<HandleOspReturnDataOffChain>();

  if (Number(data.chainId) === chainId || chainId === 0) {
    if (data.name === "FollowSBTTransferred") {
      // console.log("FollowSBTTransferred");
      // console.log(data);
      const followData = {
        followTx: data.transactionHash,
        follower: data.userAddress,
        followedAddress: data.referencedUserAddress,
        followedProfileId: BigInt(data.referencedProfileId).toString(),
      };
      const encodedFollowData = encodeFollowData(followData);
      handledDatas.push({
        dataType: OspDataType.Follow,
        requestData: getAttestParamsOffChain(
          OspDataType.Follow,
          data.userAddress,
          encodedFollowData
        ),
      });

      const encodedFollowedData = encodeFollowedData(followData);
      handledDatas.push({
        dataType: OspDataType.Followed,
        requestData: getAttestParamsOffChain(
          OspDataType.Followed,
          data.referencedUserAddress,
          encodedFollowedData
        ),
      });
    } else if (data.name === "JoinNFTTransferred") {
      const joinData = {
        joinTx: data.transactionHash,
        joiner: data.userAddress,
        communityId: BigInt(data.communityId).toString(),
        communityOwner: data.communityOwnerAddress,
      };
      const encodedJoinData = encodeJoinData(joinData);
      handledDatas.push({
        dataType: OspDataType.Join,
        requestData: getAttestParamsOffChain(
          OspDataType.Join,
          data.userAddress,
          encodedJoinData
        ),
      });

      const encodedJoinedData = encodeJoinedData(joinData);
      handledDatas.push({
        dataType: OspDataType.Joined,
        requestData: getAttestParamsOffChain(
          OspDataType.Joined,
          data.communityOwnerAddress,
          encodedJoinedData
        ),
      });
    } else if (data.name === "ProfileCreated") {
      const encodedData = encodeProfileData({
        createProfileTx: data.transactionHash,
        profileOwner: data.userAddress,
        profileId: BigInt(data.profileId).toString(),
        handle: data.handle,
      });
      handledDatas.push({
        dataType: OspDataType.Profile,
        requestData: getAttestParamsOffChain(
          OspDataType.Profile,
          data.userAddress,
          encodedData
        ),
      });
    } else if (data.name === "CommunityCreated") {
      const encodedData = encodeCommunityData({
        createCommunityTx: data.transactionHash,
        communityOwner: data.userAddress,
        communityId: BigInt(data.communityId).toString(),
        handle: data.handle,
        joinNFT: data.joinNFT,
      });
      handledDatas.push({
        dataType: OspDataType.Community,
        requestData: getAttestParamsOffChain(
          OspDataType.Community,
          data.userAddress,
          encodedData
        ),
      });
    }
  } else {
    handledDatas.push({
      dataType: OspDataType.None,
      requestData: null,
    });
  }

  return handledDatas;
};

export const handleOspRequestPrepareOffChainV2 = (
  chainId: number,
  jsonData: string
): HandleOspReturnDataOffChain[] => {
  const data = JSON.parse(jsonData);
  let handledDatas = new Array<HandleOspReturnDataOffChain>();
  try {
    if (data.event_name === "followed") {
      const followData = {
        followTx: data.transaction_hash,
        follower: data.follower,
        // TODO: add followed_address
        followedAddress: data.followed_address,
        followedProfileId: BigInt(data.profile_id).toString(),
      };
      const encodedFollowData = encodeFollowData(followData);
      handledDatas.push({
        dataType: OspDataType.Follow,
        requestData: getAttestParamsOffChain(
          OspDataType.Follow,
          data.follower,
          encodedFollowData
        ),
      });

      const encodedFollowedData = encodeFollowedData(followData);
      handledDatas.push({
        dataType: OspDataType.Followed,
        requestData: getAttestParamsOffChain(
          OspDataType.Followed,
          data.followed_address,
          encodedFollowedData
        ),
      });
    } else if (data.name === "joined") {
      const joinData = {
        joinTx: data.transaction_hash,
        joiner: data.joiner,
        communityId: BigInt(data.community_id).toString(),
        // TODO: add community_owner_address
        communityOwner: data.community_owner_address,
      };
      const encodedJoinData = encodeJoinData(joinData);
      handledDatas.push({
        dataType: OspDataType.Join,
        requestData: getAttestParamsOffChain(
          OspDataType.Join,
          data.joiner,
          encodedJoinData
        ),
      });

      const encodedJoinedData = encodeJoinedData(joinData);
      handledDatas.push({
        dataType: OspDataType.Joined,
        requestData: getAttestParamsOffChain(
          OspDataType.Joined,
          data.community_owner_address,
          encodedJoinedData
        ),
      });
    } else if (data.name === "profile_created") {
      const encodedData = encodeProfileData({
        createProfileTx: data.transaction_hash,
        profileOwner: data.to,
        profileId: BigInt(data.profile_id).toString(),
        handle: data.handle,
      });
      handledDatas.push({
        dataType: OspDataType.Profile,
        requestData: getAttestParamsOffChain(OspDataType.Profile, data.to, encodedData),
      });
    } else if (data.name === "community_created") {
      const encodedData = encodeCommunityData({
        createCommunityTx: data.transaction_hash,
        communityOwner: data.to,
        communityId: BigInt(data.community_id).toString(),
        handle: data.handle,
        joinNFT: data.joinNFT,
      });
      handledDatas.push({
        dataType: OspDataType.Community,
        requestData: getAttestParamsOffChain(OspDataType.Community, data.to, encodedData),
      });
    } else if (data.name === "season_pass_purchased") {
      const encodedData = encodeSeasonPassData({
        purchaseTx: data.transaction_hash,
        purchaser: data.user,
        seasonId: BigInt(data.id).toString(),
        count: BigInt(data.count).toString(),
      });
      handledDatas.push({
        dataType: OspDataType.SeasonPass,
        requestData: getAttestParamsOffChain(
          OspDataType.SeasonPass,
          data.user,
          encodedData,
          data.block_timestamp
        ),
      });
    }
  } catch (error) {
    console.log(error);
  }

  return handledDatas;
};
