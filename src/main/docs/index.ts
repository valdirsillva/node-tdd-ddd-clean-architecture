import { loginPath } from './paths'
import { badRequest, serverError, unauthorized, notFound } from './components'
import { accountSchema, loginParamsSchema, errorSchema } from './schemas/'

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
    }],
    paths: {
        '/login': loginPath
    },
    schemas: {
        account: accountSchema,
        loginParams: loginParamsSchema,
        error: errorSchema
    },
    components: {
        badRequest,
        serverError,
        unauthorized,
        notFound
    }
}