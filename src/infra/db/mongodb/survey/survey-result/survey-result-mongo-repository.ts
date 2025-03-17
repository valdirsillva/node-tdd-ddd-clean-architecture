import { SaveSurveyResultParams, SaveSurveyResultRepository, SurveyResultModel } from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result-protocols'
import { MongoHelper } from '../../helpers/mongo-helper'
import { ObjectId } from 'mongodb';
import { response } from 'express';
import { resolve } from 'path';

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
    async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
        const surveyResultCollection = await MongoHelper.getCollection('surveyResults')
        const res = await surveyResultCollection.findOneAndUpdate({
            surveyId: new ObjectId(data.surveyId),
            accountId:  new ObjectId(data.accountId)
        }, {
            $set: {
                answer: data.answer,
                date: data.date
            }
        }, {
            upsert: true,
            returnDocument: "after"
        })

        if (!res.value) {
            throw new Error('Failed to save survey result');
        }

       const response = {
           surveyId: res.value.surveyId.toHexString(),
           question: res.value.question,
           answers: res.value.answer,
           date: res.value.date
       }
       return response
    }
}