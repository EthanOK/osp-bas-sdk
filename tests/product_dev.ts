import { ethers } from "ethers";
import {
  encodeAddrToBucketName,
  GreenFieldClientTS,
  OspSchemaMap,
  registerSchema,
} from "../src";

async function prepareSchemaAndBucket() {
  // register Schema
  const signer = new ethers.Wallet(
    process.env.GREEN_PAYMENT_PRIVATE_KEY!,
    new ethers.JsonRpcProvider(process.env.BNB_RPC_URL!)
  );
  const schemaNames = [];
  OspSchemaMap.forEach(async (value, key) => {
    const schemaName = value;
    schemaNames.push(schemaName);
  });

  for (let i = 0; i < schemaNames.length; i++) {
    try {
      const schemaUID = await registerSchema(
        signer,
        process.env.SCHEMA_REGISTRY_BNB!,
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
      process.env.GREEN_PAYMENT_PRIVATE_KEY!
    );
  } catch (error) {}
}

prepareSchemaAndBucket();
