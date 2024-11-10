import { SaveSurveyResultParams, SaveSurveyResultRepository, SurveyResultModel } from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result-protocols'
import { MongoHelper } from '../../helpers/mongo-helper'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
    async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
        const surveyResultCollection = await MongoHelper.getCollection('surveyResults')
        const res = await surveyResultCollection.findOneAndUpdate({
            surveyId: data.surveyId,
            accountId: data.accountId
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

       const response: SurveyResultModel = {
        id: res.value._id.toHexString(),
        accountId: res.value.accountId,
        surveyId: res.value.surveyId,
        answer: res.value.answer,
        date: res.value.date
       }

       return response
    }
}