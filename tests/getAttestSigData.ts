// npm link osp-bas-sdk
import {
  AttestParams,
  BAS,
  getAttestationOffChain,
  GreenFieldClientTS,
  SchemaEncoder,
} from "osp-bas-sdk";
import { ethers } from "ethers";
import {
  BNB_basAddress,
  BNB_schemaRegistryAddress,
  PrivateKey,
} from "./config";

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
  const bas = new BAS(BNB_basAddress);
  const params_a: AttestParams = {
    schemaUID:
      "0x599b1dc37382faa679ffc8af28adaa01357950c8947f090c54a608ba6f63ba6d",
    encodedData: encodedData,
    recipient: recipient,
    refUID:
      "0x0000000000000000000000000000000000000000000000000000000000000000",
  };
  const attestation = await getAttestationOffChain(signer, params_a);
  console.log(attestation);
}

main();
