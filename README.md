# config .env

```js
# Greenfield
GREEN_RPC_URL="https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org"
GREEN_CHAIN_ID="5600"
GREEN_PAYMENT_ADDRESS=""
GREEN_PAYMENT_MNEMONIC_CIPHERTEXT=""

# BAS
BAS_ADDRESS_OPBNB=""
SCHEMA_REGISTRY_OPBNB=""
RPC_URL_OPBNB=""

# KMS ENCRYPT/DECRYPT
ALIBABA_CLOUD_ACCESS_KEY_ID=""
ALIBABA_CLOUD_ACCESS_KEY_SECRET=""
ALIBABA_CLOUD_REGION_ID=""
ALIBABA_CLOUD_KMS_KEY_ID=""

```

# 1. Create Attestations Off Chain

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
  setOspBasSdkConfig,
  } from "osp-bas-sdk";
// } from "../src";
import { ethers, hexlify, keccak256, randomBytes } from "ethers";

async function main() {
  
  // TODO: Set Osp Bas Config
  await setOspBasSdkConfig({
    basConfig: {
      RPC_URL: process.env.RPC_URL_OPBNB!,
      BAS_ADDRESS: process.env.BAS_ADDRESS_OPBNB!,
      SCHEMA_REGISTRY_ADDRESS: process.env.SCHEMA_REGISTRY_OPBNB!,
    },
    kmsCryptConfig: {
      ALIBABA_CLOUD_ACCESS_KEY_ID: process.env.ALIBABA_CLOUD_ACCESS_KEY_ID!,
      ALIBABA_CLOUD_ACCESS_KEY_SECRET:
        process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET!,
      ALIBABA_CLOUD_REGION_ID: process.env.ALIBABA_CLOUD_REGION_ID!,
      ALIBABA_CLOUD_KMS_KEY_ID: process.env.ALIBABA_CLOUD_KMS_KEY_ID!,
    },
    greenfieldConfig: {
      GREEN_RPC_URL: process.env.GREEN_RPC_URL!,
      GREEN_CHAIN_ID: process.env.GREEN_CHAIN_ID!,
      GREEN_PAYMENT_ADDRESS: process.env.GREEN_PAYMENT_ADDRESS!,
      GREEN_PAYMENT_MNEMONIC_CIPHERTEXT:
        process.env.GREEN_PAYMENT_MNEMONIC_CIPHERTEXT!,
    },
  });

  const Global_UnHandle_Data: HandleOspReturnDataOffChain[] = [];

  let timestamp = Math.floor(Date.now() / 1000);

  let dataType = 1;

  for (let i = 0; i < 5; i++) {
    const recipient = ethers.Wallet.createRandom().address;
    const followedAddress = ethers.Wallet.createRandom().address;
    const followHash = hexlify(randomBytes(32));
    if (dataType === 1) {
      Global_UnHandle_Data.push({
        dataType: OspDataType.Follow,
        requestData: getAttestParamsOffChain(
          OspDataType.Follow,
          recipient,
          encodeFollowData({
            followTx: followHash,
            follower: recipient,
            followedAddress: followedAddress,
            followedProfileId: i.toString(),
          })
        ),
      });
    } else if (dataType == 2) {
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
    timestamp = Math.floor(Date.now() / 1000);
    const schemaUID = Global_UnHandle_Data[0].requestData.schemaUID;
    const success = await multiAttestBasUploadGreenField(
      encodeAddrToBucketName("obas", process.env.GREEN_PAYMENT_ADDRESS!),
      schemaUID,
      Global_UnHandle_Data,
      false
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
