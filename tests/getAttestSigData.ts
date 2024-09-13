import {
  BNB_basAddress,
  BNB_schemaRegistryAddress,
  PrivateKey,
} from "./config";
import * as ethers from "ethers";
import {
  A,
  getSchemaByUID,
  initEAS,
  registerSchema,
  RegisterSchemaParams,
  createAttestOffChain,
} from "../src/index";

async function main() {
  const provider = new ethers.JsonRpcProvider(
    "https://rpc.ankr.com/bsc_testnet_chapel"
  );
  const signer = new ethers.Wallet(PrivateKey, provider);

  // SyntaxError: Cannot use import statement outside a module
  // initBAS(provider, BNB_basAddress);

  initEAS(provider, BNB_basAddress);

  const params: RegisterSchemaParams = {
    schema: "uint256 id, string name",
    resolverAddress: "0x0000000000000000000000000000000000000000",
    revocable: false,
  };

  // const schemaUID = await registerSchema(signer, BNB_schemaRegistryAddress, params);

  // await getSchemaByUID(
  //   provider,
  //   BNB_schemaRegistryAddress,
  //   "0x38e5fea851e6c36703fa5b7371777c1ac47bcec4fd1c35cc9c6d7f5331a130cf"
  // );

  const attestation = await createAttestOffChain(signer, BNB_basAddress);
  console.log(attestation);
}

main();
