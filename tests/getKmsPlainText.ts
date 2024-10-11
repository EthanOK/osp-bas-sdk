import { getKmsCipherText, getKmsPlainText, KmsClientParams } from "../src";
import "dotenv/config";
async function main() {
  const params: KmsClientParams = {
    clientParams: {
      accessKeyId: process.env.ALIBABA_CLOUD_ACCESS_KEY_ID!,
      accessKeySecret: process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET!,
      regionId: process.env.ALIBABA_CLOUD_REGION_ID!,
    },
    keyId: process.env.ALIBABA_CLOUD_KMS_KEY_ID!,
  };
  
  const ctext = await getKmsCipherText(params, "osp");
  console.log(ctext);
  
  const ptext = await getKmsPlainText(params, ctext);
  console.log(ptext);
}
main();
