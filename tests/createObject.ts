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

  const params_b: AttestParams = {
    schemaUID:
      "0xb375a6d216ba084094bbaae989bf76a31357cc88e7fe270fd477a96e1fbdadb1",
    encodedData: encodedData,
    recipient: recipient,
    refUID:
      "0x0000000000000000000000000000000000000000000000000000000000000001",
  };

  const offchain = await new BAS(process.env.BAS_ADDRESS_BNB!)
    .connect(signer)
    .getOffchain();
  // Object.defineProperty(offchain, 'type', {
  //   domain: 'BAS Attestation',
  //   primaryType: 'Attest',
  //   types: {
  //       Attest: [
  //           { name: 'version', type: 'uint16' },
  //           { name: 'schema', type: 'bytes32' },
  //           { name: 'recipient', type: 'address' },
  //           { name: 'time', type: 'uint64' },
  //           { name: 'expirationTime', type: 'uint64' },
  //           { name: 'revocable', type: 'bool' },
  //           { name: 'refUID', type: 'bytes32' },
  //           { name: 'data', type: 'bytes' }
  //       ]
  //   }
  // } as any);
  let attestation = await getAttestationOffChain(offchain, signer, params_a);
  let attestation_b = await getAttestationOffChain(offchain, signer, params_b);
  attestation = await getAttestationBAS(signer, attestation);
  attestation_b = await getAttestationBAS(signer, attestation_b);
  console.log(attestation);
  console.log(attestation_b);

  const { objectName, bundle } = await getBundleBuffer(
    [attestation,attestation_b],
    params_a.schemaUID
  );

  const buffer = await readStreamToBuffer(bundle);
  console.log(`buffer size is ${buffer.length}`);

  const txhash = await client.createObjectByBundle(
    "bas-bcae673795001ba4c728b15d504fb4dd62cc4839",
    objectName,
    buffer,
    PrivateKey,
    false
  );
  console.log("txhash", txhash);
}

async function readStreamToBuffer(
  stream: NodeJS.ReadableStream
): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
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
  const objectName = `bundle.${schemaUid}.` + bundleUid;
  return { objectName: objectName, bundle };
}
// Buffer to ReadableStream
function bufferToReadableStream(bufferData: Buffer): ReadableStream {
  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue(bufferData);
      controller.close();
    },
  });
  return readable;
}

async function _getBundle(objs: SingleBundleObject[]) {
  const bundle = await Bundle.newBundle();
  try {
    for await (let object of objs) {
      const data = object.Data;
      const readableStream = bufferToReadableStream(data);

      // Buffer to ReadableStream
      await bundle.appendObject(object.Name, readableStream);
    }

    const result = await bundle.finalizeBundle();
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    bundle.close();
  }
  return null;
}

main();
