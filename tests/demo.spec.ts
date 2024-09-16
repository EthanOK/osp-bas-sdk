import { assert } from "chai";
import { BNB_basAddress } from "./config";
import { ethers } from "ethers";

describe("BNB Bas Address", () => {
  it("should A", async () => {
    assert.equal(BNB_basAddress, "0x6c2270298b1e6046898a322acB3Cbad6F99f7CBD");
    const wallet = ethers.Wallet.createRandom();
    console.log(wallet.address);
    console.log(wallet.privateKey);
  });
});
