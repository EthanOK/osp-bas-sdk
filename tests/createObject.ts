import {
  createAttestOffChain,
  encodeAddrToBucketName,
  GreenFieldClientTS,
} from "../src/index";
import { BNB_basAddress, PrivateKey } from "./config";
import * as ethers from "ethers";
async function main() {
  const provider = new ethers.JsonRpcProvider(
    "https://rpc.ankr.com/bsc_testnet_chapel"
  );
  const signer = new ethers.Wallet(PrivateKey, provider);
  const client = new GreenFieldClientTS(
    "https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org",
    "5600"
  );
  client.init("0x6278A1E803A76796a3A1f7F6344fE874ebfe94B2", "5600");

  const attestation = await createAttestOffChain(signer, BNB_basAddress);
  console.log(attestation);
  
  await client.createObject(attestation, PrivateKey, false);
}

main();
