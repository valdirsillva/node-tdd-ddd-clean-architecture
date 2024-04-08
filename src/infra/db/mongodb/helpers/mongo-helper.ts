import { Collection, MongoClient } from 'mongodb'
import { AccountModel } from '../../../../domain/models/account'

export const MongoHelper = {
    client: null as MongoClient,

    async connect(uri: string): Promise<void> {
        this.client = await MongoClient.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    },

    async disconnect(): Promise<void> {
        await this.client.close()
    },

    getCollection(name: string): Collection {
        return this.client.db().collection(name)
    },

    map: (result: any, accountData: any): any => {
        const insertedId = result.insertedId.toString()
        const account = { id: insertedId, ...accountData }
        return account
    }
}