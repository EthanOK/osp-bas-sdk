// npm link osp-bas-sdk
import { encodeAddrToBucketName, GreenFieldClientTS } from "osp-bas-sdk";
import { PrivateKey } from "./config";

async function main() {
  const client = new GreenFieldClientTS(
    "https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org",
    "5600",
    "0x6278A1E803A76796a3A1f7F6344fE874ebfe94B2"
  );
  await client.createBucket(
    // encodeAddrToBucketName("0x6278A1E803A76796a3A1f7F6344fE874ebfe94B2"),
    "bas-test-3",
    PrivateKey
  );
}

main();
