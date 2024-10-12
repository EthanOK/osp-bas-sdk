// npm link osp-bas-sdk
import { encodeAddrToBucketName, GreenFieldClientTS } from "../src";
import { getPrivateKeyByKms } from "./config";

async function main() {
  const client = new GreenFieldClientTS(
    "https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org",
    "5600",
    "0x6278A1E803A76796a3A1f7F6344fE874ebfe94B2"
  );
  const PrivateKey = await getPrivateKeyByKms();
  // console.log(PrivateKey);

  const r = await client.createBucket(
    encodeAddrToBucketName(
      "obas",
      "0x0000000000000000000000000000000000000118"
    ),
    1,
    PrivateKey
  );
  console.log(r);

  const rr = await client.updateBucketQuota(
    encodeAddrToBucketName(
      "obas",
      "0x0000000000000000000000000000000000000118"
    ),
    10,
    PrivateKey
  );
  console.log(rr);
}

main().catch((err) => console.error(err));
