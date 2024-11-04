import { forbidden } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadSurveyById, SaveSurveyResult } from './save-survey-result-controller-protocols'
import { InvalidParamError } from '@/presentation/errors'

export class SaveSurveyResultController implements Controller {
    constructor(
        private readonly loadSurveyById: LoadSurveyById,
        private readonly saveSurveyResult: SaveSurveyResult
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const survey = await this.loadSurveyById.loadById(httpRequest.params.surveyId)
        if (!survey) {
            return forbidden(new InvalidParamError('surveyId'))
        }
        return null
    }
}