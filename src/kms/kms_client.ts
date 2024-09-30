import Kms20160120, * as $Kms20160120 from "@alicloud/kms20160120";
import OpenApi, * as $OpenApi from "@alicloud/openapi-client";

export type KmsParams = {
  accessKeyId: string;
  accessKeySecret: string;
  regionId: string;
  keyId: string;
};
export default class KmsClient {
  client: Kms20160120;
  keyId: string;

  constructor(params: KmsParams) {
    this.client = KmsClient.createClient(
      params.accessKeyId,
      params.accessKeySecret,
      params.regionId
    );
    this.keyId = params.keyId;
  }

  static createClient(
    accessKeyId: string,
    accessKeySecret: string,
    regionId: string
  ): Kms20160120 {
    let config = new $OpenApi.Config({
      accessKeyId: accessKeyId,
      accessKeySecret: accessKeySecret,
      regionId: regionId,
    });

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


