# config .env

`Must be set`

```js
# Greenfield
GREEN_RPC_URL=""
GREEN_CHAIN_ID=""
GREEN_PAYMENT_ADDRESS=""
# 1: sign attestation 2: payment on greenfield
GREEN_PAYMENT_PRIVATE_KEY=""

# BAS
BAS_ADDRESS_OPBNB=""
BAS_ADDRESS_BNB=""
Schema_Registry_OPBNB=""
Schema_Registry_BNB=""
BNB_RPC_URL=""

// # KMS
// ACCESS_KEY_ID=""
// SECRET_ACCESS_KEY=""
// AWS_KMS_KEY_ID=""
// AWS_REGION=""
// RPC_URL=""

// # MQ
// ALIBABA_CLOUD_ACCESS_KEY_ID=""
// ALIBABA_CLOUD_ACCESS_KEY_SECRET=""

// # Redis
// REDIS_HOST=""
// REDIS_PORT=""
// REDIS_USERNAME=""
// REDIS_PASSWORD=""
// REDIS_DB=""
```

# 1. Create Attestation Off Chain

```ts
// npm link osp-bas-sdk
import {
  encodeAddrToBucketName,
  encodeFollowData,
  encodeProfileData,
  getAttestParamsOffChain,
  OspDataType,
  HandleOspReturnDataOffChain,
  multiAttestBasUploadGreenField,
  oneAttestBasUploadGreenField,
} from "osp-bas-sdk";
import { ethers, hexlify, keccak256, randomBytes } from "ethers";

async function main() {
  const Global_UnHandle_Data: HandleOspReturnDataOffChain[] = [];

  let timestamp = Math.floor(Date.now() / 1000);
  for (let i = 0; i < 100; i++) {
    const recipient = ethers.Wallet.createRandom().address;

    const followHash = hexlify(randomBytes(32));
    if (i % 2 === 0) {
      Global_UnHandle_Data.push({
        dataType: OspDataType.Follow,
        requestData: getAttestParamsOffChain(
          OspDataType.Follow,
          recipient,
          encodeFollowData({
            followTx: followHash,
            follower: recipient,
            followedProfileId: i.toString(),
          })
        ),
      });
    } else {
      Global_UnHandle_Data.push({
        dataType: OspDataType.Profile,
        requestData: getAttestParamsOffChain(
          OspDataType.Profile,
          recipient,
          encodeProfileData({
            createProfileTx: followHash,
            profileOwner: recipient,
            profileId: i.toString(),
            handle: `demo${i}`,
          })
        ),
      });
    }
  }
  console.log("组装数据:", Math.floor(Date.now() / 1000) - timestamp, "S");
  try {
    // 上传 1个 attestation 至 GreenField
    const success_ = await oneAttestBasUploadGreenField(
      encodeAddrToBucketName(process.env.GREEN_PAYMENT_ADDRESS!),
      Global_UnHandle_Data[0],
      true
    );
    console.log("createObjects success:", success_);

    // TODO: 上传 attestations 至 GreenField 【适配中】
    timestamp = Math.floor(Date.now() / 1000);
    // TODO: need change
    const fileName = `${
      Global_UnHandle_Data[0].requestData.schemaUID
    }.${keccak256(randomBytes(32))}`;

    const success = await multiAttestBasUploadGreenField(
      encodeAddrToBucketName(process.env.GREEN_PAYMENT_ADDRESS!),
      Global_UnHandle_Data,
      fileName,
      true
    );
    console.log("createObjects success:", success);

    console.log("上传时间:", Math.floor(Date.now() / 1000) - timestamp, "S");
  } catch (error) {
    console.log(error);
  }
}

main();
```

# 2. Create Attestation On Chain

```ts
// npm link osp-bas-sdk
import {
  encodeFollowData,
  encodeProfileData,
  getAttestationRequestData,
  MultiAttestationRequest,
  HandleOspReturnData,
  OspDataType,
  getMulAttestParams,
  getDeployer,
  multiAttestBASOnChain,
  getKmsSigner,
} from "osp-bas-sdk";
import { ethers, hexlify, randomBytes } from "ethers";

async function createAttestation() {
  const provider = new ethers.JsonRpcProvider(
    "https://opbnb-testnet-rpc.bnbchain.org"
  );
  // const signer = new ethers.Wallet(PrivateKey, provider);
  const signer = getKmsSigner(provider);

  const Global_UnHandle_Data: HandleOspReturnData[] = [];
  for (let i = 0; i < 4; i++) {
    const recipient = ethers.Wallet.createRandom().address;

    const followHash = hexlify(randomBytes(32));
    if (i % 2 === 0) {
      Global_UnHandle_Data.push({
        dataType: OspDataType.Follow,
        requestData: getAttestationRequestData(
          recipient,
          encodeFollowData({
            followTx: followHash,
            follower: recipient,
            followedProfileId: i.toString(),
          })
        ),
      });
    } else {
      Global_UnHandle_Data.push({
        dataType: OspDataType.Profile,
        requestData: getAttestationRequestData(
          recipient,
          encodeProfileData({
            createProfileTx: followHash,
            profileOwner: recipient,
            profileId: i.toString(),
            handle: `demo${i}`,
          })
        ),
      });
    }
  }

  const params: MultiAttestationRequest[] =
    getMulAttestParams(Global_UnHandle_Data);

  const uids = await multiAttestBASOnChain(signer, params);
  console.log("uids:", uids);
  Global_UnHandle_Data.length = 0;
  console.log(Global_UnHandle_Data);
}

createAttestation();
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
