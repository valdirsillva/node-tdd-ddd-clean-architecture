
export const surveyResultSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'string'
        },
        accountId: {
            type: 'string'
        },
        answer: {
            type: 'string'
        },
        date: {
            type: 'string'
        }
    }
}