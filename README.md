# Create Object To Greenfield Bucket

```ts
// init signer
const provider = new ethers.JsonRpcProvider(
  "https://rpc.ankr.com/bsc_testnet_chapel"
);
const signer = new ethers.Wallet(PrivateKey, provider);

// init EAS
const bas = new EAS("eas_address");

// create attestation
const schemaEncoder = new SchemaEncoder(
  "bytes32 followHash,uint256 followerProfileId,uint256 followedProfileId"
);
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

const params: AttestParams = {
  schemaUID:
    "0xb375a6d216ba084094bbaae989bf76a31357cc88e7fe270fd477a96e1fbdadb1",
  encodedData: encodedData,
  recipient: recipient,
  refUID: "0x0000000000000000000000000000000000000000000000000000000000000000",
};
const attestation = await createAttestOffChain(signer, bas, params);

// init client
const creator_address = "creator_address";
const creator_privateKey = "private_key";
const client = new GreenFieldClientTS("rpcUrl", "chainId", creator_address);

// create object
const txhash = await client.createObject(
  bucketName,
  attestation,
  creator_privateKey,
  false
);
```
