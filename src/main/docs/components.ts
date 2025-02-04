import { apiKeyAuthSchema } from './schemas/'
import { badRequest, serverError, unauthorized, notFound, forbidden } from './components/'

export default {
    securitySchemes: {
        apikeyAuth: apiKeyAuthSchema
    },

    badRequest,
    serverError,
    unauthorized,
    notFound,
    forbidden
}