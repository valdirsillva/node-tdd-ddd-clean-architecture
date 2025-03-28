import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect(uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  },

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close()
      this.client = null
    }
  },

  async getCollection(name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },

  map: (result: any, accountData: any): any => {
    const insertedId = result.insertedId.toString()
    const account = { id: insertedId, ...accountData }
    return account
  },

  mapper: (data: any): any => {
    return data.map((survey: any) => ({
      id: survey._id.toString(),
      question: survey.question,
      answers: survey.answers,
      date: survey.date,
    }))
  },

  mapperItem: (data: any): any => {
    return {
      id: data?._id ? data._id.toString() : null,
      question: data.question,
      answers: data.answers,
      date: data.date,
    }
  }
}