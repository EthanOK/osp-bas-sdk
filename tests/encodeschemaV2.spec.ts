import {
  handleOspRequestPrepareOffChainV2,
  // } from "osp-bas-sdk";
} from "../src";

describe("Test handleOspRequestPrepareOffChainV2", () => {
  it("Test Follow", async () => {
    const followJson = {
      follower: "0x55322cefd524e03839c8a4661fbcdfc15fe976b7",
      ctx: "0x000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000113932303038343338323235313734353337000000000000000000000000000000",
      followConditionData: "0x",
      blockNumber: 37803969,
      vid: 11515755,
      tokenId: 44,
      profileId: 126562,
      followerProfileId: 126463,
      blockTimestamp: 1729557692,
      address: "0x00000066c6c6fca286f48a7f4e989b7198c26caf",
      eventName: "Followed",
      transactionHash:
        "0xdb1f213ea9f796eb32b2ca895a06b5c13a347c5f40f8e41722d0488e1a5389ce",
    };
    // TODO
    const new_followJson = {
      ...followJson,
      followed: "0x66322cefd524e03839c8a4661fbcdfc15fe976b7",
    };

    const handleOspReturnData = handleOspRequestPrepareOffChainV2(
      null,
      JSON.stringify(new_followJson)
    );
    console.log("Follow Data:\n", handleOspReturnData);
  });

  it("Test Join", async () => {
    const joinJson = {
      joinConditionData: "0x",
      address: "0x00000066c6c6fca286f48a7f4e989b7198c26caf",
      ctx: "0x000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000643000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000113932303038343338323235313734353337000000000000000000000000000000",
      blockNumber: 37929349,
      joinerProfileId: 262039,
      vid: 1043582,
      communityId: 1603,
      tokenId: 4084,
      blockTimestamp: 1729683072,
      joiner: "0x85f084201a0c1614afa1513ee1530ef64979f342",
      eventName: "Joined",
      transactionHash:
        "0x81cdb2ddaa768a59b97f7bf288286aa50fc6c5ba252905d14fc9dc095bfc0c1b",
      timestamp: 1729683072,
    };
    // TODO
    const new_joinJson = {
      ...joinJson,
      communityOwner: "0x66322cefd524e03839c8a4661fbcdfc15fe976b7",
    };
    const handleOspReturnData = handleOspRequestPrepareOffChainV2(
      null,
      JSON.stringify(new_joinJson)
    );
    console.log("Join Data:\n", handleOspReturnData);
  });

  it("Test Proifle", async () => {
    const profileJson = {
      address: "0x00000066c6c6fca286f48a7f4e989b7198c26caf",
      ctx: "0x0001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000001b054c75682ab4686089f1a5bdecf9f9ba20ce3ee94436d184338397e711335b3da00000000000000000000000000000000000000000000000000000000000000113932303038343338323235313734353337000000000000000000000000000000",
      blockNumber: 37929787,
      handle: "soiiii",
      vid: 364146,
      followCondition: "0x0000000000000000000000000000000000000000",
      profileId: 364147,
      blockTimestamp: 1729683510,
      eventName: "ProfileCreated",
      inviter: 0,
      to: "0xa2ab906e307df2410dbbde11071cd049a2a0a3fd",
      transactionHash:
        "0xf6a203c7a7017e2e9bd4ea9caf9ab90d68205e51f0ee17248ec23bd3f6f82c7c",
      timestamp: 1729683510,
    };
    const handleOspReturnData = handleOspRequestPrepareOffChainV2(
      null,
      JSON.stringify(profileJson)
    );
    console.log("Profile Data:\n", handleOspReturnData);
  });

  it("Test Community", async () => {
    const communityJson = {
      vid: 2,
      communityId: 2,
      to: "0xb9dd6f077e2fa7d32596240f2409ea904922a27f",
      handle: "memes",
      community_condition_and_data: "0x",
      joinCondition: "0x0000000000000000000000000000000000000000",
      joinNft: "0x7ebef6a7890bf7130c5959d92e09c2f0185aee46",
      tags: ["general"],
      ctx: "0x",
      timestamp: 1726069291,
      blockNumber: 34315568,
      blockTimestamp: 1726069291,
      transactionHash:
        "0x0335bd4c23ca5b6efdb3e978660427ea1810f3517aeb95e9223475ee625111c1",
      eventName: "CommunityCreated",
      address: "0x00000066c6c6fca286f48a7f4e989b7198c26caf",
    };
    const handleOspReturnData = handleOspRequestPrepareOffChainV2(
      null,
      JSON.stringify(communityJson)
    );
    console.log("Community Data:\n", handleOspReturnData);
  });

  it("Test SeasonPass", async () => {
    const seasonPassJson = {
      vid: 3,
      seasonPassId: 1,
      user: "0x70fd21dec636771844ac5ba1c8086aff8c0d1cd7",
      count: 1,
      currency: "0x0000000000000000000000000000000000000000",
      amount: 5000000000000000,
      timestamp: 1726714967,
      blockNumber: 34961244,
      blockTimestamp: 1726714967,
      transactionHash:
        "0xf89507b1685064a70d6e1cb6bd4890f737990c8105c22b2097b02826a856b5c7",
      eventName: "SeasonPassPurchased",
      address: "0x067b5ab68e8db251f3f497f2273cdd9ab05567b2",
    };
    const handleOspReturnData = handleOspRequestPrepareOffChainV2(
      null,
      JSON.stringify(seasonPassJson)
    );
    console.log("SeasonPass Data:\n", handleOspReturnData);
  });

  it("Test Subscription", async () => {
    const subscriptionJson = {
      vid: 1,
      communityId: 2,
      account: "0xb9dd6f077e2fa7d32596240f2409ea904922a27f",
      currency: "0x0000000000000000000000000000000000000000",
      price: 5000000000000000,
      timestamp: 1726725562,
      duration: 1000,
      deadline: 1726735562,
      blockTimestamp: 1726725562,
      transactionHash:
        "0x5466a8f379b3030d64276d41ea39e0976085a5f50cd84aacda3059341a1f18b4",
      eventName: "SubscriptionPurchased",
      address: "0x0000004b90ba819700af15b052ee151ccc49fb34",
    };
    const handleOspReturnData = handleOspRequestPrepareOffChainV2(
      null,
      JSON.stringify(subscriptionJson)
    );
    console.log("Subscription Data:\n", handleOspReturnData);
  });

  it("Test FixFeePaid", async () => {
    const fixFeePaidJson = {
      vid: 1,
      to: "0x1e86c713ba24f4f7f7179224972e9ece434c8b1a",
      price: 5000000000000000,
      handle: "last_odyssey",
      timestamp: 1726725562,
      blockNumber: 34971839,
      blockTimestamp: 1726725562,
      transactionHash:
        "0x5466a8f379b3030d64276d41ea39e0976085a5f50cd84aacda3059341a1f18b4",
      eventName: "FixFeePaid",
      address: "0x000000bdfd02ade1a65876214981ddce0092e5f5",
    };
    const handleOspReturnData = handleOspRequestPrepareOffChainV2(
      null,
      JSON.stringify(fixFeePaidJson)
    );
    console.log("CreationFeePaid Data:\n", handleOspReturnData);
  });
});
