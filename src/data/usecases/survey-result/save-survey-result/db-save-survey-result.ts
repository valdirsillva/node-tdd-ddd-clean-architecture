import { SaveSurveyResultRepository, SaveSurveyResultParams, SaveSurveyResult, SurveyResultModel } from './db-save-survey-result-protocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
    constructor(private readonly saveSurveyResultRepository: SaveSurveyResultRepository) {}

    async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
        const surveyResult = await this.saveSurveyResultRepository.save(data)
        return surveyResult
    }
}