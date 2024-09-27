// npm link osp-bas-sdk
import {
  AttestParams,
  BAS,
  getAttestationOffChain,
  encodeAddrToBucketName,
  GreenFieldClientTS,
  SchemaEncoder,
  serializeJsonString,
  SignedOffchainAttestation,
  getbBundleUID,
  getOffchainUIDBAS,
  getAttestationBAS,
  // } from "osp-bas-sdk";
} from "../src";
import { Readable } from "stream";
import { Bundle } from "../src/bundle/bundle";
import { BNB_basAddress, PrivateKey } from "./config";
import { ethers } from "ethers";
import { getBundleBuffer } from "../src/bundle/utils";

async function main() {
  const provider = new ethers.JsonRpcProvider(
    "https://rpc.ankr.com/bsc_testnet_chapel"
  );
  const signer = new ethers.Wallet(PrivateKey, provider);
  const client = new GreenFieldClientTS(
    "https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org",
    "5600",
    "0x6278A1E803A76796a3A1f7F6344fE874ebfe94B2"
  );

  const schemaEncoder = new SchemaEncoder(
    "bytes32 followHash,uint256 followerProfileId,uint256 followedProfileId"
  );

  const offchain = await new BAS(process.env.BAS_ADDRESS_BNB!)
    .connect(signer)
    .getOffchain();

  const attestations = [];

  let schemaUID = "";
  for (let i = 0; i < 300; i++) {
    const recipient = ethers.Wallet.createRandom().address;
    const followHash = ethers.hexlify(ethers.randomBytes(32));
    const followedProfileId = Math.floor(Math.random() * 1000) + 2;
    const encodedData = schemaEncoder.encodeData([
      { name: "followHash", value: followHash, type: "bytes32" },
      { name: "followerProfileId", value: i + 1, type: "uint256" },
      {
        name: "followedProfileId",
        value: followedProfileId,
        type: "uint256",
      },
    ]);
    const params: AttestParams = {
      schemaUID:
        "0xb375a6d216ba084094bbaae989bf76a31357cc88e7fe270fd477a96e1fbdadb1",
      encodedData: encodedData,
      recipient: recipient,
      refUID:
        "0x0000000000000000000000000000000000000000000000000000000000000000",
    };

    if (schemaUID === "") {
      schemaUID = params.schemaUID;
    }
    const attestation = await getAttestationOffChain(offchain, signer, params);

    const attestation_new = await getAttestationBAS(signer, attestation);
    attestations.push(attestation_new);
  }

  const { objectName, buffer } = await getBundleBuffer(schemaUID, attestations);

  const txhash = await client.createObjectByBundle(
    "bas-bcae673795001ba4c728b15d504fb4dd62cc4839",
    objectName,
    buffer,
    PrivateKey,
    false
  );
  console.log("txhash", txhash);
}

main();
