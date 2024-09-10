import { encodeAddrToBucketName, GreenFieldClientTS } from "../src/index";
import { PrivateKey } from "./config";

async function main() {
  const client = new GreenFieldClientTS(
    "https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org",
    "5600"
  );
  client.init("0x6278A1E803A76796a3A1f7F6344fE874ebfe94B2", "5600");


  await client.createBucket(
    encodeAddrToBucketName("0x6278A1E803A76796a3A1f7F6344fE874ebfe94B2"),
    PrivateKey
  );
}

main();
