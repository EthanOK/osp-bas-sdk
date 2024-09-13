import { ethers } from "ethers";
import { BNB_schemaRegistryAddress, PrivateKey } from "./config";
import { getSchemaByUID, registerSchema, RegisterSchemaParams } from "../src";

async function main() {
  const provider = new ethers.JsonRpcProvider(
    "https://rpc.ankr.com/bsc_testnet_chapel"
  );
  const signer = new ethers.Wallet(PrivateKey, provider);

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

  const schemaRecord = await getSchemaByUID(
    provider,
    BNB_schemaRegistryAddress,
    "0xb375a6d216ba084094bbaae989bf76a31357cc88e7fe270fd477a96e1fbdadb1"
  );
  console.log(schemaRecord);
}
main();
