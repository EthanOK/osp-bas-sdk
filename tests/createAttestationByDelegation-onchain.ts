// npm link osp-bas-sdk
import {
  AttestationRequestData,
  BAS,
  DelegatedAttestParams,
  getDeployer,
  getKmsSigner,
  getSigatureByDelegation,
  MultiDelegatedAttestationRequest,
  SchemaEncoder,
  Signature,
} from "osp-bas-sdk";
import { ethers, Signer } from "ethers";
import { Attester_PrivateKey, PrivateKey } from "./config";

const deadline = Math.floor(Date.now() / 1000) + 60;

const provider = new ethers.JsonRpcProvider(
  "https://opbnb-testnet-rpc.bnbchain.org"
);
const payer = new ethers.Wallet(PrivateKey, provider);
// const attester = new ethers.Wallet(Attester_PrivateKey, provider);
const attester =  getKmsSigner(provider);

const bas = new BAS("0x5e905F77f59491F03eBB78c204986aaDEB0C6bDa");

async function createAttestationByDelegation() {
  const schemaUID =
    "0xb375a6d216ba084094bbaae989bf76a31357cc88e7fe270fd477a96e1fbdadb1";

  let params: MultiDelegatedAttestationRequest[] = [];
  let attestationRequestDatas: AttestationRequestData[] = [];
  let signatures: Signature[] = [];
  const attesterAddress = await attester.getAddress();
  
  bas.connect(provider);
  const nonce = await bas.getNonce(attesterAddress);
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
    attester: attesterAddress,
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
