import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadSurveyById, SaveSurveyResult } from './save-survey-result-controller-protocols'
import { InvalidParamError } from '@/presentation/errors'

export class SaveSurveyResultController implements Controller {
    constructor(
        private readonly loadSurveyById: LoadSurveyById,
        private readonly saveSurveyResult: SaveSurveyResult
    ) { }

    async handle(httpRequest: SaveSurveyResultController.Request): Promise<HttpResponse> {
        try {
            const { surveyId, answer, accountId } = httpRequest
            const survey = await this.loadSurveyById.loadById(surveyId)

            if (!survey) {
                return forbidden(new InvalidParamError('surveyId'))
            }

            const answers = survey.answers.map(a => a.answer)
            if (!answers.includes(answer)) {
                return forbidden(new InvalidParamError('answer'))
            }

            const surveyResult: any = await this.saveSurveyResult.save({
                accountId,
                surveyId,
                answer,
                date: new Date()
            })
            return ok(surveyResult)
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace SaveSurveyResultController {
    export type Request = {
        surveyId: string
        answer: string
        accountId: string
    }
}