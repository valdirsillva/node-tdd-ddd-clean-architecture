
export interface HttpResponse {
    statusCode: number
    body: any
}

export interface HttpRequest {
    body?: any
    headers?: any
    params?: any
    accountId?: any
}

export type SaveSurveyResults = {
    params: {
        surveyId: string
    },
    accountId: string
    answer: string
    date: Date
}