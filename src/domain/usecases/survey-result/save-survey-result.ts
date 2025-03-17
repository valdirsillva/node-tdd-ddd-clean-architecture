import { SurveyResultModel } from '@/domain/models/survey-result'

export type SaveSurveyResultParams = {
    surveyId: string
    accountId: string
    answer: string
    date: Date
}

export interface SaveSurveyResult {
    save(account: SaveSurveyResultParams): Promise<SaveSurveyResult.Result>
}


export namespace SaveSurveyResult {
    export type Params = {
      surveyId: string
      accountId: string
      answer: string
      date: Date
    }
  
    export type Result = SurveyResultModel
  }
