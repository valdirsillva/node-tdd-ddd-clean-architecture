"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_helper_1 = require("./mongo-helper");
describe('Mongo Help', () => {
    beforeAll(async () => {
        await mongo_helper_1.MongoHelper.connect(process.env.MONGO_URL);
    });
    afterAll(async () => {
        await mongo_helper_1.MongoHelper.disconnect();
    });
    test('Should reconnect if mongodb is down', async () => {
        let accountCollection = await mongo_helper_1.MongoHelper.getCollection('accounts');
        expect(accountCollection).toBeTruthy();
        await mongo_helper_1.MongoHelper.disconnect();
        accountCollection = await mongo_helper_1.MongoHelper.getCollection('accounts');
        expect(accountCollection).toBeTruthy();
    });
});
