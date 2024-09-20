var __getOwnPropNames = Object.getOwnPropertyNames;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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

// node_modules/dotenv/package.json
var require_package = __commonJS({
  "node_modules/dotenv/package.json"(exports, module) {
    module.exports = {
      name: "dotenv",
      version: "16.4.5",
      description: "Loads environment variables from .env file",
      main: "lib/main.js",
      types: "lib/main.d.ts",
      exports: {
        ".": {
          types: "./lib/main.d.ts",
          require: "./lib/main.js",
          default: "./lib/main.js"
        },
        "./config": "./config.js",
        "./config.js": "./config.js",
        "./lib/env-options": "./lib/env-options.js",
        "./lib/env-options.js": "./lib/env-options.js",
        "./lib/cli-options": "./lib/cli-options.js",
        "./lib/cli-options.js": "./lib/cli-options.js",
        "./package.json": "./package.json"
      },
      scripts: {
        "dts-check": "tsc --project tests/types/tsconfig.json",
        lint: "standard",
        "lint-readme": "standard-markdown",
        pretest: "npm run lint && npm run dts-check",
        test: "tap tests/*.js --100 -Rspec",
        "test:coverage": "tap --coverage-report=lcov",
        prerelease: "npm test",
        release: "standard-version"
      },
      repository: {
        type: "git",
        url: "git://github.com/motdotla/dotenv.git"
      },
      funding: "https://dotenvx.com",
      keywords: [
        "dotenv",
        "env",
        ".env",
        "environment",
        "variables",
        "config",
        "settings"
      ],
      readmeFilename: "README.md",
      license: "BSD-2-Clause",
      devDependencies: {
        "@definitelytyped/dtslint": "^0.0.133",
        "@types/node": "^18.11.3",
        decache: "^4.6.1",
        sinon: "^14.0.1",
        standard: "^17.0.0",
        "standard-markdown": "^7.1.0",
        "standard-version": "^9.5.0",
        tap: "^16.3.0",
        tar: "^6.1.11",
        typescript: "^4.8.4"
      },
      engines: {
        node: ">=12"
      },
      browser: {
        fs: false
      }
    };
  }
});

// node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "node_modules/dotenv/lib/main.js"(exports, module) {
    var fs = __require("fs");
    var path = __require("path");
    var os = __require("os");
    var crypto = __require("crypto");
    var packageJson = require_package();
    var version = packageJson.version;
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match;
      while ((match = LINE.exec(lines)) != null) {
        const key = match[1];
        let value = match[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    function _parseVault(options) {
      const vaultPath = _vaultPath(options);
      const result = DotenvModule.configDotenv({ path: vaultPath });
      if (!result.parsed) {
        const err = new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`);
        err.code = "MISSING_DATA";
        throw err;
      }
      const keys = _dotenvKey(options).split(",");
      const length = keys.length;
      let decrypted;
      for (let i = 0; i < length; i++) {
        try {
          const key = keys[i].trim();
          const attrs = _instructions(result, key);
          decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key);
          break;
        } catch (error) {
          if (i + 1 >= length) {
            throw error;
          }
        }
      }
      return DotenvModule.parse(decrypted);
    }
    function _log(message) {
      console.log(`[dotenv@${version}][INFO] ${message}`);
    }
    function _warn(message) {
      console.log(`[dotenv@${version}][WARN] ${message}`);
    }
    function _debug(message) {
      console.log(`[dotenv@${version}][DEBUG] ${message}`);
    }
    function _dotenvKey(options) {
      if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {
        return options.DOTENV_KEY;
      }
      if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
        return process.env.DOTENV_KEY;
      }
      return "";
    }
    function _instructions(result, dotenvKey) {
      let uri;
      try {
        uri = new URL(dotenvKey);
      } catch (error) {
        if (error.code === "ERR_INVALID_URL") {
          const err = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        }
        throw error;
      }
      const key = uri.password;
      if (!key) {
        const err = new Error("INVALID_DOTENV_KEY: Missing key part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environment = uri.searchParams.get("environment");
      if (!environment) {
        const err = new Error("INVALID_DOTENV_KEY: Missing environment part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`;
      const ciphertext = result.parsed[environmentKey];
      if (!ciphertext) {
        const err = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`);
        err.code = "NOT_FOUND_DOTENV_ENVIRONMENT";
        throw err;
      }
      return { ciphertext, key };
    }
    function _vaultPath(options) {
      let possibleVaultPath = null;
      if (options && options.path && options.path.length > 0) {
        if (Array.isArray(options.path)) {
          for (const filepath of options.path) {
            if (fs.existsSync(filepath)) {
              possibleVaultPath = filepath.endsWith(".vault") ? filepath : `${filepath}.vault`;
            }
          }
        } else {
          possibleVaultPath = options.path.endsWith(".vault") ? options.path : `${options.path}.vault`;
        }
      } else {
        possibleVaultPath = path.resolve(process.cwd(), ".env.vault");
      }
      if (fs.existsSync(possibleVaultPath)) {
        return possibleVaultPath;
      }
      return null;
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path.join(os.homedir(), envPath.slice(1)) : envPath;
    }
    function _configVault(options) {
      _log("Loading env from encrypted .env.vault");
      const parsed = DotenvModule._parseVault(options);
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsed, options);
      return { parsed };
    }
    function configDotenv(options) {
      const dotenvPath = path.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      const debug = Boolean(options && options.debug);
      if (options && options.encoding) {
        encoding = options.encoding;
      } else {
        if (debug) {
          _debug("No encoding is specified. UTF-8 is used by default");
        }
      }
      let optionPaths = [dotenvPath];
      if (options && options.path) {
        if (!Array.isArray(options.path)) {
          optionPaths = [_resolveHome(options.path)];
        } else {
          optionPaths = [];
          for (const filepath of options.path) {
            optionPaths.push(_resolveHome(filepath));
          }
        }
      }
      let lastError;
      const parsedAll = {};
      for (const path2 of optionPaths) {
        try {
          const parsed = DotenvModule.parse(fs.readFileSync(path2, { encoding }));
          DotenvModule.populate(parsedAll, parsed, options);
        } catch (e) {
          if (debug) {
            _debug(`Failed to load ${path2} ${e.message}`);
          }
          lastError = e;
        }
      }
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsedAll, options);
      if (lastError) {
        return { parsed: parsedAll, error: lastError };
      } else {
        return { parsed: parsedAll };
      }
    }
    function config(options) {
      if (_dotenvKey(options).length === 0) {
        return DotenvModule.configDotenv(options);
      }
      const vaultPath = _vaultPath(options);
      if (!vaultPath) {
        _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}. Did you forget to build it?`);
        return DotenvModule.configDotenv(options);
      }
      return DotenvModule._configVault(options);
    }
    function decrypt(encrypted, keyStr) {
      const key = Buffer.from(keyStr.slice(-64), "hex");
      let ciphertext = Buffer.from(encrypted, "base64");
      const nonce = ciphertext.subarray(0, 12);
      const authTag = ciphertext.subarray(-16);
      ciphertext = ciphertext.subarray(12, -16);
      try {
        const aesgcm = crypto.createDecipheriv("aes-256-gcm", key, nonce);
        aesgcm.setAuthTag(authTag);
        return `${aesgcm.update(ciphertext)}${aesgcm.final()}`;
      } catch (error) {
        const isRange = error instanceof RangeError;
        const invalidKeyLength = error.message === "Invalid key length";
        const decryptionFailed = error.message === "Unsupported state or unable to authenticate data";
        if (isRange || invalidKeyLength) {
          const err = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        } else if (decryptionFailed) {
          const err = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
          err.code = "DECRYPTION_FAILED";
          throw err;
        } else {
          throw error;
        }
      }
    }
    function populate(processEnv, parsed, options = {}) {
      const debug = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      if (typeof parsed !== "object") {
        const err = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
        err.code = "OBJECT_REQUIRED";
        throw err;
      }
      for (const key of Object.keys(parsed)) {
        if (Object.prototype.hasOwnProperty.call(processEnv, key)) {
          if (override === true) {
            processEnv[key] = parsed[key];
          }
          if (debug) {
            if (override === true) {
              _debug(`"${key}" is already defined and WAS overwritten`);
            } else {
              _debug(`"${key}" is already defined and was NOT overwritten`);
            }
          }
        } else {
          processEnv[key] = parsed[key];
        }
      }
    }
    var DotenvModule = {
      configDotenv,
      _configVault,
      _parseVault,
      config,
      decrypt,
      parse,
      populate
    };
    module.exports.configDotenv = DotenvModule.configDotenv;
    module.exports._configVault = DotenvModule._configVault;
    module.exports._parseVault = DotenvModule._parseVault;
    module.exports.config = DotenvModule.config;
    module.exports.decrypt = DotenvModule.decrypt;
    module.exports.parse = DotenvModule.parse;
    module.exports.populate = DotenvModule.populate;
    module.exports = DotenvModule;
  }
});

// node_modules/dotenv/lib/env-options.js
var require_env_options = __commonJS({
  "node_modules/dotenv/lib/env-options.js"(exports, module) {
    var options = {};
    if (process.env.DOTENV_CONFIG_ENCODING != null) {
      options.encoding = process.env.DOTENV_CONFIG_ENCODING;
    }
    if (process.env.DOTENV_CONFIG_PATH != null) {
      options.path = process.env.DOTENV_CONFIG_PATH;
    }
    if (process.env.DOTENV_CONFIG_DEBUG != null) {
      options.debug = process.env.DOTENV_CONFIG_DEBUG;
    }
    if (process.env.DOTENV_CONFIG_OVERRIDE != null) {
      options.override = process.env.DOTENV_CONFIG_OVERRIDE;
    }
    if (process.env.DOTENV_CONFIG_DOTENV_KEY != null) {
      options.DOTENV_KEY = process.env.DOTENV_CONFIG_DOTENV_KEY;
    }
    module.exports = options;
  }
});

// node_modules/dotenv/lib/cli-options.js
var require_cli_options = __commonJS({
  "node_modules/dotenv/lib/cli-options.js"(exports, module) {
    var re = /^dotenv_config_(encoding|path|debug|override|DOTENV_KEY)=(.+)$/;
    module.exports = function optionMatcher(args) {
      return args.reduce(function(acc, cur) {
        const matches = cur.match(re);
        if (matches) {
          acc[matches[1]] = matches[2];
        }
        return acc;
      }, {});
    };
  }
});

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
import {
  EAS as EAS2
} from "@ethereum-attestation-service/eas-sdk";

// src/attestation/encodedOspData.ts
import { SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
var OspDataType = /* @__PURE__ */ ((OspDataType2) => {
  OspDataType2[OspDataType2["None"] = 0] = "None";
  OspDataType2[OspDataType2["Follow"] = 1] = "Follow";
  OspDataType2[OspDataType2["Profile"] = 2] = "Profile";
  OspDataType2[OspDataType2["Community"] = 3] = "Community";
  OspDataType2[OspDataType2["Join"] = 4] = "Join";
  return OspDataType2;
})(OspDataType || {});
var FollowSchemaUID = "0x1c9575bc318527d66fad7fc50aae6e2153185fcc624e14cf0af562d87d869be2";
var ProfileSchemaUID = "0x7c90370dcf194ce4c2851abec14da05abd98d8860ae7147ac714755430d42f6e";
var CommunitySchemaUID = "0x18c1dbf9c1a1c6a64b661c23110116f80b7d6897839334b724ea2a46056bee94";
var JoinSchemaUID = "0x3a017e34de4075a58f3a6a2826823a95bf38924b87646b68621c5fb4c2201069";
var OspDataTypeMap = /* @__PURE__ */ new Map([
  [1 /* Follow */, FollowSchemaUID],
  [2 /* Profile */, ProfileSchemaUID],
  [3 /* Community */, CommunitySchemaUID],
  [4 /* Join */, JoinSchemaUID]
]);
var FollowSchema = "bytes32 followTx, address follower, uint256 followedProfileId";
var ProfileSchema = "bytes32 createProfileTx, address profileOwner, uint256 profileId, string handle";
var CommunitySchema = "bytes32 createCommunityTx, address communityOwner, uint256 communityId, string handle, address joinNFT";
var JoinSchema = "bytes32 joinTx, address joiner, uint256 communityId";
var OspSchemaMap = /* @__PURE__ */ new Map([
  [1 /* Follow */, FollowSchema],
  [2 /* Profile */, ProfileSchema],
  [3 /* Community */, CommunitySchema],
  [4 /* Join */, JoinSchema]
]);
var encodeFollowData = (param) => {
  const schemaEncoder = new SchemaEncoder(FollowSchema);
  const encodedData = schemaEncoder.encodeData([
    { name: "followTx", value: param.followTx, type: "bytes32" },
    { name: "follower", value: param.follower, type: "address" },
    {
      name: "followedProfileId",
      value: param.followedProfileId,
      type: "uint256"
    }
  ]);
  return encodedData;
};
var encodeProfileData = (param) => {
  const schemaEncoder = new SchemaEncoder(ProfileSchema);
  const encodedData = schemaEncoder.encodeData([
    { name: "createProfileTx", value: param.createProfileTx, type: "bytes32" },
    { name: "profileOwner", value: param.profileOwner, type: "address" },
    { name: "profileId", value: param.profileId, type: "uint256" },
    { name: "handle", value: param.handle, type: "string" }
  ]);
  return encodedData;
};
var encodeCommunityData = (param) => {
  const schemaEncoder = new SchemaEncoder(CommunitySchema);
  const encodedData = schemaEncoder.encodeData([
    {
      name: "createCommunityTx",
      value: param.createCommunityTx,
      type: "bytes32"
    },
    { name: "communityOwner", value: param.communityOwner, type: "address" },
    { name: "communityId", value: param.communityId, type: "uint256" },
    { name: "handle", value: param.handle, type: "string" },
    { name: "joinNFT", value: param.joinNFT, type: "address" }
  ]);
  return encodedData;
};
var encodeJoinData = (param) => {
  const schemaEncoder = new SchemaEncoder(JoinSchema);
  const encodedData = schemaEncoder.encodeData([
    { name: "joinTx", value: param.joinTx, type: "bytes32" },
    { name: "joiner", value: param.joiner, type: "address" },
    { name: "communityId", value: param.communityId, type: "uint256" }
  ]);
  return encodedData;
};

// src/attestation/createAttestation.ts
var getAttestationOffChain = (offchain, signer, params) => __async(void 0, null, function* () {
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
  return attestation;
});
var getSigatureByDelegation = (bas, params, signer) => __async(void 0, null, function* () {
  if (signer.provider == null) {
    throw new Error("Signer provider is not defined");
  }
  bas.connect(signer);
  const delegated = yield bas.getDelegated();
  const params_ = {
    schema: params.schemaUID,
    recipient: params.recipient,
    expirationTime: BigInt(0),
    revocable: true,
    refUID: params.refUID,
    data: params.encodedData,
    value: BigInt(0),
    deadline: params.deadline,
    nonce: params.nonce
  };
  const attestation = yield delegated.signDelegatedAttestation(params_, signer);
  return attestation.signature;
});
var getAttestationRequestData = (recipient, encodedData) => {
  const attestationRequestData = {
    recipient,
    expirationTime: BigInt(0),
    revocable: true,
    data: encodedData,
    refUID: "0x0000000000000000000000000000000000000000000000000000000000000000",
    value: BigInt(0)
  };
  return attestationRequestData;
};
var getAttestParamsOffChain = (dataType, recipient, encodedData) => {
  const params = {
    schemaUID: OspDataTypeMap.get(dataType),
    encodedData,
    recipient,
    refUID: "0x0000000000000000000000000000000000000000000000000000000000000000"
  };
  return params;
};
var getMulAttestParams = (params) => {
  const groupedParams = {};
  params.forEach((param) => {
    if (!groupedParams[param.dataType]) {
      groupedParams[param.dataType] = [];
    }
    groupedParams[param.dataType].push(param);
  });
  const result = Object.keys(groupedParams).map(
    (dataTypeStr) => ({
      schema: OspDataTypeMap.get(parseInt(dataTypeStr)),
      data: groupedParams[parseInt(dataTypeStr)].map(
        (param) => param.requestData
      )
    })
  );
  return result;
};
var multiAttestBASOnChain = (signer, params) => __async(void 0, null, function* () {
  try {
    const basAddress = process.env.BAS_ADDRESS_OPBNB;
    if (basAddress == null || basAddress == "") {
      throw new Error("BAS_ADDRESS_OPBNB is not config in env file");
    }
    const bas = new EAS2(basAddress);
    bas.connect(signer);
    const txs = yield bas.multiAttest(params);
    const attestUIDs = yield txs.wait();
    return attestUIDs;
  } catch (error) {
    console.log(error);
    return null;
  }
});
var multiAttestBASOffChain = (signer, unHandleDatas) => __async(void 0, null, function* () {
  const offchain = yield new EAS2(process.env.BAS_ADDRESS_BNB).connect(signer).getOffchain();
  const attestations = [];
  try {
    for (let i = 0; i < unHandleDatas.length; i++) {
      const data = unHandleDatas[i];
      if (data.dataType == 0 /* None */) {
        continue;
      }
      const attestation = yield getAttestationOffChain(
        offchain,
        signer,
        data.requestData
      );
      attestations.push(attestation);
    }
    return attestations;
  } catch (error) {
    console.log(error);
    return attestations;
  }
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
var getSps = (client2) => __async(void 0, null, function* () {
  const sps = yield client2.sp.getStorageProviders();
  const finalSps = (sps != null ? sps : []).filter((v) => v.endpoint.includes("nodereal"));
  return finalSps;
});
var getAllSps = (client2) => __async(void 0, null, function* () {
  const sps = yield getSps(client2);
  return sps.map((sp) => {
    var _a;
    return {
      address: sp.operatorAddress,
      endpoint: sp.endpoint,
      name: (_a = sp.description) == null ? void 0 : _a.moniker
    };
  });
});
var selectSp = (client2) => __async(void 0, null, function* () {
  var _a;
  const finalSps = yield getSps(client2);
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
   * @param attestation attestation is Json String
   * @param privateKey creator private key
   * @param isPrivate is private object
   */
  createObject(bucketName, attestation, privateKey, isPrivate = false) {
    return __async(this, null, function* () {
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
  /**
   * create object multiple attestations
   * @param bucketName bucket name
   * @param attestations attestations is Json String
   * @param privateKey creator private key
   * @param isPrivate is private object
   */
  createObjectMulAttest(bucketName, attestations, fileName, privateKey, isPrivate = false) {
    return __async(this, null, function* () {
      console.log("started");
      if (!privateKey.startsWith("0x")) {
        privateKey = "0x" + privateKey;
      }
      const attest = JSON.parse(attestations);
      const fileBuffer = Buffer.from(attestations);
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

// node_modules/dotenv/config.js
(function() {
  require_main().config(
    Object.assign(
      {},
      require_env_options(),
      require_cli_options()(process.argv)
    )
  );
})();

// src/greenfield/createObjectOSP.ts
var client = new GreenFieldClientTS(
  process.env.GREEN_RPC_URL,
  process.env.GREEN_CHAIN_ID,
  process.env.GREEN_PAYMENT_ADDRESS
);
var createObjectAttestOSP = (bucketName, attestation, privateKey, isPrivate = false) => __async(void 0, null, function* () {
  yield client.createObject(
    bucketName,
    serializeJsonString(attestation),
    privateKey,
    isPrivate
  );
});
var createObjectMulAttestOSP = (bucketName, attestations, fileName, privateKey, isPrivate = false) => __async(void 0, null, function* () {
  yield client.createObjectMulAttest(
    bucketName,
    serializeJsonString(attestations),
    fileName,
    privateKey,
    isPrivate
  );
});
function serializeJsonString(data) {
  return JSON.stringify(data, (key, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  });
}

// src/bas/index.ts
import {
  EAS as BaseEAS,
  SchemaEncoder as BaseSchemaEncoder
} from "@ethereum-attestation-service/eas-sdk";
var BAS = BaseEAS;
var SchemaEncoder3 = BaseSchemaEncoder;

// src/kms/kms.ts
import { AwsKmsSigner } from "@cuonghx.gu-tech/ethers-aws-kms-signer";
import { ethers } from "ethers";
var getDeployer = () => __async(void 0, null, function* () {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const signer = new AwsKmsSigner(
    {
      keyId: process.env.AWS_KMS_KEY_ID,
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
      }
    },
    provider
  );
  yield signer.getAddress();
  return signer;
});
var getKmsSigner = (provider) => {
  const signer = new AwsKmsSigner(
    {
      keyId: process.env.AWS_KMS_KEY_ID,
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
      }
    },
    provider
  );
  return signer;
};

// src/handle/handleOsp.ts
var handleOspRequestData = (chainId, jsonData) => {
  const data = JSON.parse(jsonData);
  if (Number(data.chainId) === chainId || chainId === 0) {
    if (data.name === "FollowSBTTransferred") {
      const encodedData = encodeFollowData({
        followTx: data.transactionHash,
        follower: data.userAddress,
        followedProfileId: BigInt(data.referencedProfileId).toString()
      });
      return {
        dataType: 1 /* Follow */,
        requestData: getAttestationRequestData(data.userAddress, encodedData)
      };
    } else if (data.name === "JoinNFTTransferred") {
      const encodedData = encodeJoinData({
        joinTx: data.transactionHash,
        joiner: data.userAddress,
        communityId: BigInt(data.communityId).toString()
      });
      return {
        dataType: 4 /* Join */,
        requestData: getAttestationRequestData(data.userAddress, encodedData)
      };
    } else if (data.name === "ProfileCreated") {
      const encodedData = encodeProfileData({
        createProfileTx: data.transactionHash,
        profileOwner: data.userAddress,
        profileId: BigInt(data.profileId).toString(),
        handle: data.handle
      });
      return {
        dataType: 2 /* Profile */,
        requestData: getAttestationRequestData(data.userAddress, encodedData)
      };
    } else if (data.name === "CommunityCreated") {
      const encodedData = encodeCommunityData({
        createCommunityTx: data.transactionHash,
        communityOwner: data.userAddress,
        communityId: BigInt(data.communityId).toString(),
        handle: data.handle,
        joinNFT: data.joinNFT
      });
      return {
        dataType: 3 /* Community */,
        requestData: getAttestationRequestData(data.userAddress, encodedData)
      };
    }
  }
  return {
    dataType: 0 /* None */,
    requestData: null
  };
};
var handleOspRequestPrepareOffChain = (chainId, jsonData) => {
  const data = JSON.parse(jsonData);
  if (Number(data.chainId) === chainId || chainId === 0) {
    if (data.name === "FollowSBTTransferred") {
      const encodedData = encodeFollowData({
        followTx: data.transactionHash,
        follower: data.userAddress,
        followedProfileId: BigInt(data.referencedProfileId).toString()
      });
      return {
        dataType: 1 /* Follow */,
        requestData: getAttestParamsOffChain(
          1 /* Follow */,
          data.userAddress,
          encodedData
        )
      };
    } else if (data.name === "JoinNFTTransferred") {
      const encodedData = encodeJoinData({
        joinTx: data.transactionHash,
        joiner: data.userAddress,
        communityId: BigInt(data.communityId).toString()
      });
      return {
        dataType: 4 /* Join */,
        requestData: getAttestParamsOffChain(
          4 /* Join */,
          data.userAddress,
          encodedData
        )
      };
    } else if (data.name === "ProfileCreated") {
      const encodedData = encodeProfileData({
        createProfileTx: data.transactionHash,
        profileOwner: data.userAddress,
        profileId: BigInt(data.profileId).toString(),
        handle: data.handle
      });
      return {
        dataType: 2 /* Profile */,
        requestData: getAttestParamsOffChain(
          2 /* Profile */,
          data.userAddress,
          encodedData
        )
      };
    } else if (data.name === "CommunityCreated") {
      const encodedData = encodeCommunityData({
        createCommunityTx: data.transactionHash,
        communityOwner: data.userAddress,
        communityId: BigInt(data.communityId).toString(),
        handle: data.handle,
        joinNFT: data.joinNFT
      });
      return {
        dataType: 3 /* Community */,
        requestData: getAttestParamsOffChain(
          3 /* Community */,
          data.userAddress,
          encodedData
        )
      };
    }
  }
  return {
    dataType: 0 /* None */,
    requestData: null
  };
};
export {
  BAS,
  CommunitySchema,
  CommunitySchemaUID,
  FollowSchema,
  FollowSchemaUID,
  GreenFieldClientTS,
  JoinSchema,
  JoinSchemaUID,
  OspDataType,
  OspDataTypeMap,
  OspSchemaMap,
  ProfileSchema,
  ProfileSchemaUID,
  SchemaEncoder3 as SchemaEncoder,
  createObjectAttestOSP,
  createObjectMulAttestOSP,
  encodeAddrToBucketName,
  encodeCommunityData,
  encodeFollowData,
  encodeJoinData,
  encodeProfileData,
  getAllSps,
  getAttestParamsOffChain,
  getAttestationOffChain,
  getAttestationRequestData,
  getDeployer,
  getKmsSigner,
  getMulAttestParams,
  getSchemaByUID,
  getSigatureByDelegation,
  getSps,
  handleOspRequestData,
  handleOspRequestPrepareOffChain,
  initEAS,
  multiAttestBASOffChain,
  multiAttestBASOnChain,
  registerSchema,
  selectSp,
  serializeJsonString
};
