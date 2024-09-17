# 1. Create Attestation Off Chain

```ts
import {
  AttestParams,
  BAS,
  createAttestOffChain,
  encodeAddrToBucketName,
  GreenFieldClientTS,
  SchemaEncoder,
} from "osp-bas-sdk";
import { ethers } from "ethers";

// init signer
const provider = new ethers.JsonRpcProvider(
  "https://rpc.ankr.com/bsc_testnet_chapel"
);
const signer = new ethers.Wallet(PrivateKey, provider);

// init EAS
const bas = new BAS("eas_address");

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

# 2. Create Attestation On Chain

```ts
import {
  AttestationRequestData,
  BAS,
  MultiAttestationRequest,
  SchemaEncoder,
} from "osp-bas-sdk";
import { ethers } from "ethers";

async function createAttestation() {
  const provider = new ethers.JsonRpcProvider(
    "https://opbnb-testnet-rpc.bnbchain.org"
  );
  const signer = new ethers.Wallet(PrivateKey, provider);
  const bas = new BAS("");
  bas.connect(signer);

  const schemaUID =
    "0xb375a6d216ba084094bbaae989bf76a31357cc88e7fe270fd477a96e1fbdadb1";

  let params: MultiAttestationRequest[] = [];
  let attestationRequestDatas: AttestationRequestData[] = [];
  for (let i = 0; i < 50; i++) {
    let attestationRequestData = getAttestationRequestData();
    attestationRequestDatas.push(attestationRequestData);
  }
  params.push({
    schema: schemaUID,
    data: attestationRequestDatas,
  });

  const txs = await bas.multiAttest(params);
  const newAttestationUIDs = await txs.wait();
  console.log("New attestation UID:", newAttestationUIDs);
}

function getAttestationRequestData() {
  const recipient = ethers.Wallet.createRandom().address;
  const schemaEncoder = new SchemaEncoder(
    "bytes32 followHash,uint256 followerProfileId,uint256 followedProfileId"
  );

  const followHash = ethers.hexlify(ethers.randomBytes(32));
  const followedProfileId = Math.floor(Math.random() * 1000) + 1;
  const encodedData = schemaEncoder.encodeData([
    { name: "followHash", value: followHash, type: "bytes32" },
    { name: "followerProfileId", value: 5611, type: "uint256" },
    {
      name: "followedProfileId",
      value: followedProfileId,
      type: "uint256",
    },
  ]);
  const attestationRequestData: AttestationRequestData = {
    recipient: recipient,
    expirationTime: BigInt(0),
    revocable: true,
    data: encodedData,
    refUID:
      "0x0000000000000000000000000000000000000000000000000000000000000000",
  };
  return attestationRequestData;
}
```

# 3. Create Attestation By Delegation On Chain

```ts
// npm link osp-bas-sdk
import {
  AttestationRequestData,
  BAS,
  DelegatedAttestParams,
  getSigatureByDelegation,
  MultiDelegatedAttestationRequest,
  SchemaEncoder,
  Signature,
} from "osp-bas-sdk";
import { ethers, Signer } from "ethers";
import { PrivateKey, Attester_PrivateKey } from "./config";

const deadline = Math.floor(Date.now() / 1000) + 60;

const provider = new ethers.JsonRpcProvider(
  "https://opbnb-testnet-rpc.bnbchain.org"
);
const payer = new ethers.Wallet(PrivateKey, provider);
const attester = new ethers.Wallet(Attester_PrivateKey, provider);

const bas = new BAS("0x5e905F77f59491F03eBB78c204986aaDEB0C6bDa");

async function createAttestationByDelegation() {
  const schemaUID =
    "0xb375a6d216ba084094bbaae989bf76a31357cc88e7fe270fd477a96e1fbdadb1";

  let params: MultiDelegatedAttestationRequest[] = [];
  let attestationRequestDatas: AttestationRequestData[] = [];
  let signatures: Signature[] = [];

  bas.connect(provider);
  const nonce = await bas.getNonce(attester.address);
  for (let i = 0; i < 2; i++) {
    let attestationRequestData = await getAttestationRequestData();
    attestationRequestDatas.push(attestationRequestData);
    const signature = await getSigature(
      bas,
      {
        schemaUID: schemaUID,
        encodedData: attestationRequestData.data,
        recipient: attestationRequestData.recipient,
        refUID: attestationRequestData.refUID,
        deadline: BigInt(deadline),
        nonce: nonce + BigInt(i),
      },
      attester
    );
    signatures.push(signature);
  }
  params.push({
    schema: schemaUID,
    data: attestationRequestDatas,
    signatures: signatures,
    attester: attester.address,
    deadline: BigInt(deadline),
  });

  console.log(params);

  bas.connect(payer);
  const txs = await bas.multiAttestByDelegation(params);
  const newAttestationUIDs = await txs.wait();
  console.log("New attestation UID:", newAttestationUIDs);
}

async function getAttestationRequestData() {
  const recipient = ethers.Wallet.createRandom().address;
  const schemaEncoder = new SchemaEncoder(
    "bytes32 followHash,uint256 followerProfileId,uint256 followedProfileId"
  );

  const followHash = ethers.hexlify(ethers.randomBytes(32));
  const followedProfileId = Math.floor(Math.random() * 1000) + 1;
  const encodedData = schemaEncoder.encodeData([
    { name: "followHash", value: followHash, type: "bytes32" },
    { name: "followerProfileId", value: 5611, type: "uint256" },
    {
      name: "followedProfileId",
      value: followedProfileId,
      type: "uint256",
    },
  ]);
  const attestationRequestData: AttestationRequestData = {
    recipient: recipient,
    expirationTime: BigInt(0),
    revocable: true,
    data: encodedData,
    refUID:
      "0x0000000000000000000000000000000000000000000000000000000000000000",
  };

  return attestationRequestData;
}

async function getSigature(
  bas,
  params: DelegatedAttestParams,
  attester: Signer
) {
  const signature = await getSigatureByDelegation(bas, params, attester);
  return signature;
}

createAttestationByDelegation();
```
