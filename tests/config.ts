import "dotenv/config";
import { KmsClient } from "../src";


export const BNB_schemaRegistryAddress =
  "0x08C8b8417313fF130526862f90cd822B55002D72";

export const BNB_basAddress = "0x6c2270298b1e6046898a322acB3Cbad6F99f7CBD";

// 0xb97137B1E7BBc01F579bE6697aC98A62eC0177Db
export const Attester_PrivateKey =
  "0xa13c0065698c7c77447030b5431f3fe96e7bb2c6f6ace0fb9d42c1d9fec5e260";

export async function getPrivateKeyByKms(): Promise<string> {
  try {
    console.log("init KmsClient");

    let client = new KmsClient({
      clientParams: {
        accessKeyId: process.env.ALIBABA_CLOUD_ACCESS_KEY_ID!,
        accessKeySecret: process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET!,
        regionId: process.env.ALIBABA_CLOUD_REGION_ID!,
      },
      keyId: process.env.ALIBABA_CLOUD_KMS_KEY_ID!,
    });

    let decryptRes = await client.decrypt(
      process.env.GREEN_PAYMENT_PRIVATE_KEY_KMS_CIPHERTEXT,
      {}
    );

    return decryptRes.body.plaintext;
  } catch (e) {
    console.log(e);
  }
  return "";
}
