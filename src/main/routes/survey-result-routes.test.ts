import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

let surveyCollection: Collection
let accountCollection: Collection

const makeAcessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'Valdir',
    email: 'valdirpiresba@gmail.com',
    password: '123',
  })
  const id = res.insertedId.toString()
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne({
    _id: res.insertedId
  }, {
    $set: {
      accessToken
    }
  })
  return accessToken
}

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL!)
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})

    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})

  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('PUT /surveys/:surveyId/results', () => {
    test('Should return 403 on save survey result withount accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({ answer: 'any_answer' })
        .expect(403)
    })

    test('Should return 200 on save survey result with accessToken', async () => {
      const accessToken = await makeAcessToken()
      const res = await surveyCollection.insertOne({
        question: 'Question',
        answers: [{
          answer: 'Answer 1',
          image: 'http://image-name.com'
        }, {
          answer: 'Answer 2'
        }],
        date: new Date()
      })
      const id = res.insertedId.toString()
      await request(app)
        .put(`/api/surveys/${id}/results`)
        .set('x-access-token', accessToken)
        .send({ answer: 'Answer 1' })
        .expect(200)
    })
  })

  describe('GET /surveys/:surveyId/results', () => {
    test('Should return 403 on load survey result withount accessToken', async () => {
      await request(app)
        .get('/api/surveys/any_id/results')
        .expect(403)
    })
  })
})