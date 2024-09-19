// npm link osp-bas-sdk
import {
  AttestParams,
  BAS,
  createAttestOffChain,
  encodeAddrToBucketName,
  getDeployer,
  GreenFieldClientTS,
  SchemaEncoder,
} from "osp-bas-sdk";
import { ethers } from "ethers";
import { PrivateKey } from "./config";
async function main() {
  const provider = new ethers.JsonRpcProvider(
    "https://rpc.ankr.com/bsc_testnet_chapel"
  );
  // const signer = new ethers.Wallet(PrivateKey, provider);
  const signer = (await getDeployer()).connect(provider);

  const client = new GreenFieldClientTS(
    "https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org",
    "5600",
    "0x6278A1E803A76796a3A1f7F6344fE874ebfe94B2"
  );
  const bas = new BAS("0x6c2270298b1e6046898a322acB3Cbad6F99f7CBD");

  const recipient = ethers.Wallet.createRandom().address;
  const schemaEncoder = new SchemaEncoder(
    "bytes32 followHash,uint256 followerProfileId,uint256 followedProfileId"
  );

  const attestations: object[] = [];

  for (let i = 0; i < 10; i++) {
    const followHash = ethers.hexlify(ethers.randomBytes(32));
    const followedProfileId = Math.floor(Math.random() * 1000) + 1;
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
    const attestation = await createAttestOffChain(signer, bas, params_a);

    attestations.push(attestation);
  }
  // console.log(attestations);

  const bucketName = encodeAddrToBucketName(
    "0x6278A1E803A76796a3A1f7F6344fE874ebfe94B2"
  );
  
  await client.createObject(
    bucketName,
    JSON.stringify(attestations[1]),
    PrivateKey,
    false
  );
  // TODO: GreenField 适配中
  // await client.createObjectMulAttest(
  //   bucketName,
  //   JSON.stringify(attestations),
  //   PrivateKey,
  //   false
  // );
}

main();
