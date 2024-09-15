import{EAS as e,SchemaRegistry as r,SchemaEncoder as t}from"@ethereum-attestation-service/eas-sdk";import{VisibilityType as n,Long as o,RedundancyType as i,bytesFromBase64 as s,Client as c}from"@bnb-chain/greenfield-js-sdk";import{hashMessage as a,getAddress as u}from"ethers";import{ReedSolomon as d}from"@bnb-chain/reed-solomon";var m=function(r,t){new e(t).connect(r)},l=function(e,t,n){try{var o=new r(t);return o.connect(e),Promise.resolve(o.register({schema:n.schema,resolverAddress:n.resolverAddress,revocable:n.revocable})).then(function(e){return Promise.resolve(e.wait())})}catch(e){return Promise.reject(e)}},f=function(e,t,n){try{var o=new r(t);return o.connect(e),Promise.resolve(o.getSchema({uid:n}))}catch(e){return Promise.reject(e)}},h=function(e,r,t){try{return r.connect(e),Promise.resolve(r.getOffchain()).then(function(r){var n=Math.floor(Date.now()/1e3);return Promise.resolve(r.signOffchainAttestation({recipient:t.recipient,expirationTime:BigInt(0),time:BigInt(n),revocable:!0,version:1,nonce:BigInt(0),schema:t.schemaUID,refUID:t.refUID,data:t.encodedData},e)).then(function(e){return JSON.stringify(e,function(e,r){return"bigint"==typeof r?Number(r).toString():r})})})}catch(e){return Promise.reject(e)}},v=function(e){return"bas-"+a(u(e)).substring(2,42)},p=function(e){try{return Promise.resolve(e.sp.getStorageProviders()).then(function(e){return(null!=e?e:[]).filter(function(e){return e.endpoint.includes("nodereal")})})}catch(e){return Promise.reject(e)}},g=function(e){return Promise.resolve(p(e)).then(function(e){return e.map(function(e){var r;return{address:e.operatorAddress,endpoint:e.endpoint,name:null==(r=e.description)?void 0:r.moniker}})})},b=function(e){return Promise.resolve(p(e)).then(function(e){var r,t=Math.floor(Math.random()*e.length),n=[].concat(e.slice(0,t),e.slice(t+1)).map(function(e){return e.operatorAddress});return{id:e[t].id||0,endpoint:e[t].endpoint,primarySpAddress:null==(r=e[t])?void 0:r.operatorAddress,sealAddress:e[t].sealAddress,secondarySpAddresses:n}})};function P(e,r){try{var t=e()}catch(e){return r(e)}return t&&t.then?t.then(void 0,r):t}var y=new d,I=/*#__PURE__*/function(){function e(e,r,t){this.client=void 0,this.address=null,this.client=c.create(e,r),this.address=t}var r=e.prototype;return r.createBucket=function(e,r){try{var t=this;return Promise.resolve(b(t.client)).then(function(i){function s(){var s=P(function(){return Promise.resolve(t.client.bucket.createBucket({bucketName:e,creator:t.address,visibility:n.VISIBILITY_TYPE_PUBLIC_READ,chargedReadQuota:o.fromString("0"),paymentAddress:t.address,primarySpAddress:i.primarySpAddress})).then(function(e){return Promise.resolve(e.simulate({denom:"BNB"})).then(function(n){return Promise.resolve(e.broadcast({denom:"BNB",gasLimit:Number(null==n?void 0:n.gasLimit),gasPrice:(null==n?void 0:n.gasPrice)||"5000000000",payer:t.address,granter:"",privateKey:r})).then(function(e){console.log("transactionHash",e.transactionHash)})})})},function(e){c||console.log(e)});return s&&s.then?s.then(function(){return c}):c}r.startsWith("0x")||(r="0x"+r);var c=!1,a=P(function(){return Promise.resolve(t.client.bucket.getBucketMeta({bucketName:e})).then(function(e){console.log("bucketMeta",e),c=!0})},function(){});return a&&a.then?a.then(s):s()})}catch(e){return Promise.reject(e)}},r.createObject=function(e,r,t,c){void 0===c&&(c=!1);try{var a=this;console.log("started"),t.startsWith("0x")||(t="0x"+t);var u=JSON.parse(r),d=u.message.schema+"."+u.uid,m=Buffer.from(r),l=y.encode(Uint8Array.from(m));return Promise.resolve(a.client.object.createObject({bucketName:e,objectName:d,creator:a.address,visibility:c?n.VISIBILITY_TYPE_PRIVATE:n.VISIBILITY_TYPE_PUBLIC_READ,contentType:"json",redundancyType:i.REDUNDANCY_EC_TYPE,payloadSize:o.fromInt(m.byteLength),expectChecksums:l.map(function(e){return s(e)})})).then(function(r){return Promise.resolve(r.simulate({denom:"BNB"})).then(function(n){return Promise.resolve(r.broadcast({denom:"BNB",gasLimit:Number(n.gasLimit),gasPrice:n.gasPrice,payer:a.address,granter:"",privateKey:t})).then(function(r){var n=r.transactionHash;return console.log("create object success",n),Promise.resolve(a.client.object.uploadObject({bucketName:e,objectName:d,body:B(d,m),txnHash:n},{type:"ECDSA",privateKey:t})).then(function(e){return 0===e.code&&console.log("upload object success",e),n})})})})}catch(e){return Promise.reject(e)}},e}();function B(e,r){return{name:e,type:"",size:r.byteLength,content:r}}var A=e,j=t;export{A as BAS,I as GreenFieldClientTS,j as SchemaEncoder,h as createAttestOffChain,v as encodeAddrToBucketName,g as getAllSps,f as getSchemaByUID,p as getSps,m as initEAS,l as registerSchema,b as selectSp};
//# sourceMappingURL=index.module.js.map
