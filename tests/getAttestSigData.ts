// npm link osp-bas-sdk
import {
  AttestParams,
  BAS,
  getAttestationOffChain,
  getAttestationOffChainV1,
  getKmsSigner,
  GreenFieldClientTS,
  SchemaEncoder,
} from "../src";
import { ethers } from "ethers";
import {
  BNB_basAddress,
  BNB_schemaRegistryAddress,
  getPrivateKeyByKms,
} from "./config";

async function main() {
  const provider = new ethers.JsonRpcProvider(
    "https://rpc.ankr.com/bsc_testnet_chapel"
  );
  // const signer = new ethers.Wallet(PrivateKey, provider);

  const signer =  getKmsSigner(provider);

  const recipient = ethers.Wallet.createRandom().address;
  const schemaEncoder = new SchemaEncoder("string Post");
  const encodedData = schemaEncoder.encodeData([
    { name: "Post", value: `${recipient} post`, type: "string" },
  ]);
  const offchain = await new BAS(BNB_basAddress)
    .connect(provider)
    .getOffchain();
  const params_a: AttestParams = {
    schemaUID:
      "0x599b1dc37382faa679ffc8af28adaa01357950c8947f090c54a608ba6f63ba6d",
    encodedData: encodedData,
    recipient: recipient,
    refUID:
      "0x0000000000000000000000000000000000000000000000000000000000000000",
  };
  // const attestation = await getAttestationOffChain(offchain, signer, params_a);
  // console.log(attestation);
  const attestationv1 = await getAttestationOffChainV1(offchain, signer, params_a);
  console.log(attestationv1);
}

main();
