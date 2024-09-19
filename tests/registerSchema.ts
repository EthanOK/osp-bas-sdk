import {
  getSchemaByUID,
  OspSchemaMap,
  registerSchema,
  RegisterSchemaParams,
} from "osp-bas-sdk";
import { ethers } from "ethers";
import { BNB_schemaRegistryAddress, PrivateKey } from "./config";

async function main() {
  const provider = new ethers.JsonRpcProvider(
    "https://rpc.ankr.com/bsc_testnet_chapel"
  );
  const signer = new ethers.Wallet(PrivateKey, provider);

  const schemaNames = [];

  OspSchemaMap.forEach(async (value, key) => {
    const schemaName = value;
    schemaNames.push(schemaName);
  });

  for (let i = 0; i < schemaNames.length; i++) {
    try {
      const schemaUID = await registerSchema(
        signer,
        BNB_schemaRegistryAddress,
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

  //   const params: RegisterSchemaParams = {
  //     schema: "uint256 id, string name",
  //     resolverAddress: "0x0000000000000000000000000000000000000000",
  //     revocable: false,
  //   };

  //   const schemaUID = await registerSchema(
  //     signer,
  //     BNB_schemaRegistryAddress,
  //     params
  //   );

  // const schemaRecord = await getSchemaByUID(
  //   provider,
  //   BNB_schemaRegistryAddress,
  //   "0xb375a6d216ba084094bbaae989bf76a31357cc88e7fe270fd477a96e1fbdadb1"
  // );
  // console.log(schemaRecord);
}
main();
