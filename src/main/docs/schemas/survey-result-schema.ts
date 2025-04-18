
export const surveyResultSchema = {
  type: 'object',
  properties: {
    surveyId: {
      type: 'string'
    },
    question: {
      type: 'string'
    },
    answers: {
      type: 'array',
      items: {
        $ref: '#/schemas/surveyResultAnswerSchema'
      }
    },
    date: {
      type: 'string'
    }
  },
  required: ['surveyId', 'qestion', 'answers', 'date']
}