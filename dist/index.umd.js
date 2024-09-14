!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("@ethereum-attestation-service/eas-sdk"),require("@bnb-chain/greenfield-js-sdk"),require("ethers"),require("@bnb-chain/reed-solomon")):"function"==typeof define&&define.amd?define(["exports","@ethereum-attestation-service/eas-sdk","@bnb-chain/greenfield-js-sdk","ethers","@bnb-chain/reed-solomon"],t):t((e||self).ospBasSdk={},e.easSdk,e.greenfieldJsSdk,e.ethers,e.reedSolomon)}(this,function(e,t,r,n,o){var i=function(e){try{return Promise.resolve(e.sp.getStorageProviders()).then(function(e){return(null!=e?e:[]).filter(function(e){return e.endpoint.includes("nodereal")})})}catch(e){return Promise.reject(e)}},s=function(e){return Promise.resolve(i(e)).then(function(e){var t,r=Math.floor(Math.random()*e.length),n=[].concat(e.slice(0,r),e.slice(r+1)).map(function(e){return e.operatorAddress});return{id:e[r].id||0,endpoint:e[r].endpoint,primarySpAddress:null==(t=e[r])?void 0:t.operatorAddress,sealAddress:e[r].sealAddress,secondarySpAddresses:n}})};function c(e,t){try{var r=e()}catch(e){return t(e)}return r&&r.then?r.then(void 0,t):r}var a=new o.ReedSolomon;function u(e,t){return{name:e,type:"",size:t.byteLength,content:t}}e.GreenFieldClientTS=/*#__PURE__*/function(){function e(e,t,n){this.client=void 0,this.address=null,this.client=r.Client.create(e,t),this.address=n}var t=e.prototype;return t.createBucket=function(e,t){try{var n=this;return Promise.resolve(s(n.client)).then(function(o){function i(){var i=c(function(){return Promise.resolve(n.client.bucket.createBucket({bucketName:e,creator:n.address,visibility:r.VisibilityType.VISIBILITY_TYPE_PUBLIC_READ,chargedReadQuota:r.Long.fromString("0"),paymentAddress:n.address,primarySpAddress:o.primarySpAddress})).then(function(e){return Promise.resolve(e.simulate({denom:"BNB"})).then(function(r){return Promise.resolve(e.broadcast({denom:"BNB",gasLimit:Number(null==r?void 0:r.gasLimit),gasPrice:(null==r?void 0:r.gasPrice)||"5000000000",payer:n.address,granter:"",privateKey:t})).then(function(e){console.log("transactionHash",e.transactionHash)})})})},function(e){s||console.log(e)});return i&&i.then?i.then(function(){return s}):s}t.startsWith("0x")||(t="0x"+t);var s=!1,a=c(function(){return Promise.resolve(n.client.bucket.getBucketMeta({bucketName:e})).then(function(e){console.log("bucketMeta",e),s=!0})},function(){});return a&&a.then?a.then(i):i()})}catch(e){return Promise.reject(e)}},t.createObject=function(e,t,n,o){void 0===o&&(o=!1);try{var i=this;console.log("started"),n.startsWith("0x")||(n="0x"+n);var s=JSON.parse(t),c=s.message.schema+"."+s.uid,d=Buffer.from(t),l=a.encode(Uint8Array.from(d));return Promise.resolve(i.client.object.createObject({bucketName:e,objectName:c,creator:i.address,visibility:o?r.VisibilityType.VISIBILITY_TYPE_PRIVATE:r.VisibilityType.VISIBILITY_TYPE_PUBLIC_READ,contentType:"json",redundancyType:r.RedundancyType.REDUNDANCY_EC_TYPE,payloadSize:r.Long.fromInt(d.byteLength),expectChecksums:l.map(function(e){return r.bytesFromBase64(e)})})).then(function(t){return Promise.resolve(t.simulate({denom:"BNB"})).then(function(r){return Promise.resolve(t.broadcast({denom:"BNB",gasLimit:Number(r.gasLimit),gasPrice:r.gasPrice,payer:i.address,granter:"",privateKey:n})).then(function(t){var r=t.transactionHash;return console.log("create object success",r),Promise.resolve(i.client.object.uploadObject({bucketName:e,objectName:c,body:u(c,d),txnHash:r},{type:"ECDSA",privateKey:n})).then(function(e){return 0===e.code&&console.log("upload object success",e),r})})})})}catch(e){return Promise.reject(e)}},e}(),e.createAttestOffChain=function(e,t,r){try{return t.connect(e),Promise.resolve(t.getOffchain()).then(function(t){var n=Math.floor(Date.now()/1e3);return Promise.resolve(t.signOffchainAttestation({recipient:r.recipient,expirationTime:BigInt(0),time:BigInt(n),revocable:!0,version:1,nonce:BigInt(0),schema:r.schemaUID,refUID:r.refUID,data:r.encodedData},e)).then(function(e){return JSON.stringify(e,function(e,t){return"bigint"==typeof t?Number(t).toString():t})})})}catch(e){return Promise.reject(e)}},e.encodeAddrToBucketName=function(e){return"bas-"+n.hashMessage(n.getAddress(e)).substring(2,42)},e.getAllSps=function(e){return Promise.resolve(i(e)).then(function(e){return e.map(function(e){var t;return{address:e.operatorAddress,endpoint:e.endpoint,name:null==(t=e.description)?void 0:t.moniker}})})},e.getSchemaByUID=function(e,r,n){try{var o=new t.SchemaRegistry(r);return o.connect(e),Promise.resolve(o.getSchema({uid:n}))}catch(e){return Promise.reject(e)}},e.getSps=i,e.initEAS=function(e,r){new t.EAS(r).connect(e)},e.registerSchema=function(e,r,n){try{var o=new t.SchemaRegistry(r);return o.connect(e),Promise.resolve(o.register({schema:n.schema,resolverAddress:n.resolverAddress,revocable:n.revocable})).then(function(e){return Promise.resolve(e.wait())})}catch(e){return Promise.reject(e)}},e.selectSp=s});
//# sourceMappingURL=index.umd.js.map
