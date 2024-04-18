import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../http'

export class LoginController implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        return new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
    }
}