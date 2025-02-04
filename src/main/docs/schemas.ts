import {
    accountSchema,
    loginParamsSchema,
    errorSchema,
    surveyAnswerSchema,
    surveySchema,
    surveysSchema,
    signUpParamsSchema,
    addSurveyParamsSchema,
    saveSurveyParamsSchema,
    surveyResultSchema
} from './schemas/'

export default {
    account: accountSchema,
    loginParams: loginParamsSchema,
    signUpParams: signUpParamsSchema,
    addSurveyParams: addSurveyParamsSchema,
    error: errorSchema,
    surveys: surveysSchema,
    survey: surveySchema,
    surveyAnswer: surveyAnswerSchema,
    saveSurveyParams: saveSurveyParamsSchema,
    surveyResult: surveyResultSchema,

}