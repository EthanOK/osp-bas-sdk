import Kms20160120, * as $Kms20160120 from "@alicloud/kms20160120";
import { Config, GlobalParameters } from "@alicloud/openapi-client";

export type ClientParams = {
  accessKeyId?: string;
  accessKeySecret?: string;
  securityToken?: string;
  bearerToken?: string;
  protocol?: string;
  method?: string;
  regionId?: string;
  readTimeout?: number;
  connectTimeout?: number;
  httpProxy?: string;
  httpsProxy?: string;
  credential?: Credential;
  endpoint?: string;
  noProxy?: string;
  maxIdleConns?: number;
  network?: string;
  userAgent?: string;
  suffix?: string;
  socks5Proxy?: string;
  socks5NetWork?: string;
  endpointType?: string;
  openPlatformEndpoint?: string;
  type?: string;
  signatureVersion?: string;
  signatureAlgorithm?: string;
  globalParameters?: GlobalParameters;
  key?: string;
  cert?: string;
  ca?: string;
  disableHttp2?: boolean;
};

export type KmsClientParams = { clientParams: ClientParams; keyId: string };

/**
 * KMS client
 */
export class KmsClient {
  client: Kms20160120;
  keyId: string;

  constructor(params: KmsClientParams) {
    this.client = KmsClient.createClient(params.clientParams);
    this.keyId = params.keyId;
  }

  static createClient(param: ClientParams): Kms20160120 {
    let config = new Config(param);

    return new Kms20160120(config);
  }

  async decrypt(
    ciphertextBlob: string,
    encryptionContext: { [key: string]: any }
  ): Promise<$Kms20160120.DecryptResponse> {
    let request = new $Kms20160120.DecryptRequest({
      ciphertextBlob: ciphertextBlob,
      encryptionContext: encryptionContext,
    });
    return await this.client.decrypt(request);
  }

  async encrypt(
    plaintext: string,
    encryptionContext: { [key: string]: any }
  ): Promise<$Kms20160120.EncryptResponse> {
    let request = new $Kms20160120.EncryptRequest({
      plaintext: plaintext,
      keyId: this.keyId,
      encryptionContext: encryptionContext,
    });
    return await this.client.encrypt(request);
  }
}

export const getKmsCipherText = async (
  kms_params: KmsClientParams,
  plaintext: string
) => {
  try {
    let client = new KmsClient(kms_params);
    let encryptRes = await client.encrypt(plaintext, {});
    const ciphertextBlob = encryptRes.body.ciphertextBlob;
    return ciphertextBlob;
  } catch (e) {
    console.log(e);
    return "";
  }
};

export const getKmsPlainText = async (
  kms_params: KmsClientParams,
  ciphertextBlob: string
) => {
  try {
    let client = new KmsClient(kms_params);
    let decryptRes = await client.decrypt(ciphertextBlob, {});
    const plaintext = decryptRes.body.plaintext;
    return plaintext;
  } catch (e) {
    console.log(e);
    return "";
  }
};
