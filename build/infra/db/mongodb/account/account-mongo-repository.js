"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountMongoRepository = void 0;
const mongo_helper_1 = require("../helpers/mongo-helper");
const mongodb_1 = require("mongodb");
class AccountMongoRepository {
    async add(accountData) {
        const accountCollection = await mongo_helper_1.MongoHelper.getCollection('accounts');
        const result = await accountCollection.insertOne(accountData);
        return mongo_helper_1.MongoHelper.map(result, accountData);
    }
    async loadByEmail(email) {
        const accountCollection = await mongo_helper_1.MongoHelper.getCollection('accounts');
        const account = await accountCollection.findOne({ email });
        if (account) {
            const { _id, name, password } = account;
            return account && { id: _id.toString(), name, email, password };
        }
    }
    async updateAccessToken(id, token) {
        const accountCollection = await mongo_helper_1.MongoHelper.getCollection('accounts');
        await accountCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { accessToken: token } });
    }
}
exports.AccountMongoRepository = AccountMongoRepository;
