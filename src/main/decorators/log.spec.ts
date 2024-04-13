import { LogControllerDecorator } from "./log"
import { Controller, HttpRequest, HttpResponse } from "../../presentation/http"

describe('LogControllerDecorator', () => {
    test('Should call controller handle', async () => {
        class ControllerStub implements Controller {
            async handle(httpREequest: HttpRequest): Promise<HttpResponse> {
                const httpResponse = {
                    statusCode: 200,
                    body: {
                        name: 'Valdir',
                    }
                }
                return new Promise(resolve => resolve(httpResponse))
            }
        }
        const controllerStub = new ControllerStub()
        const handleSpy = jest.spyOn(controllerStub, 'handle')
        const sut = new LogControllerDecorator(controllerStub)
        const httpRequest = {
            body: {
                email: 'any_email@mail.com',
                name: 'any_name',
                password: 'any_password',
                passwordConfirmation: 'any_password'
            }
        }
        await sut.handle(httpRequest)
        expect(handleSpy).toHaveBeenCalledWith(httpRequest)
    })
})