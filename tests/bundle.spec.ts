import { assert } from "chai";
import { SignedOffchainAttestation } from "../src";
import { getBundleBuffer } from "../src/bundle/utils";

describe("test bundle", () => {
  it("1000 count", async () => {
    const attestations: SignedOffchainAttestation[] = [];
    for (let i = 0; i < 1000; i++) {
      const attestation: SignedOffchainAttestation = {
        domain: {
          name: "BAS Attestation",
          version: "1.3.0",
          chainId: BigInt(97),
          verifyingContract: "0x6c2270298b1e6046898a322acB3Cbad6F99f7CBD",
        },
        primaryType: "Attest",
        message: {
          recipient: "0x283C27064498104823E2436da8e88377E8366169",
          expirationTime: BigInt(i),
          time: BigInt(1727615240),
          revocable: true,
          version: 1,
          nonce: BigInt(0),
          schema:
            "0xb375a6d216ba084094bbaae989bf76a31357cc88e7fe270fd477a96e1fbdadb1",
          refUID:
            "0x0000000000000000000000000000000000000000000000000000000000000000",
          data: "0x148321a510435b41b35b917eff8d5eb6f9c95baf0759b7c30e5ecfc1b34299db00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000294",
        },
        types: {
          Attest: [
            { name: "version", type: "uint16" },
            { name: "schema", type: "bytes32" },
            { name: "recipient", type: "address" },
            { name: "time", type: "uint64" },
            { name: "expirationTime", type: "uint64" },
            { name: "revocable", type: "bool" },
            { name: "refUID", type: "bytes32" },
            { name: "data", type: "bytes" },
            { name: "nonce", type: "uint64" },
          ],
        },
        signature: {
          v: 28,
          r: "0x195f55ba70addb61ff9a4aeb6ff30b380c1a25f5bfeba99898418a16fb851bab",
          s: "0x424c0ec84c6e70cf4bd8ff7f62f4aea1a808522bb48ec1f9dc0800b3e2107e7f",
        },
        uid: BigInt(i).toString(),
      };
      // attestations.push(attestation);

      const { objectName, buffer } = await getBundleBuffer("", [attestation]);
      if (buffer.length == 0) {
        console.log(i);
        return;
      }
    }
  });
});
