import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import env from '../config/env'
import { ObjectId } from 'mongodb'

let surveyCollection: Collection
let accountCollection: Collection

describe('Survey Routes', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL!)
    })

    beforeEach(async () => {
        surveyCollection = await MongoHelper.getCollection('surveys')
        await surveyCollection.deleteMany({})

        accountCollection = await MongoHelper.getCollection('accounts')
        await accountCollection.deleteMany({})
    })

    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('POST /surveys', () => {
        test('Should return 403 on add survey withount accessToken', async () => {
            await request(app)
                .post('/api/surveys')
                .send({
                    question: 'Question',
                    answers: [{
                        answer: 'Answer 1',
                        image: 'http://image-name.com'
                    }, {
                        answer: 'Answer 1',
                    }]
                })
                .expect(403)

        })

        test('Should return 204 on add survey with valid accessToken', async () => {
            const res = await accountCollection.insertOne({
                name: 'Valdir',
                email: 'valdirpiresba@gmail.com',
                password: '123',
                role: 'admin'
            })

            const id = res.insertedId
            const accessToken = sign({ id: res.insertedId.toString() }, env.jwtSecret)

            await accountCollection.updateOne({
                _id: new ObjectId(id)
            }, {
                $set: {
                    accessToken
                }
            })

            // Bug Fix
            await request(app)
                .post('/api/surveys')
                .set('x-access-token', accessToken)
                .send({
                    question: 'Question',
                    answers: [{
                        answer: 'Answer 1',
                        image: 'http://image-name.com'
                    }, {
                        answer: 'Answer 2'
                    }]
                })
                .expect(204)
        })
    })

    describe('GET /surveys', () => {
        test('Should return 403 on load surveys withount accessToken', async () => {
            await request(app)
                .get('/api/surveys')
                .expect(403)
        })

        test('Should return 200 on load surveys with valid accessToken', async () => {
            const res = await accountCollection.insertOne({
                name: 'Valdir',
                email: 'valdirpiresba@gmail.com',
                password: '123',
                role: 'admin'
            })

            const id = res.insertedId
            const accessToken = sign({ id: res.insertedId.toString() }, env.jwtSecret)
            await accountCollection.updateOne({
                _id: id
            }, {
                $set: {
                    accessToken
                }
            })

            await surveyCollection.insertMany([{
                question: 'any_question',
                answers: [{
                    image: 'any_image',
                    answer: 'any_answer'
                }],
                // date: new Date()
            }])

            // await request(app)
            //     .get('/api/surveys')
            //     .set('x-access-token', accessToken)
            //     .expect(200)

        })
    })
})