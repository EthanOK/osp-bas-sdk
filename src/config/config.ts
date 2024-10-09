export type GreenfieldConfig = {
  GREEN_RPC_URL: string;
  GREEN_CHAIN_ID: string;
  GREEN_PAYMENT_ADDRESS: string;
  GREEN_PAYMENT_PRIVATE_KEY_KMS_CIPHERTEXT: string;
};

export type KmsCryptConfig = {
  ALIBABA_CLOUD_ACCESS_KEY_ID: string;
  ALIBABA_CLOUD_ACCESS_KEY_SECRET: string;
  ALIBABA_CLOUD_REGION_ID: string;
  ALIBABA_CLOUD_KMS_KEY_ID: string;
};

export type BasConfig = {
  RPC_URL: string;
  BAS_ADDRESS: string;
  SCHEMA_REGISTRY_ADDRESS: string;
};

let greenfieldConfig: GreenfieldConfig;

let kmsCryptConfig: KmsCryptConfig;

let basConfig: BasConfig;

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

export const setOspBasSdkConfig = (config: {
  basConfig: BasConfig;
  kmsCryptConfig: KmsCryptConfig;
  greenfieldConfig: GreenfieldConfig;
}) => {
  setBasConfig(config.basConfig);
  setKmsCryptConfig(config.kmsCryptConfig);
  setGreenfieldConfig(config.greenfieldConfig);
};
