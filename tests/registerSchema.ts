import {
  getSchemaByUID,
  OspSchemaMap,
  registerSchema,
  RegisterSchemaParams,
  // } from "osp-bas-sdk";
} from "../src";
import { ethers } from "ethers";
import { BNB_schemaRegistryAddress, getPrivateKeyByKms } from "./config";

async function main() {
  const PrivateKey = await getPrivateKeyByKms();

  // "https://opbnb-testnet-rpc.bnbchain.org"
  // "https://rpc.ankr.com/bsc_testnet_chapel"
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL_OPBNB!);
  const signer = new ethers.Wallet(PrivateKey, provider);

  const schemaNames = [];

  OspSchemaMap.forEach(async (value, key) => {
    const schemaName = value;
    schemaNames.push(schemaName);
  });

  for (let i = 0; i < schemaNames.length; i++) {
    try {
      const schemaUID = await registerSchema(signer, process.env.SCHEMA_REGISTRY_OPBNB!, {
        schema: schemaNames[i],
        resolverAddress: "0x0000000000000000000000000000000000000000",
        revocable: true,
      });
      console.log("schemaUID", schemaUID, "\nschema:", schemaNames[i]);
    } catch (error) {
      // console.log(error);
      continue;
    }
  }
}
main();
