export interface SurveyResultModel {
    id: string
    surveyId: string
    question: string
    answers: string
    date: Date
}

export interface SurveyAnswerModel {
    image?: string
    answer: string
}