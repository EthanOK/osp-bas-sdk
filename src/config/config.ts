import { getKmsPlainText, KmsClient, KmsClientParams } from "../kms/kms_client";
import { ethers } from "ethers";

export type GreenfieldConfig = {
  GREEN_RPC_URL: string;
  GREEN_CHAIN_ID: string;
  GREEN_PAYMENT_ADDRESS: string;
  GREEN_PAYMENT_MNEMONIC_CIPHERTEXT: string;
};

export type KmsCryptConfig = KmsClientParams;

export type BasConfig = {
  RPC_URL: string;
  BAS_ADDRESS: string;
  SCHEMA_REGISTRY_ADDRESS: string;
};

let greenfieldConfig: GreenfieldConfig;

let kmsCryptConfig: KmsCryptConfig;

let basConfig: BasConfig;

let privateKey: string = "";

export const getGreenfieldConfig = () => {
  if (greenfieldConfig === undefined) {
    return null;
  }
  return greenfieldConfig;
};

export const setGreenfieldConfig = (config: GreenfieldConfig) => {
  greenfieldConfig = config;
};

export const getKmsCryptConfig = () => {
  if (kmsCryptConfig === undefined) {
    return null;
  }
  return kmsCryptConfig;
};

export const setKmsCryptConfig = (config: KmsCryptConfig) => {
  kmsCryptConfig = config;
};

export const getBasConfig = () => {
  if (basConfig === undefined) {
    return null;
  }
  return basConfig;
};

export const setBasConfig = (config: BasConfig) => {
  basConfig = config;
};

export const getPrivateKey = () => {
  return privateKey;
};

export const setPrivateKey = (key: string) => {
  privateKey = key;
};

export async function getPrivateKeyByKms(): Promise<string> {
  try {
    console.log("init KmsClient");

    const kmsConfig = getKmsCryptConfig();
    if (kmsConfig === null) {
      console.log("kms config is null");
      return "";
    }

    const greenfieldConfig = getGreenfieldConfig();
    if (greenfieldConfig === null) {
      console.log("greenfield config is null");
      return "";
    }

    const mnemonic = await getKmsPlainText(
      kmsConfig,
      greenfieldConfig.GREEN_PAYMENT_MNEMONIC_CIPHERTEXT
    );

    const privateKey = ethers.Wallet.fromPhrase(mnemonic).privateKey;

    return privateKey;
  } catch (e) {
    console.log(e);
    return "";
  }
}

export async function setPrivateKeyByKms(
  ciphertextBlob: string
): Promise<boolean> {
  try {
    const kmsConfig = getKmsCryptConfig();
    if (kmsConfig === null) {
      console.log("kms config is null");
      return false;
    }

    const client = new KmsClient({
      clientParams: kmsConfig.clientParams!,
      keyId: kmsConfig.keyId!,
    });

    let decryptRes = await client.decrypt(ciphertextBlob, {});

    setPrivateKey(decryptRes.body.plaintext);

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export const setOspBasSdkConfig = async (config: {
  basConfig: BasConfig;
  kmsCryptConfig: KmsCryptConfig;
  greenfieldConfig: GreenfieldConfig;
}) => {
  setBasConfig(config.basConfig);
  setKmsCryptConfig(config.kmsCryptConfig);
  setGreenfieldConfig(config.greenfieldConfig);
  const privateKey = await getPrivateKeyByKms();
  setPrivateKey(privateKey);
  return true;
};
