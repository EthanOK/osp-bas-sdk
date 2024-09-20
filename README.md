# config .env

```js
# Greenfield
GREEN_RPC_URL=""
GREEN_CHAIN_ID=""
GREEN_PAYMENT_ADDRESS=""
GREEN_PAYMENT_PRIVATE_KEY=""

# BAS
BAS_ADDRESS_OPBNB=""
BAS_ADDRESS_BNB=""

# KMS
ACCESS_KEY_ID=""
SECRET_ACCESS_KEY=""
AWS_KMS_KEY_ID=""
AWS_REGION=""
RPC_URL=""

# MQ
ALIBABA_CLOUD_ACCESS_KEY_ID=""
ALIBABA_CLOUD_ACCESS_KEY_SECRET=""

# Redis
REDIS_HOST=""
REDIS_PORT=""
REDIS_USERNAME=""
REDIS_PASSWORD=""
REDIS_DB=""
```

# 1. Create Attestation Off Chain

```ts
// npm i osp-bas-sdk
import {
  encodeAddrToBucketName,
  encodeFollowData,
  encodeProfileData,
  getAttestParamsOffChain,
  getDeployer,
  GreenFieldClientTS,
  multiAttestBASOffChain,
  OspDataType,
  HandleOspReturnDataOffChain,
  createObjectMulAttestOSP,
  createObjectAttestOSP,
  getKmsSigner,
  getAttestationOffChain,
  BAS,
} from "osp-bas-sdk";
import { ethers, hexlify, randomBytes } from "ethers";

const GREEN_PAYMENT_PRIVATE_KEY = process.env.GREEN_PAYMENT_PRIVATE_KEY!;

async function main() {
  const provider = new ethers.JsonRpcProvider(
    "https://rpc.ankr.com/bsc_testnet_chapel"
  );

  const Attester_Address = "0x043d36c82561c1733e22c07d9af17f21e270174c";
  const Attester_PRIVATE_KEY =
    "0x807eb862f8a714bf08a4bab6cd5fcdb33da056444480647f09163909ce0ecbe8";
  const signer = new ethers.Wallet(Attester_PRIVATE_KEY, provider);
  // const signer = getKmsSigner(provider);

  const Global_UnHandle_Data: HandleOspReturnDataOffChain[] = [];

  for (let i = 0; i < 1000; i++) {
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

  try {
    const attestations = await multiAttestBASOffChain(
      signer,
      Global_UnHandle_Data
    );
 
    // const offchain = await new BAS(process.env.BAS_ADDRESS_BNB!)
    //   .connect(signer)
    //   .getOffchain();
    // const result = offchain.verifyOffchainAttestationSignature(
    //   Attester_Address,
    //   attestations[1]
    // );
    // console.log("验证签名结果:", result);

    const bucketName = encodeAddrToBucketName(
      "0x6278A1E803A76796a3A1f7F6344fE874ebfe94B2"
    );

    //  上传 attestation 至 GreenField
    await createObjectAttestOSP(
      bucketName,
      attestations[1],
      GREEN_PAYMENT_PRIVATE_KEY,
      false
    );

    return;

    // TODO: 上传 attestations 至 GreenField 适配中
    timestamp = Math.floor(Date.now() / 1000);
    const fileName = `${attestations[0].message.schema}.${attestations[0].uid}`;
    await createObjectMulAttestOSP(
      bucketName,
      attestations,
      fileName,
      GREEN_PAYMENT_PRIVATE_KEY,
      false
    );
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
