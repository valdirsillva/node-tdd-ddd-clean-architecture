import { SurveyModel } from '@/domain/models/survey'
import { MongoHelper } from '../../helpers/mongo-helper'
import { SurveyResultMongoRepository } from './survey-result-mongo-repository'
import { Collection, ObjectId } from 'mongodb'
import { AccountModel } from '@/domain/models/account'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

const makeSut = (): SurveyResultMongoRepository => {
   return new SurveyResultMongoRepository()
}

const makeSurvey = async (): Promise<SurveyModel> => {
   const response = await surveyCollection.insertOne({
      question: 'any_question',
      answers: [{
         image: 'any_image',
         answer: 'any_answer'
      }, {
         answer: 'other_answer'
      }],
      date: new Date()
   })
   const id = response.insertedId
   const result = await surveyCollection.findOne({ _id: id })
   return {
      id: result._id.toHexString(),
      question: result.question,
      answers: result.answers,
      date: result.date
   }
}

const makeAccount = async (): Promise<AccountModel> => {
   const response = await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
   })
   const id = response.insertedId
   const result = await accountCollection.findOne({ _id: id })
   return {
      id: result._id.toHexString(),
      name: result.name,
      email: result.email,
      password: result.password
   }
}

describe('Survey Mongo Repository', () => {
   beforeAll(async () => {
      await MongoHelper.connect(process.env.MONGO_URL!)
   })

   afterAll(async () => {
      await MongoHelper.disconnect()
   })

   beforeEach(async () => {
      surveyCollection = await MongoHelper.getCollection('surveys')
      await surveyCollection.deleteMany({})
      surveyResultCollection = await MongoHelper.getCollection('surveyResults')
      await surveyResultCollection.deleteMany({})
      accountCollection = await MongoHelper.getCollection('accounts')
      await accountCollection.deleteMany({})
   })

   describe('save()', () => {
      test('Should add a survey result if its new', async () => {
         const survey = await makeSurvey()
         const account = await makeAccount()
         const sut = makeSut()
         const surveyResult = await sut.save({
            surveyId: survey.id,
            accountId: account.id,
            answer: survey.answers[0].answer,
            date: new Date()
         })
         expect(surveyResult).toBeTruthy()
         expect(surveyResult.id).toBeTruthy()
         expect(surveyResult.answer).toBe(survey.answers[0].answer)
      })
   })
})