import { SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";

export enum OspDataType {
  None = 0,
  Follow = 1,
  Profile = 2,
  Community = 3,
  Join = 4,
}

export const FollowSchemaUID =
  "0x1c9575bc318527d66fad7fc50aae6e2153185fcc624e14cf0af562d87d869be2";
export const ProfileSchemaUID =
  "0x7c90370dcf194ce4c2851abec14da05abd98d8860ae7147ac714755430d42f6e";
export const CommunitySchemaUID =
  "0x18c1dbf9c1a1c6a64b661c23110116f80b7d6897839334b724ea2a46056bee94";
export const JoinSchemaUID =
  "0x3a017e34de4075a58f3a6a2826823a95bf38924b87646b68621c5fb4c2201069";

export const OspDataTypeMap = new Map([
  [OspDataType.Follow, FollowSchemaUID],
  [OspDataType.Profile, ProfileSchemaUID],
  [OspDataType.Community, CommunitySchemaUID],
  [OspDataType.Join, JoinSchemaUID],
]);

export const FollowSchema =
  "bytes32 followTx, address follower, uint256 followedProfileId";
export const ProfileSchema =
  "bytes32 createProfileTx, address profileOwner, uint256 profileId, string handle";
export const CommunitySchema =
  "bytes32 createCommunityTx, address communityOwner, uint256 communityId, string handle, address joinNFT";
export const JoinSchema = "bytes32 joinTx, address joiner, uint256 communityId";

export const OspSchemaMap = new Map([
  [OspDataType.Follow, FollowSchema],
  [OspDataType.Profile, ProfileSchema],
  [OspDataType.Community, CommunitySchema],
  [OspDataType.Join, JoinSchema],
]);

export type encodeFollowDataParams = {
  followTx: string;
  follower: string;
  followedProfileId: string;
};
export const encodeFollowData = (param: encodeFollowDataParams) => {
  const schemaEncoder = new SchemaEncoder(FollowSchema);

  const encodedData = schemaEncoder.encodeData([
    { name: "followTx", value: param.followTx, type: "bytes32" },
    { name: "follower", value: param.follower, type: "address" },
    {
      name: "followedProfileId",
      value: param.followedProfileId,
      type: "uint256",
    },
  ]);
  return encodedData;
};

export type encodeProfileDataParams = {
  createProfileTx: string;
  profileOwner: string;
  profileId: string;
  handle: string;
};
export const encodeProfileData = (param: encodeProfileDataParams) => {
  const schemaEncoder = new SchemaEncoder(ProfileSchema);
  const encodedData = schemaEncoder.encodeData([
    { name: "createProfileTx", value: param.createProfileTx, type: "bytes32" },
    { name: "profileOwner", value: param.profileOwner, type: "address" },
    { name: "profileId", value: param.profileId, type: "uint256" },
    { name: "handle", value: param.handle, type: "string" },
  ]);
  return encodedData;
};

export type encodeCommunityDataParams = {
  createCommunityTx: string;
  communityOwner: string;
  communityId: string;
  handle: string;
  joinNFT: string;
};
export const encodeCommunityData = (param: encodeCommunityDataParams) => {
  const schemaEncoder = new SchemaEncoder(CommunitySchema);
  const encodedData = schemaEncoder.encodeData([
    {
      name: "createCommunityTx",
      value: param.createCommunityTx,
      type: "bytes32",
    },
    { name: "communityOwner", value: param.communityOwner, type: "address" },
    { name: "communityId", value: param.communityId, type: "uint256" },
    { name: "handle", value: param.handle, type: "string" },
    { name: "joinNFT", value: param.joinNFT, type: "address" },
  ]);

  return encodedData;
};

export type encodeJoinDataParams = {
  joinTx: string;
  joiner: string;
  communityId: string;
};
export const encodeJoinData = (param: encodeJoinDataParams) => {
  const schemaEncoder = new SchemaEncoder(JoinSchema);
  const encodedData = schemaEncoder.encodeData([
    { name: "joinTx", value: param.joinTx, type: "bytes32" },
    { name: "joiner", value: param.joiner, type: "address" },
    { name: "communityId", value: param.communityId, type: "uint256" },
  ]);
  return encodedData;
};
