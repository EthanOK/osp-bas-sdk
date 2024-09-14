import {
  BNB_basAddress,
  BNB_schemaRegistryAddress,
  PrivateKey,
} from "./config";
import * as ethers from "ethers";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
// npm link osp-bas-sdk
import { AttestParams, createAttestOffChain, GreenFieldClientTS } from "osp-bas-sdk";

async function main() {
  const provider = new ethers.JsonRpcProvider(
    "https://rpc.ankr.com/bsc_testnet_chapel"
  );
  const signer = new ethers.Wallet(PrivateKey, provider);

  const recipient = ethers.Wallet.createRandom().address;
  const schemaEncoder = new SchemaEncoder("string Post");
  const encodedData = schemaEncoder.encodeData([
    { name: "Post", value: `${recipient} post`, type: "string" },
  ]);
  const bas = new EAS(BNB_basAddress);
  const params_a: AttestParams = {
    schemaUID:
      "0x599b1dc37382faa679ffc8af28adaa01357950c8947f090c54a608ba6f63ba6d",
    encodedData: encodedData,
    recipient: recipient,
    refUID:
      "0x0000000000000000000000000000000000000000000000000000000000000000",
  };
  const attestation = await createAttestOffChain(signer, bas, params_a);
  console.log(attestation);
}

main();
