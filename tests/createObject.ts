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
  // } from "osp-bas-sdk";
} from "../src";
import { Bundle } from "../src/greenfield/bundle";
import { BNB_basAddress, PrivateKey } from "./config";
import { ethers } from "ethers";
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
  const bas = new BAS(BNB_basAddress);

  const recipient = ethers.Wallet.createRandom().address;
  const schemaEncoder = new SchemaEncoder(
    "bytes32 followHash,uint256 followerProfileId,uint256 followedProfileId"
  );

  const followHash = ethers.hexlify(ethers.randomBytes(32));
  const followedProfileId = Math.floor(Math.random() * 1000) + 2;
  const encodedData = schemaEncoder.encodeData([
    { name: "followHash", value: followHash, type: "bytes32" },
    { name: "followerProfileId", value: 1, type: "uint256" },
    {
      name: "followedProfileId",
      value: followedProfileId,
      type: "uint256",
    },
  ]);

  const params_a: AttestParams = {
    schemaUID:
      "0xb375a6d216ba084094bbaae989bf76a31357cc88e7fe270fd477a96e1fbdadb1",
    encodedData: encodedData,
    recipient: recipient,
    refUID:
      "0x0000000000000000000000000000000000000000000000000000000000000000",
  };

  const offchain = await new BAS(process.env.BAS_ADDRESS_BNB!)
    .connect(signer)
    .getOffchain();
  const attestation = await getAttestationOffChain(offchain, signer, params_a);
  console.log(attestation);

  const { objectName, bundleBuffer } = await getBundleBuffer(
    [attestation],
    params_a.schemaUID
  );

  const txhash = await client.createObjectByBundle(
    "bas-bcae673795001ba4c728b15d504fb4dd62cc4839",
    objectName,
    bundleBuffer,
    PrivateKey,
    false
  );
  console.log("txhash", txhash);
}

export type SingleBundleObject = {
  Name: string;
  Data: Buffer;
};
export async function getBundleBuffer(
  attestations: SignedOffchainAttestation[],
  schemaUid: string
) {
  let objs: SingleBundleObject[] = [];
  let attestationUids: string[] = [];
  for (let attestation of attestations) {
    attestationUids.push(attestation.uid);
    objs.push({
      Name: attestation.uid,
      Data: Buffer.from(serializeJsonString(attestation)),
    });
  }
  const bundle = await _getBundle(objs);
  const bundleUid = getbBundleUID(attestationUids);
  const objectName = `bundle.${schemaUid}` + bundleUid;
  return { objectName: objectName, bundleBuffer: bundle.getBundledObject() };
}

async function _getBundle(objs: SingleBundleObject[]) {
  const bundle = await Bundle.newBundle();
  try {
    for (let object of objs) {
      const data = object.Data;

      // Buffer to ReadableStream
      bundle.appendObject(object.Name);
    }

    await bundle.finalizeBundle();
  } catch (err) {
    bundle.close();
    return null;
  } finally {
    bundle.close();
  }

  return bundle;
}

main();
