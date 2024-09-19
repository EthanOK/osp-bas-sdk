import { assert } from "chai";
import { BNB_basAddress } from "./config";
import { ethers } from "ethers";
import {
  getDeployer,
  getMulAttestParams,
  handleOspRequestData,
  MultiAttestationRequest,
  multiAttestBASOnChain,
  OspDataType,
} from "osp-bas-sdk";

describe("BNB Bas Address", () => {
  it("should A", async () => {
    assert.equal(BNB_basAddress, "0x6c2270298b1e6046898a322acB3Cbad6F99f7CBD");
    const wallet = ethers.Wallet.createRandom();
    console.log(wallet.address);
    console.log(wallet.privateKey);

    const followJson = {
      address: "0x00000066c6c6fca286f48a7f4e989b7198c26caf",
      chainId: 5611,
      name: "FollowSBTTransferred",
      referencedProfileId: "0x1",
      referencedUserAddress: "0xb11361f23d302d962e1a59b39b1492d35a8aaaba",
      time: 1726640595,
      userAddress: "0x790111e70a0921e7405dd797d6b9c811496723b5",
      transactionHash:
        "0xfe5e20e702151cb089319f2243776ce8ae48138b3ba00037d0141c6c1ba85db7",
    };

    const handleOspReturnData = handleOspRequestData(
      5611,
      JSON.stringify(followJson)
    );
    console.log(handleOspReturnData);

    const joinJson = {
      address: "0x00000066c6c6fca286f48a7f4e989b7198c26caf",
      chainId: 8453,
      communityId: "0x6",
      communityOwnerAddress: "0x00091fb7cf3e2fc93fe2792ea51086037f2ee8ac",
      name: "JoinNFTTransferred",
      time: 1726640629,
      userAddress: "0xf69c926130e1c3f62d5f09a8e34d38a15439eaee",
      transactionHash:
        "0xfe5e20e702151cb089319f2243776ce8ae48138b3ba00037d0141c6c1ba85db7",
    };
    const handleOspReturnData2 = handleOspRequestData(
      8453,
      JSON.stringify(joinJson)
    );
    console.log(handleOspReturnData2);

    const profileJson = {
      address: "0x000000b34357bd749731f3faaf0971dc3a0571d7",
      chainId: 204,
      profileId: "0x1",
      handle: "testGhb",
      name: "ProfileCreated",
      time: 1726638710,
      userAddress: "0xad092b52a7d5a3e77393f0bffb1db9fdf6c9c0fe",
      transactionHash:
        "0xfe5e20e702151cb089319f2243776ce8ae48138b3ba00037d0141c6c1ba85db7",
    };
    const handleOspReturnData3 = handleOspRequestData(
      204,
      JSON.stringify(profileJson)
    );
    console.log(handleOspReturnData3);

    const communityJson = {
      address: "0x000000b34357bd749731f3faaf0971dc3a0571d7",
      chainId: 204,
      communityId: "0x12",
      handle: "test123",
      joinNFT: "0xD8805CEcaD06E93Fc0976Ac8d094beeEA269ae37",
      name: "CommunityCreated",
      time: 1726638710,
      userAddress: "0xad092b52a7d5a3e77393f0bffb1db9fdf6c9c0fe",
      transactionHash:
        "0xfe5e20e702151cb089319f2243776ce8ae48138b3ba00037d0141c6c1ba85db7",
    };
    const handleOspReturnData4 = handleOspRequestData(
      204,
      JSON.stringify(communityJson)
    );
    console.log(handleOspReturnData4);
  });
});
