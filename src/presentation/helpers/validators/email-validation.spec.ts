import { EmailValidation } from "./email-validation"
import { EmailValidator } from "../../http/email-validator"
import { HttpRequest } from "../../http"
import { serverError } from "../http/http-helper"
import { ServerError } from "../../errors"

const makeEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isValid(email: string): boolean {
            return true
        }
    }
    return new EmailValidatorStub()
}


interface SutTypes {
    sut: EmailValidation
    emailValidatorStub: EmailValidator
}

// Pattners Factory
const makeSut = (): SutTypes => {
    const emailValidatorStub = makeEmailValidator()
    const sut = new EmailValidation('email', emailValidatorStub)
    return {
        sut,
        emailValidatorStub,
    }
}

const makeFakeRequest = (): HttpRequest => ({
    body: {
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
    }
})

describe('Email Validation', () => {
    test('Should call EmailValidator with correct email', () => {
        const { sut, emailValidatorStub } = makeSut()
        const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
        sut.validate({ email: 'any_email@gmail.com' })
        expect(isValidSpy).toHaveBeenCalledWith('any_email@gmail.com')
    })

    test('Should throw if EmailValidator throws', () => {
        const { sut, emailValidatorStub } = makeSut()
        jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
            throw new Error()
        })
        expect(sut.validate).toThrow()
    })
})