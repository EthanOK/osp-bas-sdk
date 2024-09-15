var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/schema/register.ts
import {
  EAS,
  SchemaRegistry
} from "@ethereum-attestation-service/eas-sdk";
var initEAS = (provider, BASContractAddress) => {
  const bas = new EAS(BASContractAddress);
  bas.connect(provider);
};
var registerSchema = (signer, schemaRegistryAddress, params) => __async(void 0, null, function* () {
  const schemaRegistry = new SchemaRegistry(schemaRegistryAddress);
  schemaRegistry.connect(signer);
  const transaction = yield schemaRegistry.register({
    schema: params.schema,
    resolverAddress: params.resolverAddress,
    revocable: params.revocable
  });
  const schemaUID = yield transaction.wait();
  return schemaUID;
});
var getSchemaByUID = (provider, schemaRegistryAddress, schemaUID) => __async(void 0, null, function* () {
  const schemaRegistry = new SchemaRegistry(schemaRegistryAddress);
  schemaRegistry.connect(provider);
  const schemaRecord = yield schemaRegistry.getSchema({ uid: schemaUID });
  return schemaRecord;
});

// src/attestation/createAttestation.ts
var createAttestOffChain = (signer, bas, params) => __async(void 0, null, function* () {
  bas.connect(signer);
  const offchain = yield bas.getOffchain();
  const timestamp = Math.floor(Date.now() / 1e3);
  const attestation = yield offchain.signOffchainAttestation(
    {
      recipient: params.recipient,
      // Unix timestamp of when attestation expires. (0 for no expiration)
      expirationTime: BigInt(0),
      // Unix timestamp of current time
      time: BigInt(timestamp),
      revocable: true,
      version: 1,
      // Fixed value
      nonce: BigInt(0),
      // Fixed value
      schema: params.schemaUID,
      refUID: params.refUID,
      data: params.encodedData
    },
    signer
  );
  const attestation_ = JSON.stringify(
    attestation,
    (key, value) => typeof value === "bigint" ? Number(value).toString() : value
  );
  return attestation_;
});

// src/greenfield/create.ts
import {
  bytesFromBase64,
  Client,
  Long,
  RedundancyType,
  VisibilityType
} from "@bnb-chain/greenfield-js-sdk";

// src/greenfield/utils.ts
import { hashMessage, getAddress } from "ethers";
var encodeAddrToBucketName = (addr) => {
  return `bas-${hashMessage(getAddress(addr)).substring(2, 42)}`;
};
var getSps = (client) => __async(void 0, null, function* () {
  const sps = yield client.sp.getStorageProviders();
  const finalSps = (sps != null ? sps : []).filter((v) => v.endpoint.includes("nodereal"));
  return finalSps;
});
var getAllSps = (client) => __async(void 0, null, function* () {
  const sps = yield getSps(client);
  return sps.map((sp) => {
    var _a;
    return {
      address: sp.operatorAddress,
      endpoint: sp.endpoint,
      name: (_a = sp.description) == null ? void 0 : _a.moniker
    };
  });
});
var selectSp = (client) => __async(void 0, null, function* () {
  var _a;
  const finalSps = yield getSps(client);
  const selectIndex = Math.floor(Math.random() * finalSps.length);
  const secondarySpAddresses = [
    ...finalSps.slice(0, selectIndex),
    ...finalSps.slice(selectIndex + 1)
  ].map((item) => item.operatorAddress);
  const selectSpInfo = {
    //@ts-ignore
    id: finalSps[selectIndex].id || 0,
    endpoint: finalSps[selectIndex].endpoint,
    primarySpAddress: (_a = finalSps[selectIndex]) == null ? void 0 : _a.operatorAddress,
    sealAddress: finalSps[selectIndex].sealAddress,
    secondarySpAddresses
  };
  return selectSpInfo;
});

// src/greenfield/create.ts
import { ReedSolomon } from "@bnb-chain/reed-solomon";
var rs = new ReedSolomon();
var GreenFieldClientTS = class {
  /**
   * @param url greenfield rpc url
   * @param chainId greenfield chainId
   * @param creator creator address
   */
  constructor(url, chainId, creator) {
    // chainId = null;
    this.address = null;
    this.client = Client.create(url, chainId);
    this.address = creator;
  }
  /**
   * create bucket
   * @param bucketName bucket name
   * @param privateKey creator private key
   */
  createBucket(bucketName, privateKey) {
    return __async(this, null, function* () {
      const spInfo = yield selectSp(this.client);
      if (!privateKey.startsWith("0x")) {
        privateKey = "0x" + privateKey;
      }
      let isBucketExist = false;
      try {
        const bucketMeta = yield this.client.bucket.getBucketMeta({ bucketName });
        console.log("bucketMeta", bucketMeta);
        isBucketExist = true;
      } catch (error) {
      }
      let res;
      try {
        const createBucketTx = yield this.client.bucket.createBucket({
          bucketName,
          creator: this.address,
          visibility: VisibilityType.VISIBILITY_TYPE_PUBLIC_READ,
          chargedReadQuota: Long.fromString("0"),
          paymentAddress: this.address,
          primarySpAddress: spInfo.primarySpAddress
        });
        const simulateInfo = yield createBucketTx.simulate({
          denom: "BNB"
        });
        res = yield createBucketTx.broadcast({
          denom: "BNB",
          gasLimit: Number(simulateInfo == null ? void 0 : simulateInfo.gasLimit),
          gasPrice: (simulateInfo == null ? void 0 : simulateInfo.gasPrice) || "5000000000",
          payer: this.address,
          granter: "",
          privateKey
        });
        console.log("transactionHash", res.transactionHash);
      } catch (error) {
        if (!isBucketExist) {
          console.log(error);
        }
      }
      return isBucketExist;
    });
  }
  /**
   * create object
   * @param bucketName bucket name
   * @param attestation attestation
   * @param privateKey creator private key
   * @param isPrivate is private object
   */
  createObject(bucketName, attestation, privateKey, isPrivate = false) {
    return __async(this, null, function* () {
      console.log("started");
      if (!privateKey.startsWith("0x")) {
        privateKey = "0x" + privateKey;
      }
      const attest = JSON.parse(attestation);
      const fileName = `${attest.message.schema}.${attest.uid}`;
      const fileBuffer = Buffer.from(attestation);
      const expectCheckSums = rs.encode(Uint8Array.from(fileBuffer));
      const createObjectTx = yield this.client.object.createObject({
        bucketName,
        objectName: fileName,
        creator: this.address,
        visibility: isPrivate ? VisibilityType.VISIBILITY_TYPE_PRIVATE : VisibilityType.VISIBILITY_TYPE_PUBLIC_READ,
        contentType: "json",
        redundancyType: RedundancyType.REDUNDANCY_EC_TYPE,
        payloadSize: Long.fromInt(fileBuffer.byteLength),
        expectChecksums: expectCheckSums.map((x) => bytesFromBase64(x))
      });
      const simulateInfo = yield createObjectTx.simulate({
        denom: "BNB"
      });
      const { transactionHash } = yield createObjectTx.broadcast({
        denom: "BNB",
        gasLimit: Number(simulateInfo.gasLimit),
        gasPrice: simulateInfo.gasPrice,
        payer: this.address,
        granter: "",
        privateKey
      });
      console.log("create object success", transactionHash);
      const uploadRes = yield this.client.object.uploadObject(
        {
          bucketName,
          objectName: fileName,
          body: createFile(fileName, fileBuffer),
          txnHash: transactionHash
        },
        // highlight-start
        {
          type: "ECDSA",
          privateKey
        }
        // highlight-end
      );
      if (uploadRes.code === 0) {
        console.log("upload object success", uploadRes);
      }
      return transactionHash;
    });
  }
};
function createFile(fileName, fileBuffer) {
  return {
    name: fileName,
    type: "",
    size: fileBuffer.byteLength,
    content: fileBuffer
  };
}

// src/bas/index.ts
import {
  EAS as BaseEAS,
  SchemaEncoder as BaseSchemaEncoder
} from "@ethereum-attestation-service/eas-sdk";
var BAS = BaseEAS;
var SchemaEncoder = BaseSchemaEncoder;
export {
  BAS,
  GreenFieldClientTS,
  SchemaEncoder,
  createAttestOffChain,
  encodeAddrToBucketName,
  getAllSps,
  getSchemaByUID,
  getSps,
  initEAS,
  registerSchema,
  selectSp
};
