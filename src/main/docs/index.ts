import { loginPath, surveyPath, signUpPath } from './paths'
import { badRequest, serverError, unauthorized, notFound, forbidden } from './components'
import { accountSchema, loginParamsSchema, errorSchema, surveyAnswerSchema, surveySchema, surveysSchema, apiKeyAuthSchema, signUpParamsSchema, addSurveyParamsSchema} from './schemas/'

export default {
    openapi: '3.0.0',
    info: {
        title: 'Clean Node API',
        description: 'API do curso clean architecture',
        version: '1.0.0'
    },
    license: {
        name: 'ISC',
        url: 'https://opensource.org/license/isc-license-txt'
    },
    servers: [{
        url: '/api'
    }],
    tags: [{
        name: 'Login'
    }, {
        name: 'Enquete'
    }],
    paths: {
        '/login': loginPath,
        '/signup': signUpPath,
        '/surveys': surveyPath
    },
    schemas: {
        account: accountSchema,
        loginParams: loginParamsSchema,
        signUpParams: signUpParamsSchema,
        addSurveyParams: addSurveyParamsSchema,
        error: errorSchema,
        surveys: surveysSchema,
        survey: surveySchema,
        surveyAnswer: surveyAnswerSchema
    },
    components: {
        securitySchemes: {
            apikeyAuth: apiKeyAuthSchema
        },

        badRequest,
        serverError,
        unauthorized,
        notFound,
        forbidden
    }
}