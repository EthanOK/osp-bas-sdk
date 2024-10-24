import { SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";

export enum OspDataType {
  None = 0,
  Profile = 1,
  Follow = 2,
  Followed = 3,
  Community = 4,
  Join = 5,
  Joined = 6,
  SeasonPass = 7,
}

export const ProfileSchemaUID =
  "0x7c90370dcf194ce4c2851abec14da05abd98d8860ae7147ac714755430d42f6e";
export const FollowSchemaUID =
  "0xc21ba57124d1c884e89d561c9ba60a80a98733d2553d000d06cc5a98a0534b11";
export const FollowedSchemaUID =
  "0xa0d8de56036149d7613854b8e58ce2bcc402cd065bae55a96d7a5f86095d5221";
export const CommunitySchemaUID =
  "0x18c1dbf9c1a1c6a64b661c23110116f80b7d6897839334b724ea2a46056bee94";
export const JoinSchemaUID =
  "0x15ce785a4cd0951c813f27917308bb632162855f33d4a93b3bf05e35a70c8510";
export const JoinedSchemaUID =
  "0xe1685d5f5e58134cbcd44a1f3250027c2192a2c9552cb1fbe048ad3e6e999ed6";
export const SeasonPassSchemaUID =
  "0x4609ac6fb186f5039fdcd79af66ecae94c45bd0ad8b68032014a3930dbdc70af";

export const OspDataTypeMap = new Map([
  [OspDataType.Profile, ProfileSchemaUID],
  [OspDataType.Follow, FollowSchemaUID],
  [OspDataType.Followed, FollowedSchemaUID],
  [OspDataType.Community, CommunitySchemaUID],
  [OspDataType.Join, JoinSchemaUID],
  [OspDataType.Joined, JoinedSchemaUID],
  [OspDataType.SeasonPass, SeasonPassSchemaUID],
]);

export const ProfileSchema =
  "bytes32 createProfileTx, address profileOwner, uint256 profileId, string handle";
export const FollowSchema =
  "bytes32 followTx, address follower, address followedAddress, uint256 followedProfileId";
export const FollowedSchema =
  "bytes32 followTx, string type, address follower, address followedAddress, uint256 followedProfileId";
export const CommunitySchema =
  "bytes32 createCommunityTx, address communityOwner, uint256 communityId, string handle, address joinNFT";
export const JoinSchema =
  "bytes32 joinTx, address joiner, uint256 communityId, address communityOwner";
export const JoinedSchema =
  "bytes32 joinTx, string type, address joiner, uint256 communityId, address communityOwner";
// TODO
export const SeasonPassSchema =
  "bytes32 purchaseTx, address purchaser, uint256 seasonId, uint256 count";

export const OspSchemaMap = new Map([
  [OspDataType.Profile, ProfileSchema],
  [OspDataType.Follow, FollowSchema],
  [OspDataType.Followed, FollowedSchema],
  [OspDataType.Community, CommunitySchema],
  [OspDataType.Join, JoinSchema],
  [OspDataType.Joined, JoinedSchema],
  [OspDataType.SeasonPass, SeasonPassSchema],
]);

export type encodeFollowDataParams = {
  followTx: string;
  follower: string;
  followedAddress: string;
  followedProfileId: string;
};
export const encodeFollowData = (param: encodeFollowDataParams) => {
  const schemaEncoder = new SchemaEncoder(FollowSchema);

  return schemaEncoder.encodeData([
    { name: "followTx", value: param.followTx, type: "bytes32" },
    { name: "follower", value: param.follower, type: "address" },
    { name: "followedAddress", value: param.followedAddress, type: "address" },
    { name: "followedProfileId", value: param.followedProfileId, type: "uint256" },
  ]);
};

export const encodeFollowedData = (param: encodeFollowDataParams) => {
  const schemaEncoder = new SchemaEncoder(FollowedSchema);

  return schemaEncoder.encodeData([
    { name: "followTx", value: param.followTx, type: "bytes32" },
    { name: "type", value: "followed", type: "string" },
    { name: "follower", value: param.follower, type: "address" },
    { name: "followedAddress", value: param.followedAddress, type: "address" },
    { name: "followedProfileId", value: param.followedProfileId, type: "uint256" },
  ]);
};

export type encodeProfileDataParams = {
  createProfileTx: string;
  profileOwner: string;
  profileId: string;
  handle: string;
};
export const encodeProfileData = (param: encodeProfileDataParams) => {
  const schemaEncoder = new SchemaEncoder(ProfileSchema);
  return schemaEncoder.encodeData([
    { name: "createProfileTx", value: param.createProfileTx, type: "bytes32" },
    { name: "profileOwner", value: param.profileOwner, type: "address" },
    { name: "profileId", value: param.profileId, type: "uint256" },
    { name: "handle", value: param.handle, type: "string" },
  ]);
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
    { name: "createCommunityTx", value: param.createCommunityTx, type: "bytes32" },
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
  communityOwner: string;
};
export const encodeJoinData = (param: encodeJoinDataParams) => {
  const schemaEncoder = new SchemaEncoder(JoinSchema);
  const encodedData = schemaEncoder.encodeData([
    { name: "joinTx", value: param.joinTx, type: "bytes32" },
    { name: "joiner", value: param.joiner, type: "address" },
    { name: "communityId", value: param.communityId, type: "uint256" },
    { name: "communityOwner", value: param.communityOwner, type: "address" },
  ]);
  return encodedData;
};

export const encodeJoinedData = (param: encodeJoinDataParams) => {
  const schemaEncoder = new SchemaEncoder(JoinedSchema);
  const encodedData = schemaEncoder.encodeData([
    { name: "joinTx", value: param.joinTx, type: "bytes32" },
    { name: "type", value: "joined", type: "string" },
    { name: "joiner", value: param.joiner, type: "address" },
    { name: "communityId", value: param.communityId, type: "uint256" },
    { name: "communityOwner", value: param.communityOwner, type: "address" },
  ]);
  return encodedData;
};

export type encodeSeasonPassDataParams = {
  purchaseTx: string;
  purchaser: string;
  seasonId: string;
  count: string;
};

export const encodeSeasonPassData = (param: encodeSeasonPassDataParams) => {
  const schemaEncoder = new SchemaEncoder(SeasonPassSchema);

  return schemaEncoder.encodeData([
    { name: "purchaseTx", value: param.purchaseTx, type: "bytes32" },
    { name: "purchaser", value: param.purchaser, type: "address" },
    { name: "seasonId", value: param.seasonId, type: "uint256" },
    { name: "count", value: param.count, type: "uint256" },
  ]);
};
