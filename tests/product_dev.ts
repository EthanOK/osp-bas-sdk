import { ethers } from "ethers";
import {
  encodeAddrToBucketName,
  GreenFieldClientTS,
  OspSchemaMap,
  registerSchema,
} from "../src";
import { getPrivateKeyByKms } from "./config";

async function prepareSchemaAndBucket() {
  // register Schema

  const PrivateKey = await getPrivateKeyByKms();

  const signer = new ethers.Wallet(
    PrivateKey,
    new ethers.JsonRpcProvider(process.env.BNB_RPC_URL!)
  );
  const chainId = (await signer.provider.getNetwork()).chainId.toString();

  const schemaNames = [];
  OspSchemaMap.forEach(async (value, key) => {
    const schemaName = value;
    schemaNames.push(schemaName);
  });

  for (let i = 0; i < schemaNames.length; i++) {
    try {
      const schemaUID = await registerSchema(
        signer,
        chainId == "56" || chainId == "97"
          ? process.env.SCHEMA_REGISTRY_BNB!
          : process.env.SCHEMA_REGISTRY_OPBNB!,
        {
          schema: schemaNames[i],
          resolverAddress: "0x0000000000000000000000000000000000000000",
          revocable: true,
        }
      );
      console.log("schemaUID", schemaUID, "\nschema:", schemaNames[i]);
    } catch (error) {
      // console.log(error);
      continue;
    }
  }

  // create bucket
  try {
    const client = new GreenFieldClientTS(
      process.env.GREEN_RPC_URL!,
      process.env.GREEN_CHAIN_ID!,
      process.env.GREEN_PAYMENT_ADDRESS!
    );
    const success = await client.createBucket(
      encodeAddrToBucketName("bas", process.env.GREEN_PAYMENT_ADDRESS!),
      0,
      process.env.GREEN_PAYMENT_PRIVATE_KEY!
    );
  } catch (error) {}
}

prepareSchemaAndBucket();
