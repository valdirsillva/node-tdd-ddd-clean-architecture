import { Controller } from "@/presentation/http"
import { makeLoginValidation } from './login-validation-factory'
import { LoginController } from '@/presentation/controllers/login/login/login-controller'
import { makeLogControllerDecorator } from "@/main/factories/decorators/log-controller-decorator-factory"
import { makeDbAuthentication } from "@/main/factories/usecases/account/authentication/db-authentication-factory"

export const makeLoginController = (): Controller => {
    const controller = new LoginController(makeDbAuthentication(), makeLoginValidation())
    return makeLogControllerDecorator(controller)
}