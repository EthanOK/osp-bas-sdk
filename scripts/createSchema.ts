import {SchemaRegistry} from "@ethereum-attestation-service/eas-sdk";
import {ethers, solidityPackedKeccak256} from "ethers";
import "dotenv/config"
const createProfileSchema = "bytes32 createProfileTx, address profileOwner, uint256 profileId, string handle"
const followSchema = "bytes32 followTx, address follower, address followedAddress, uint256 followedProfileId"
const followedSchema = "bytes32 followTx, string type, address follower, address followedAddress, uint256 followedProfileId"
const createCommunitySchema = "bytes32 createCommunityTx, address communityOwner, uint256 communityId, string handle, address joinNFT"
const joinSchema = "bytes32 joinTx, address joiner, uint256 communityId, address communityOwner"
const joinedSchema = "bytes32 joinTx, string type, address joiner, uint256 communityId, address communityOwner"

const schemas = [createProfileSchema, followSchema, followedSchema, createCommunitySchema, joinSchema, joinedSchema]
const schemaRegistry = new SchemaRegistry(process.env.SCHEMA_REGISTRY_OPBNB)

const wallet = new ethers.Wallet(process.env.GREEN_PAYMENT_PRIVATE_KEY, ethers.getDefaultProvider(process.env.OPBNB_RPC_URL))
schemaRegistry.connect(wallet)
async function main() {
    for (let i = 0; i < schemas.length; i++) {
        const schema = schemas[i]
        try {
            const schemaRecord = await schemaRegistry.getSchema({uid: getSchemaId(schema)})
            console.log("registryed schema", schemaRecord.schema, schemaRecord.uid)
        } catch (e) {
            console.error(e)
            console.log("registrying..")
            const tx = await schemaRegistry.register({
                schema,
                resolverAddress: ethers.ZeroAddress,
                revocable: true
            })
            console.log("registry tx:", tx)
        }
    }
}
main()

function getSchemaId(schema: string): string {
    return solidityPackedKeccak256(['string', 'address', 'bool'], [schema, ethers.ZeroAddress, true]);
}