import { SignUpController } from "./signup"
import { MissingParamError } from "../errors/missing-param-error"

describe('Signup Controller', () => {
    test('Should return 400 if no name isn provided', () => {
        const sut = new SignUpController()
        const httpRequest = {
            body: {
                email: 'any_email@gmail.com',
                password: 'any_password',
                passwordConfirmation: 'any_password'
            }
        }

        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('Missing param: name'))
    })

    test('Should return 400 if no email isn provided', () => {
        const sut = new SignUpController()
        const httpRequest = {
            body: {
                name: 'any_name',
                password: 'any_password',
                passwordConfirmation: 'any_password'
            }
        }

        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('Missing param: email'))
    })
})