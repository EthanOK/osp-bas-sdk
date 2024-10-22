// npm link osp-bas-sdk
import { GreenFieldClientTS } from "../src";

async function main() {
  const client = new GreenFieldClientTS(
    "https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org",
    "5600",
    "0x6278A1E803A76796a3A1f7F6344fE874ebfe94B2"
  );

  const bucketMetaRespons = await client.client.bucket.getBucketMeta({
    bucketName: "",
  });
  console.log(bucketMetaRespons.body.GfSpGetBucketMetaResponse.Bucket);
}

main().catch((err) => console.error(err));
