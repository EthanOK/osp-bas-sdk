var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __knownSymbol = (name, symbol) => (symbol = Symbol[name]) ? symbol : Symbol.for("Symbol." + name);
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
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
var __forAwait = (obj, it, method) => (it = obj[__knownSymbol("asyncIterator")]) ? it.call(obj) : (obj = obj[__knownSymbol("iterator")](), it = {}, method = (key, fn) => (fn = obj[key]) && (it[key] = (arg) => new Promise((yes, no, done) => (arg = fn.call(obj, arg), done = arg.done, Promise.resolve(arg.value).then((value) => yes({ value, done }), no)))), method("next"), method("return"), it);

// node_modules/dotenv/package.json
var require_package = __commonJS({
  "node_modules/dotenv/package.json"(exports2, module2) {
    module2.exports = {
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
  "node_modules/dotenv/lib/main.js"(exports2, module2) {
    var fs2 = require("fs");
    var path2 = require("path");
    var os2 = require("os");
    var crypto2 = require("crypto");
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
            if (fs2.existsSync(filepath)) {
              possibleVaultPath = filepath.endsWith(".vault") ? filepath : `${filepath}.vault`;
            }
          }
        } else {
          possibleVaultPath = options.path.endsWith(".vault") ? options.path : `${options.path}.vault`;
        }
      } else {
        possibleVaultPath = path2.resolve(process.cwd(), ".env.vault");
      }
      if (fs2.existsSync(possibleVaultPath)) {
        return possibleVaultPath;
      }
      return null;
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path2.join(os2.homedir(), envPath.slice(1)) : envPath;
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
      const dotenvPath = path2.resolve(process.cwd(), ".env");
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
      for (const path3 of optionPaths) {
        try {
          const parsed = DotenvModule.parse(fs2.readFileSync(path3, { encoding }));
          DotenvModule.populate(parsedAll, parsed, options);
        } catch (e) {
          if (debug) {
            _debug(`Failed to load ${path3} ${e.message}`);
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
        const aesgcm = crypto2.createDecipheriv("aes-256-gcm", key, nonce);
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
    module2.exports.configDotenv = DotenvModule.configDotenv;
    module2.exports._configVault = DotenvModule._configVault;
    module2.exports._parseVault = DotenvModule._parseVault;
    module2.exports.config = DotenvModule.config;
    module2.exports.decrypt = DotenvModule.decrypt;
    module2.exports.parse = DotenvModule.parse;
    module2.exports.populate = DotenvModule.populate;
    module2.exports = DotenvModule;
  }
});

// node_modules/dotenv/lib/env-options.js
var require_env_options = __commonJS({
  "node_modules/dotenv/lib/env-options.js"(exports2, module2) {
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
    module2.exports = options;
  }
});

// node_modules/dotenv/lib/cli-options.js
var require_cli_options = __commonJS({
  "node_modules/dotenv/lib/cli-options.js"(exports2, module2) {
    var re = /^dotenv_config_(encoding|path|debug|override|DOTENV_KEY)=(.+)$/;
    module2.exports = function optionMatcher(args) {
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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  BAS: () => BAS,
  CommunitySchema: () => CommunitySchema,
  CommunitySchemaUID: () => CommunitySchemaUID,
  FollowSchema: () => FollowSchema,
  FollowSchemaUID: () => FollowSchemaUID,
  FollowedSchema: () => FollowedSchema,
  FollowedSchemaUID: () => FollowedSchemaUID,
  GreenFieldClientTS: () => GreenFieldClientTS,
  JoinSchema: () => JoinSchema,
  JoinSchemaUID: () => JoinSchemaUID,
  JoinedSchema: () => JoinedSchema,
  JoinedSchemaUID: () => JoinedSchemaUID,
  OspDataType: () => OspDataType,
  OspDataTypeMap: () => OspDataTypeMap,
  OspSchemaMap: () => OspSchemaMap,
  ProfileSchema: () => ProfileSchema,
  ProfileSchemaUID: () => ProfileSchemaUID,
  SchemaEncoder: () => SchemaEncoder3,
  createObjectAttestOSP: () => createObjectAttestOSP,
  createObjectMulAttestOSP: () => createObjectMulAttestOSP,
  encodeAddrToBucketName: () => encodeAddrToBucketName,
  encodeCommunityData: () => encodeCommunityData,
  encodeFollowData: () => encodeFollowData,
  encodeFollowedData: () => encodeFollowedData,
  encodeJoinData: () => encodeJoinData,
  encodeJoinedData: () => encodeJoinedData,
  encodeProfileData: () => encodeProfileData,
  getAllSps: () => getAllSps,
  getAttestParamsOffChain: () => getAttestParamsOffChain,
  getAttestationBAS: () => getAttestationBAS,
  getAttestationOffChain: () => getAttestationOffChain,
  getAttestationRequestData: () => getAttestationRequestData,
  getDeployer: () => getDeployer,
  getKmsSigner: () => getKmsSigner,
  getMulAttestParams: () => getMulAttestParams,
  getOffchainUIDBAS: () => getOffchainUIDBAS,
  getSchemaByUID: () => getSchemaByUID,
  getSigatureByDelegation: () => getSigatureByDelegation,
  getSps: () => getSps,
  getbBundleUID: () => getbBundleUID,
  handleOspRequestData: () => handleOspRequestData,
  handleOspRequestPrepareOffChain: () => handleOspRequestPrepareOffChain,
  initEAS: () => initEAS,
  multiAttestBASOffChain: () => multiAttestBASOffChain,
  multiAttestBASOnChain: () => multiAttestBASOnChain,
  multiAttestBasUploadGreenField: () => multiAttestBasUploadGreenField,
  multiAttestBasUploadGreenField_String: () => multiAttestBasUploadGreenField_String,
  oneAttestBasUploadGreenField: () => oneAttestBasUploadGreenField,
  registerSchema: () => registerSchema,
  selectSp: () => selectSp,
  serializeJsonString: () => serializeJsonString
});
module.exports = __toCommonJS(src_exports);

// src/schema/register.ts
var import_eas_sdk = require("@ethereum-attestation-service/eas-sdk");
var initEAS = (provider, BASContractAddress) => {
  const bas = new import_eas_sdk.EAS(BASContractAddress);
  bas.connect(provider);
};
var registerSchema = (signer, schemaRegistryAddress, params) => __async(void 0, null, function* () {
  const schemaRegistry = new import_eas_sdk.SchemaRegistry(schemaRegistryAddress);
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
  const schemaRegistry = new import_eas_sdk.SchemaRegistry(schemaRegistryAddress);
  schemaRegistry.connect(provider);
  const schemaRecord = yield schemaRegistry.getSchema({ uid: schemaUID });
  return schemaRecord;
});

// src/attestation/createAttestation.ts
var import_eas_sdk3 = require("@ethereum-attestation-service/eas-sdk");

// src/attestation/encodedOspData.ts
var import_eas_sdk2 = require("@ethereum-attestation-service/eas-sdk");
var OspDataType = /* @__PURE__ */ ((OspDataType2) => {
  OspDataType2[OspDataType2["None"] = 0] = "None";
  OspDataType2[OspDataType2["Profile"] = 1] = "Profile";
  OspDataType2[OspDataType2["Follow"] = 2] = "Follow";
  OspDataType2[OspDataType2["Followed"] = 3] = "Followed";
  OspDataType2[OspDataType2["Community"] = 4] = "Community";
  OspDataType2[OspDataType2["Join"] = 5] = "Join";
  OspDataType2[OspDataType2["Joined"] = 6] = "Joined";
  return OspDataType2;
})(OspDataType || {});
var ProfileSchemaUID = "0x7c90370dcf194ce4c2851abec14da05abd98d8860ae7147ac714755430d42f6e";
var FollowSchemaUID = "0xc21ba57124d1c884e89d561c9ba60a80a98733d2553d000d06cc5a98a0534b11";
var FollowedSchemaUID = "0xa0d8de56036149d7613854b8e58ce2bcc402cd065bae55a96d7a5f86095d5221";
var CommunitySchemaUID = "0x18c1dbf9c1a1c6a64b661c23110116f80b7d6897839334b724ea2a46056bee94";
var JoinSchemaUID = "0x15ce785a4cd0951c813f27917308bb632162855f33d4a93b3bf05e35a70c8510";
var JoinedSchemaUID = "0xe1685d5f5e58134cbcd44a1f3250027c2192a2c9552cb1fbe048ad3e6e999ed6";
var OspDataTypeMap = /* @__PURE__ */ new Map([
  [1 /* Profile */, ProfileSchemaUID],
  [2 /* Follow */, FollowSchemaUID],
  [3 /* Followed */, FollowedSchemaUID],
  [4 /* Community */, CommunitySchemaUID],
  [5 /* Join */, JoinSchemaUID],
  [6 /* Joined */, JoinedSchemaUID]
]);
var ProfileSchema = "bytes32 createProfileTx, address profileOwner, uint256 profileId, string handle";
var FollowSchema = "bytes32 followTx, address follower, address followedAddress, uint256 followedProfileId";
var FollowedSchema = "bytes32 followTx, string type, address follower, address followedAddress, uint256 followedProfileId";
var CommunitySchema = "bytes32 createCommunityTx, address communityOwner, uint256 communityId, string handle, address joinNFT";
var JoinSchema = "bytes32 joinTx, address joiner, uint256 communityId, address communityOwner";
var JoinedSchema = "bytes32 joinTx, string type, address joiner, uint256 communityId, address communityOwner";
var OspSchemaMap = /* @__PURE__ */ new Map([
  [1 /* Profile */, ProfileSchema],
  [2 /* Follow */, FollowSchema],
  [3 /* Followed */, FollowedSchema],
  [4 /* Community */, CommunitySchema],
  [5 /* Join */, JoinSchema],
  [6 /* Joined */, JoinedSchema]
]);
var encodeFollowData = (param) => {
  const schemaEncoder = new import_eas_sdk2.SchemaEncoder(FollowSchema);
  return schemaEncoder.encodeData([
    { name: "followTx", value: param.followTx, type: "bytes32" },
    { name: "follower", value: param.follower, type: "address" },
    { name: "followedAddress", value: param.followedAddress, type: "address" },
    { name: "followedProfileId", value: param.followedProfileId, type: "uint256" }
  ]);
};
var encodeFollowedData = (param) => {
  const schemaEncoder = new import_eas_sdk2.SchemaEncoder(FollowedSchema);
  return schemaEncoder.encodeData([
    { name: "followTx", value: param.followTx, type: "bytes32" },
    { name: "type", value: "followed", type: "string" },
    { name: "follower", value: param.follower, type: "address" },
    { name: "followedAddress", value: param.followedAddress, type: "address" },
    { name: "followedProfileId", value: param.followedProfileId, type: "uint256" }
  ]);
};
var encodeProfileData = (param) => {
  const schemaEncoder = new import_eas_sdk2.SchemaEncoder(ProfileSchema);
  return schemaEncoder.encodeData([
    { name: "createProfileTx", value: param.createProfileTx, type: "bytes32" },
    { name: "profileOwner", value: param.profileOwner, type: "address" },
    { name: "profileId", value: param.profileId, type: "uint256" },
    { name: "handle", value: param.handle, type: "string" }
  ]);
};
var encodeCommunityData = (param) => {
  const schemaEncoder = new import_eas_sdk2.SchemaEncoder(CommunitySchema);
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
  const schemaEncoder = new import_eas_sdk2.SchemaEncoder(JoinSchema);
  const encodedData = schemaEncoder.encodeData([
    { name: "joinTx", value: param.joinTx, type: "bytes32" },
    { name: "joiner", value: param.joiner, type: "address" },
    { name: "communityId", value: param.communityId, type: "uint256" },
    { name: "communityOwner", value: param.communityOwner, type: "address" }
  ]);
  return encodedData;
};
var encodeJoinedData = (param) => {
  const schemaEncoder = new import_eas_sdk2.SchemaEncoder(JoinedSchema);
  const encodedData = schemaEncoder.encodeData([
    { name: "joinTx", value: param.joinTx, type: "bytes32" },
    { name: "type", value: "joined", type: "string" },
    { name: "joiner", value: param.joiner, type: "address" },
    { name: "communityId", value: param.communityId, type: "uint256" },
    { name: "communityOwner", value: param.communityOwner, type: "address" }
  ]);
  return encodedData;
};

// src/greenfield/utils.ts
var import_ethers = require("ethers");
var import_crypto = __toESM(require("crypto"));
var encodeAddrToBucketName = (addr) => {
  return `bas-${(0, import_ethers.hashMessage)((0, import_ethers.getAddress)(addr)).substring(2, 42)}`;
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
function serializeJsonString(data) {
  return JSON.stringify(data, (key, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  });
}
function getOffchainUIDBAS(version, schema, recipient, time, expirationTime, revocable, refUID, data) {
  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
  return import_ethers.ethers.solidityPackedKeccak256(
    [
      "uint16",
      "bytes",
      "address",
      "address",
      "uint64",
      "uint64",
      "bool",
      "bytes32",
      "bytes",
      "uint32"
    ],
    [
      version,
      schema,
      recipient,
      ZERO_ADDRESS,
      time,
      expirationTime,
      revocable,
      refUID,
      data,
      0
    ]
  );
}
function getAttestationBAS(signer, attestation) {
  return __async(this, null, function* () {
    attestation.types = {
      Attest: [
        { name: "version", type: "uint16" },
        { name: "schema", type: "bytes32" },
        { name: "recipient", type: "address" },
        { name: "time", type: "uint64" },
        { name: "expirationTime", type: "uint64" },
        { name: "revocable", type: "bool" },
        { name: "refUID", type: "bytes32" },
        { name: "data", type: "bytes" },
        { name: "nonce", type: "uint64" }
      ]
    };
    attestation.domain.name = "BAS Attestation";
    const signature = yield signer.signTypedData(
      attestation.domain,
      attestation.types,
      attestation.message
    );
    const new_signature = {
      v: import_ethers.Signature.from(signature).v,
      r: import_ethers.Signature.from(signature).r,
      s: import_ethers.Signature.from(signature).s
    };
    attestation.signature = new_signature;
    const uid = getOffchainUIDBAS(
      attestation.message.version,
      attestation.message.schema,
      attestation.message.recipient,
      attestation.message.time,
      attestation.message.expirationTime,
      attestation.message.revocable,
      attestation.message.refUID,
      attestation.message.data
    );
    attestation.uid = uid;
    return attestation;
  });
}
function getbBundleUID(attestationUIDs) {
  attestationUIDs.sort();
  const rr = attestationUIDs.join("");
  return sha256(rr);
}
function sha256(input) {
  const hash = import_crypto.default.createHash("sha256");
  hash.update(input);
  return "0x" + hash.digest("hex");
}

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
    const bas = new import_eas_sdk3.EAS(basAddress);
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
  const offchain = yield new import_eas_sdk3.EAS(process.env.BAS_ADDRESS_BNB).connect(signer).getOffchain();
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
      const attestation_new = yield getAttestationBAS(signer, attestation);
      attestations.push(attestation_new);
    }
    return attestations;
  } catch (error) {
    console.log(error);
    return null;
  }
});

// src/greenfield/create.ts
var import_greenfield_js_sdk = require("@bnb-chain/greenfield-js-sdk");
var import_reed_solomon = require("@bnb-chain/reed-solomon");
var rs = new import_reed_solomon.ReedSolomon();
var GreenFieldClientTS = class {
  /**
   * @param url greenfield rpc url
   * @param chainId greenfield chainId
   * @param creator creator address
   */
  constructor(url, chainId, creator) {
    // chainId = null;
    this.address = null;
    this.client = import_greenfield_js_sdk.Client.create(url, chainId);
    this.address = creator;
  }
  /**
   * create bucket
   * @param bucketName bucket name
   * @param privateKey creator private key
   * @returns boolean
   */
  createBucket(bucketName, privateKey) {
    return __async(this, null, function* () {
      const spInfo = yield selectSp(this.client);
      if (!privateKey.startsWith("0x")) {
        privateKey = "0x" + privateKey;
      }
      try {
        const bucketMeta = yield this.client.bucket.getBucketMeta({ bucketName });
        return true;
      } catch (error) {
      }
      let res;
      try {
        const createBucketTx = yield this.client.bucket.createBucket({
          bucketName,
          creator: this.address,
          visibility: import_greenfield_js_sdk.VisibilityType.VISIBILITY_TYPE_PUBLIC_READ,
          chargedReadQuota: import_greenfield_js_sdk.Long.fromString("0"),
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
        return true;
      } catch (error) {
      }
      return false;
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
      try {
        console.log("trying...");
        const createObjectTx = yield this.client.object.createObject({
          bucketName,
          objectName: fileName,
          creator: this.address,
          visibility: isPrivate ? import_greenfield_js_sdk.VisibilityType.VISIBILITY_TYPE_PRIVATE : import_greenfield_js_sdk.VisibilityType.VISIBILITY_TYPE_PUBLIC_READ,
          contentType: "Document",
          redundancyType: import_greenfield_js_sdk.RedundancyType.REDUNDANCY_EC_TYPE,
          payloadSize: import_greenfield_js_sdk.Long.fromInt(fileBuffer.byteLength),
          expectChecksums: expectCheckSums.map((x) => (0, import_greenfield_js_sdk.bytesFromBase64)(x))
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
        console.log("uploadRes", uploadRes);
        if (uploadRes.code === 0) {
          return transactionHash;
        }
      } catch (error) {
        console.log(error);
      }
      return null;
    });
  }
  createObjectByBundle(bucketName, fileName, bundleBuffer, privateKey, isPrivate = false) {
    return __async(this, null, function* () {
      if (!privateKey.startsWith("0x")) {
        privateKey = "0x" + privateKey;
      }
      const expectCheckSums = rs.encode(Uint8Array.from(bundleBuffer));
      try {
        console.log("trying...");
        const createObjectTx = yield this.client.object.createObject({
          bucketName,
          objectName: fileName,
          creator: this.address,
          visibility: isPrivate ? import_greenfield_js_sdk.VisibilityType.VISIBILITY_TYPE_PRIVATE : import_greenfield_js_sdk.VisibilityType.VISIBILITY_TYPE_PUBLIC_READ,
          contentType: "Document",
          redundancyType: import_greenfield_js_sdk.RedundancyType.REDUNDANCY_EC_TYPE,
          payloadSize: import_greenfield_js_sdk.Long.fromInt(bundleBuffer.byteLength),
          expectChecksums: expectCheckSums.map((x) => (0, import_greenfield_js_sdk.bytesFromBase64)(x))
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
        const uploadRes = yield this.client.object.uploadObject(
          {
            bucketName,
            objectName: fileName,
            body: createFile(fileName, bundleBuffer),
            txnHash: transactionHash
          },
          // highlight-start
          {
            type: "ECDSA",
            privateKey
          }
          // highlight-end
        );
        console.log("uploadRes", uploadRes);
        if (uploadRes.code === 0) {
          return transactionHash;
        }
      } catch (error) {
        console.log(error);
        return null;
      }
      return null;
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
      if (!privateKey.startsWith("0x")) {
        privateKey = "0x" + privateKey;
      }
      const fileBuffer = Buffer.from(attestations);
      const expectCheckSums = rs.encode(Uint8Array.from(fileBuffer));
      const createObjectTx = yield this.client.object.createObject({
        bucketName,
        objectName: fileName,
        creator: this.address,
        visibility: isPrivate ? import_greenfield_js_sdk.VisibilityType.VISIBILITY_TYPE_PRIVATE : import_greenfield_js_sdk.VisibilityType.VISIBILITY_TYPE_PUBLIC_READ,
        contentType: "json",
        redundancyType: import_greenfield_js_sdk.RedundancyType.REDUNDANCY_EC_TYPE,
        payloadSize: import_greenfield_js_sdk.Long.fromInt(fileBuffer.byteLength),
        expectChecksums: expectCheckSums.map((x) => (0, import_greenfield_js_sdk.bytesFromBase64)(x))
      });
      const simulateInfo = yield createObjectTx.simulate({
        denom: "BNB"
      });
      try {
        const { transactionHash } = yield createObjectTx.broadcast({
          denom: "BNB",
          gasLimit: Number(simulateInfo.gasLimit),
          gasPrice: simulateInfo.gasPrice,
          payer: this.address,
          granter: "",
          privateKey
        });
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
          return transactionHash;
        }
      } catch (error) {
        return null;
      }
      return null;
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

// src/bundle/bundle.ts
var import_buffer = require("buffer");
var fs = __toESM(require("fs"));
var path = __toESM(require("path"));
var os = __toESM(require("os"));

// src/bundle/proto/meta.ts
var pb_1 = __toESM(require("google-protobuf"));
var _one_of_decls;
var _ObjectMeta = class _ObjectMeta extends pb_1.Message {
  constructor(data) {
    super();
    __privateAdd(this, _one_of_decls, []);
    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __privateGet(this, _one_of_decls));
    if (!Array.isArray(data) && typeof data == "object") {
      if ("name" in data && data.name != void 0) {
        this.name = data.name;
      }
      if ("offset" in data && data.offset != void 0) {
        this.offset = data.offset;
      }
      if ("size" in data && data.size != void 0) {
        this.size = data.size;
      }
      if ("hash_algo" in data && data.hash_algo != void 0) {
        this.hash_algo = data.hash_algo;
      }
      if ("hash" in data && data.hash != void 0) {
        this.hash = data.hash;
      }
      if ("content_type" in data && data.content_type != void 0) {
        this.content_type = data.content_type;
      }
      if ("tags" in data && data.tags != void 0) {
        this.tags = data.tags;
      }
    }
    if (!this.tags)
      this.tags = /* @__PURE__ */ new Map();
  }
  get name() {
    return pb_1.Message.getFieldWithDefault(this, 1, "");
  }
  set name(value) {
    pb_1.Message.setField(this, 1, value);
  }
  get offset() {
    return pb_1.Message.getFieldWithDefault(this, 2, 0);
  }
  set offset(value) {
    pb_1.Message.setField(this, 2, value);
  }
  get size() {
    return pb_1.Message.getFieldWithDefault(this, 3, 0);
  }
  set size(value) {
    pb_1.Message.setField(this, 3, value);
  }
  get hash_algo() {
    return pb_1.Message.getFieldWithDefault(this, 4, 0 /* Unknown */);
  }
  set hash_algo(value) {
    pb_1.Message.setField(this, 4, value);
  }
  get hash() {
    return pb_1.Message.getFieldWithDefault(this, 5, new Uint8Array(0));
  }
  set hash(value) {
    pb_1.Message.setField(this, 5, value);
  }
  get content_type() {
    return pb_1.Message.getFieldWithDefault(this, 6, "");
  }
  set content_type(value) {
    pb_1.Message.setField(this, 6, value);
  }
  get tags() {
    return pb_1.Message.getField(this, 7);
  }
  set tags(value) {
    pb_1.Message.setField(this, 7, value);
  }
  static fromObject(data) {
    const message = new _ObjectMeta({});
    if (data.name != null) {
      message.name = data.name;
    }
    if (data.offset != null) {
      message.offset = data.offset;
    }
    if (data.size != null) {
      message.size = data.size;
    }
    if (data.hash_algo != null) {
      message.hash_algo = data.hash_algo;
    }
    if (data.hash != null) {
      message.hash = data.hash;
    }
    if (data.content_type != null) {
      message.content_type = data.content_type;
    }
    if (typeof data.tags == "object") {
      message.tags = new Map(Object.entries(data.tags));
    }
    return message;
  }
  toObject() {
    const data = {};
    if (this.name != null) {
      data.name = this.name;
    }
    if (this.offset != null) {
      data.offset = this.offset;
    }
    if (this.size != null) {
      data.size = this.size;
    }
    if (this.hash_algo != null) {
      data.hash_algo = this.hash_algo;
    }
    if (this.hash != null) {
      data.hash = this.hash;
    }
    if (this.content_type != null) {
      data.content_type = this.content_type;
    }
    if (this.tags != null) {
      data.tags = Object.fromEntries(this.tags);
    }
    return data;
  }
  serialize(w) {
    const writer = w || new pb_1.BinaryWriter();
    if (this.name.length)
      writer.writeString(1, this.name);
    if (this.offset != 0)
      writer.writeUint64(2, this.offset);
    if (this.size != 0)
      writer.writeUint64(3, this.size);
    if (this.hash_algo != 0 /* Unknown */)
      writer.writeEnum(4, this.hash_algo);
    if (this.hash.length)
      writer.writeBytes(5, this.hash);
    if (this.content_type.length)
      writer.writeString(6, this.content_type);
    for (const [key, value] of this.tags) {
      writer.writeMessage(7, this.tags, () => {
        writer.writeString(1, key);
        writer.writeString(2, value);
      });
    }
    if (!w)
      return writer.getResultBuffer();
  }
  static deserialize(bytes) {
    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new _ObjectMeta();
    while (reader.nextField()) {
      if (reader.isEndGroup())
        break;
      switch (reader.getFieldNumber()) {
        case 1:
          message.name = reader.readString();
          break;
        case 2:
          message.offset = reader.readUint64();
          break;
        case 3:
          message.size = reader.readUint64();
          break;
        case 4:
          message.hash_algo = reader.readEnum();
          break;
        case 5:
          message.hash = reader.readBytes();
          break;
        case 6:
          message.content_type = reader.readString();
          break;
        case 7:
          reader.readMessage(message, () => pb_1.Map.deserializeBinary(message.tags, reader, reader.readString, reader.readString));
          break;
        default:
          reader.skipField();
      }
    }
    return message;
  }
  serializeBinary() {
    return this.serialize();
  }
  static deserializeBinary(bytes) {
    return _ObjectMeta.deserialize(bytes);
  }
};
_one_of_decls = new WeakMap();
var ObjectMeta = _ObjectMeta;
var _one_of_decls2;
var _BundleMeta = class _BundleMeta extends pb_1.Message {
  constructor(data) {
    super();
    __privateAdd(this, _one_of_decls2, []);
    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], __privateGet(this, _one_of_decls2));
    if (!Array.isArray(data) && typeof data == "object") {
      if ("meta" in data && data.meta != void 0) {
        this.meta = data.meta;
      }
    }
  }
  get meta() {
    return pb_1.Message.getRepeatedWrapperField(this, ObjectMeta, 1);
  }
  set meta(value) {
    pb_1.Message.setRepeatedWrapperField(this, 1, value);
  }
  static fromObject(data) {
    const message = new _BundleMeta({});
    if (data.meta != null) {
      message.meta = data.meta.map((item) => ObjectMeta.fromObject(item));
    }
    return message;
  }
  toObject() {
    const data = {};
    if (this.meta != null) {
      data.meta = this.meta.map((item) => item.toObject());
    }
    return data;
  }
  serialize(w) {
    const writer = w || new pb_1.BinaryWriter();
    if (this.meta.length)
      writer.writeRepeatedMessage(1, this.meta, (item) => item.serialize(writer));
    if (!w)
      return writer.getResultBuffer();
  }
  static deserialize(bytes) {
    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new _BundleMeta();
    while (reader.nextField()) {
      if (reader.isEndGroup())
        break;
      switch (reader.getFieldNumber()) {
        case 1:
          reader.readMessage(message.meta, () => pb_1.Message.addToRepeatedWrapperField(message, 1, ObjectMeta.deserialize(reader), ObjectMeta));
          break;
        default:
          reader.skipField();
      }
    }
    return message;
  }
  serializeBinary() {
    return this.serialize();
  }
  static deserializeBinary(bytes) {
    return _BundleMeta.deserialize(bytes);
  }
};
_one_of_decls2 = new WeakMap();
var BundleMeta = _BundleMeta;

// src/bundle/bundle.ts
var Bundle = class _Bundle {
  constructor(options) {
    if (options) {
      this.version = options.version;
      this.metaSize = options.metaSize;
      this.meta = options.meta;
      this.writeFile = options.writeFile;
      this.readFile = options.readFile;
      this.bundleFileName = options.bundleFileName;
    } else {
      this.version = 0 /* V1 */;
      this.metaSize = 0;
      this.meta = { meta: [] };
      this.writeFile = null;
      this.readFile = null;
      this.bundleFileName = "";
    }
    this.dataSize = 0;
    this.finalized = false;
  }
  static newBundle() {
    return __async(this, null, function* () {
      const tempDir = path.join(process.env.TEMP || os.tmpdir(), "tempBundleDir");
      yield fs.promises.mkdir(tempDir, { recursive: true });
      const dir = yield fs.promises.mkdtemp(path.join(tempDir, "tempBundle"));
      const bundleFile = path.join(tempDir, `tempFile-${Date.now()}.tmp`);
      const fd = yield fs.promises.open(bundleFile, "w");
      const readFile = fs.createReadStream(bundleFile);
      const bundle = new _Bundle({
        version: 0 /* V1 */,
        metaSize: 0,
        meta: { meta: [] },
        writeFile: fs.createWriteStream(bundleFile),
        readFile,
        bundleFileName: bundleFile,
        dataSize: 0,
        finalized: false
      });
      return { bundle, fd };
    });
  }
  static newBundleFromFile(path2) {
    return __async(this, null, function* () {
      const bundleFile = yield fs.promises.open(path2, "r");
      const stat = yield fs.promises.stat(path2);
      const dataSize = stat.size;
      const seekPosition = dataSize - (8 + 8);
      const buf = import_buffer.Buffer.alloc(16);
      yield bundleFile.read(buf, seekPosition);
      const version = buf.readBigUInt64BE(8);
      if (version !== BigInt(0 /* V1 */)) {
        throw new Error("Invalid version");
      }
      const metaSize = buf.readBigUInt64BE(0);
      if (metaSize === BigInt(0)) {
        throw new Error("Empty bundle");
      }
      const metaBuf = import_buffer.Buffer.alloc(Number(metaSize));
      yield bundleFile.read(metaBuf, dataSize - (Number(metaSize) + 8 + 8));
      const bundle = new _Bundle({
        version: Number(version),
        metaSize: Number(metaSize),
        meta: { meta: [] },
        writeFile: null,
        readFile: fs.createReadStream(path2),
        bundleFileName: path2,
        dataSize: stat.size,
        finalized: true
      });
      bundle.meta = BundleMeta.deserialize(metaBuf).toObject();
      return bundle;
    });
  }
  appendObject(name, reader, options) {
    return __async(this, null, function* () {
      var _a, _b, _c, _d;
      if (this.finalized) {
        throw new Error("Append not allowed");
      }
      const objMeta = this.getObjectMeta(name);
      if (objMeta) {
        throw new Error("Duplicated name");
      }
      const written = yield new Promise((resolve, reject) => {
        const readerDefault = reader.getReader();
        let totalWritten = 0;
        const readStream = () => __async(this, null, function* () {
          let result = yield readerDefault.read();
          while (!result.done) {
            try {
              this.writeFile.write(result.value);
              totalWritten += result.value.length;
              result = yield readerDefault.read();
            } catch (e) {
              console.error("!!!!!!!!!!");
            }
          }
          if (result.value) {
            this.writeFile.write(result.value);
            totalWritten += result.value.length;
          }
          resolve(totalWritten);
        });
        readStream().catch(reject);
      });
      const objMetaNew = {
        name,
        offset: this.dataSize,
        size: written,
        hash_algo: 0 /* Unknown */,
        hash: new Uint8Array(0),
        content_type: "",
        tags: {}
      };
      if (options) {
        objMetaNew.hash_algo = (_a = options.hashAlgo) != null ? _a : 0 /* Unknown */;
        objMetaNew.hash = (_b = options.hash) != null ? _b : new Uint8Array(0);
        objMetaNew.content_type = (_c = options.contentType) != null ? _c : "";
        objMetaNew.tags = (_d = options.tags) != null ? _d : {};
      }
      this.dataSize += written;
      this.meta.meta.push(objMetaNew);
      return objMetaNew;
    });
  }
  getObjectMeta(name) {
    return this.meta.meta.find((objMeta) => objMeta.name === name) || null;
  }
  getBundledObject() {
    return fs.createReadStream(this.bundleFileName);
  }
  finalizeBundle() {
    return __async(this, null, function* () {
      if (this.finalized) {
        throw new Error("Bundle finalized");
      }
      if (this.dataSize === 0) {
        throw new Error("Empty bundle");
      }
      let metaData = import_buffer.Buffer.from(BundleMeta.fromObject(this.meta).serialize());
      this.metaSize = metaData.length;
      const buf = import_buffer.Buffer.alloc(16);
      buf.writeBigUInt64BE(BigInt(this.metaSize), 0);
      buf.writeBigUInt64BE(BigInt(this.version), 8);
      metaData = import_buffer.Buffer.concat([metaData, buf]);
      this.writeFile.write(metaData);
      this.dataSize += this.metaSize + 16;
      this.finalized = true;
      return this.getBundledObject();
    });
  }
  close() {
    if (this.writeFile) {
      this.writeFile.close();
    }
    if (this.readFile) {
      this.readFile.close();
    }
  }
  getBundleMetaSize() {
    return this.metaSize;
  }
  getBundleObjectsMeta() {
    return this.meta.meta;
  }
  getBundleSize() {
    return this.dataSize;
  }
  getBundleVersion() {
    return this.version;
  }
};

// src/bundle/utils.ts
function readStreamToBuffer(stream) {
  return __async(this, null, function* () {
    const chunks = [];
    try {
      for (var iter = __forAwait(stream), more, temp, error; more = !(temp = yield iter.next()).done; more = false) {
        const chunk = temp.value;
        chunks.push(Buffer.from(chunk));
      }
    } catch (temp) {
      error = [temp];
    } finally {
      try {
        more && (temp = iter.return) && (yield temp.call(iter));
      } finally {
        if (error)
          throw error[0];
      }
    }
    return Buffer.concat(chunks);
  });
}
function getBundleBuffer(schemaUid, attestations) {
  return __async(this, null, function* () {
    let objs = [];
    let attestationUids = [];
    for (let attestation of attestations) {
      attestationUids.push(attestation.uid);
      objs.push({
        Name: attestation.uid,
        Data: Buffer.from(serializeJsonString(attestation))
      });
    }
    const bundle = yield _getBundle(objs);
    const bundleUid = getbBundleUID(attestationUids);
    const objectName = `bundle.${schemaUid}.` + bundleUid;
    const buffer = yield readStreamToBuffer(bundle);
    console.log(`buffer size is ${buffer.length}`);
    return { objectName, buffer };
  });
}
function bufferToReadableStream(bufferData) {
  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue(bufferData);
      controller.close();
    }
  });
  return readable;
}
function _getBundle(objs) {
  return __async(this, null, function* () {
    const { bundle, fd } = yield Bundle.newBundle();
    yield new Promise((resolve) => setTimeout(resolve, 0));
    try {
      try {
        for (var iter = __forAwait(objs), more, temp, error; more = !(temp = yield iter.next()).done; more = false) {
          const object = temp.value;
          const data = object.Data;
          const readableStream = bufferToReadableStream(data);
          yield bundle.appendObject(object.Name, readableStream);
        }
      } catch (temp) {
        error = [temp];
      } finally {
        try {
          more && (temp = iter.return) && (yield temp.call(iter));
        } finally {
          if (error)
            throw error[0];
        }
      }
      const result = yield bundle.finalizeBundle();
      fd.close();
      return result;
    } catch (err) {
      console.log(err);
    }
    return null;
  });
}

// src/greenfield/createObjectOSP.ts
var client = new GreenFieldClientTS(
  process.env.GREEN_RPC_URL,
  process.env.GREEN_CHAIN_ID,
  process.env.GREEN_PAYMENT_ADDRESS
);
var createObjectAttestOSP = (bucketName, attestation, privateKey, isPrivate = false) => __async(void 0, null, function* () {
  const txHash = yield client.createObject(
    bucketName,
    serializeJsonString(attestation),
    privateKey,
    isPrivate
  );
  return txHash !== null;
});
var createObjectMulAttestOSP = (bucketName, schemaUID, attestations, privateKey, isPrivate = false) => __async(void 0, null, function* () {
  const { objectName, buffer } = yield getBundleBuffer(schemaUID, attestations);
  const txHash = yield client.createObjectByBundle(
    bucketName,
    objectName,
    buffer,
    privateKey,
    isPrivate
  );
  if (txHash === null) {
    return false;
  }
  return true;
});

// src/bas/index.ts
var import_eas_sdk4 = require("@ethereum-attestation-service/eas-sdk");
var BAS = import_eas_sdk4.EAS;
var SchemaEncoder3 = import_eas_sdk4.SchemaEncoder;

// src/bas/offchainAttestations.ts
var import_ethers2 = require("ethers");
var multiAttestBasUploadGreenField = (bucketName, schemaUID, unHandleDatas, isPrivate) => __async(void 0, null, function* () {
  try {
    const privateKey = process.env.GREEN_PAYMENT_PRIVATE_KEY;
    const signer = new import_ethers2.ethers.Wallet(
      privateKey,
      new import_ethers2.ethers.JsonRpcProvider(process.env.BNB_RPC_URL)
    );
    const attestations = yield multiAttestBASOffChain(signer, unHandleDatas);
    const success = yield createObjectMulAttestOSP(
      bucketName,
      schemaUID,
      attestations,
      privateKey,
      isPrivate
    );
    return success;
  } catch (e) {
  }
  return false;
});
var oneAttestBasUploadGreenField = (bucketName, unHandleData, isPrivate) => __async(void 0, null, function* () {
  try {
    const privateKey = process.env.GREEN_PAYMENT_PRIVATE_KEY;
    const signer = new import_ethers2.ethers.Wallet(
      privateKey,
      new import_ethers2.ethers.JsonRpcProvider(process.env.BNB_RPC_URL)
    );
    const attestations = yield multiAttestBASOffChain(signer, [unHandleData]);
    const success = yield createObjectAttestOSP(
      bucketName,
      attestations[0],
      privateKey,
      isPrivate
    );
    return success;
  } catch (e) {
  }
  return false;
});
var multiAttestBasUploadGreenField_String = (bucketName, schemaUID, unHandleDatas, isPrivate) => __async(void 0, null, function* () {
  try {
    const privateKey = process.env.GREEN_PAYMENT_PRIVATE_KEY;
    const signer = new import_ethers2.ethers.Wallet(
      privateKey,
      new import_ethers2.ethers.JsonRpcProvider(process.env.BNB_RPC_URL)
    );
    const attestations = yield multiAttestBASOffChain(
      signer,
      JSON.parse(unHandleDatas)
    );
    const success = yield createObjectMulAttestOSP(
      bucketName,
      schemaUID,
      attestations,
      privateKey,
      isPrivate
    );
    return success;
  } catch (e) {
  }
  return false;
});

// src/kms/kms.ts
var import_ethers_aws_kms_signer = require("@cuonghx.gu-tech/ethers-aws-kms-signer");
var import_ethers3 = require("ethers");
var getDeployer = () => __async(void 0, null, function* () {
  const provider = new import_ethers3.ethers.JsonRpcProvider(process.env.RPC_URL);
  const signer = new import_ethers_aws_kms_signer.AwsKmsSigner(
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
  const signer = new import_ethers_aws_kms_signer.AwsKmsSigner(
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
        followedAddress: data.referencedUserAddress,
        followedProfileId: BigInt(data.referencedProfileId).toString()
      });
      return {
        dataType: 2 /* Follow */,
        requestData: getAttestationRequestData(data.userAddress, encodedData)
      };
    } else if (data.name === "JoinNFTTransferred") {
      const encodedData = encodeJoinData({
        joinTx: data.transactionHash,
        joiner: data.userAddress,
        communityId: BigInt(data.communityId).toString(),
        communityOwner: data.communityOwnerAddress
      });
      return {
        dataType: 5 /* Join */,
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
        dataType: 1 /* Profile */,
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
        dataType: 4 /* Community */,
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
  let handledDatas = new Array();
  if (Number(data.chainId) === chainId || chainId === 0) {
    if (data.name === "FollowSBTTransferred") {
      const followData = {
        followTx: data.transactionHash,
        follower: data.userAddress,
        followedAddress: data.referencedUserAddress,
        followedProfileId: BigInt(data.referencedProfileId).toString()
      };
      const encodedFollowData = encodeFollowData(followData);
      handledDatas.push({
        dataType: 2 /* Follow */,
        requestData: getAttestParamsOffChain(
          2 /* Follow */,
          data.userAddress,
          encodedFollowData
        )
      });
      const encodedFollowedData = encodeFollowedData(followData);
      handledDatas.push({
        dataType: 3 /* Followed */,
        requestData: getAttestParamsOffChain(
          3 /* Followed */,
          data.referencedUserAddress,
          encodedFollowedData
        )
      });
    } else if (data.name === "JoinNFTTransferred") {
      const joinData = {
        joinTx: data.transactionHash,
        joiner: data.userAddress,
        communityId: BigInt(data.communityId).toString(),
        communityOwner: data.communityOwnerAddress
      };
      const encodedJoinData = encodeJoinData(joinData);
      handledDatas.push({
        dataType: 5 /* Join */,
        requestData: getAttestParamsOffChain(
          5 /* Join */,
          data.userAddress,
          encodedJoinData
        )
      });
      const encodedJoinedData = encodeJoinedData(joinData);
      handledDatas.push({
        dataType: 6 /* Joined */,
        requestData: getAttestParamsOffChain(
          6 /* Joined */,
          data.communityOwnerAddress,
          encodedJoinedData
        )
      });
    } else if (data.name === "ProfileCreated") {
      const encodedData = encodeProfileData({
        createProfileTx: data.transactionHash,
        profileOwner: data.userAddress,
        profileId: BigInt(data.profileId).toString(),
        handle: data.handle
      });
      handledDatas.push({
        dataType: 1 /* Profile */,
        requestData: getAttestParamsOffChain(
          1 /* Profile */,
          data.userAddress,
          encodedData
        )
      });
    } else if (data.name === "CommunityCreated") {
      const encodedData = encodeCommunityData({
        createCommunityTx: data.transactionHash,
        communityOwner: data.userAddress,
        communityId: BigInt(data.communityId).toString(),
        handle: data.handle,
        joinNFT: data.joinNFT
      });
      handledDatas.push({
        dataType: 4 /* Community */,
        requestData: getAttestParamsOffChain(
          4 /* Community */,
          data.userAddress,
          encodedData
        )
      });
    }
  } else {
    handledDatas.push({
      dataType: 0 /* None */,
      requestData: null
    });
  }
  return handledDatas;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BAS,
  CommunitySchema,
  CommunitySchemaUID,
  FollowSchema,
  FollowSchemaUID,
  FollowedSchema,
  FollowedSchemaUID,
  GreenFieldClientTS,
  JoinSchema,
  JoinSchemaUID,
  JoinedSchema,
  JoinedSchemaUID,
  OspDataType,
  OspDataTypeMap,
  OspSchemaMap,
  ProfileSchema,
  ProfileSchemaUID,
  SchemaEncoder,
  createObjectAttestOSP,
  createObjectMulAttestOSP,
  encodeAddrToBucketName,
  encodeCommunityData,
  encodeFollowData,
  encodeFollowedData,
  encodeJoinData,
  encodeJoinedData,
  encodeProfileData,
  getAllSps,
  getAttestParamsOffChain,
  getAttestationBAS,
  getAttestationOffChain,
  getAttestationRequestData,
  getDeployer,
  getKmsSigner,
  getMulAttestParams,
  getOffchainUIDBAS,
  getSchemaByUID,
  getSigatureByDelegation,
  getSps,
  getbBundleUID,
  handleOspRequestData,
  handleOspRequestPrepareOffChain,
  initEAS,
  multiAttestBASOffChain,
  multiAttestBASOnChain,
  multiAttestBasUploadGreenField,
  multiAttestBasUploadGreenField_String,
  oneAttestBasUploadGreenField,
  registerSchema,
  selectSp,
  serializeJsonString
});
