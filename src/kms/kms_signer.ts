import { AwsKmsSigner } from "@cuonghx.gu-tech/ethers-aws-kms-signer";
import { ethers, Provider } from "ethers";
import "dotenv/config";
export const getDeployer = async () => {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const signer = new AwsKmsSigner(
    {
      keyId: process.env.AWS_KMS_KEY_ID!,
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    },
    provider
  );
  await signer.getAddress();

  return signer;
};

export const getKmsSigner = (provider?: Provider) => {
  const signer = new AwsKmsSigner(
    {
      keyId: process.env.AWS_KMS_KEY_ID!,
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    },
    provider
  );

  return signer;
};
