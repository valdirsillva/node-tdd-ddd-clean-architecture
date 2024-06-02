import { makeSignUpValidation } from './signup-validation-factory'
import { Validation } from '../../../presentation/http/validation'
import { EmailValidator } from '../../../presentation/http/email-validator'
import { ValidationComposite, RequiredFieldValidation, CompareFieldValidation, EmailValidation } from '../../../presentation/helpers/validators'

jest.mock('../../../presentation/helpers/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isValid(email: string): boolean {
            return true
        }
    }
    return new EmailValidatorStub()
}

describe('SignUpValidation Factory', () => {
    test('Should call ValidationComposite with all validations', async () => {
        makeSignUpValidation()
        const validations: Validation[] = []
        for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
            validations.push(new RequiredFieldValidation(field))
        }
        validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
        validations.push(new EmailValidation('email', makeEmailValidator()))
        expect(ValidationComposite).toHaveBeenCalledWith(validations)
    })
})