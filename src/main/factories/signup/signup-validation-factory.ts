
import { Validation } from '../../../presentation/http/validation'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'
import { ValidationComposite, RequiredFieldValidation, CompareFieldValidation, EmailValidation } from '../../../presentation/helpers/validators'

export const makeSignUpValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
        validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', new EmailValidatorAdapter))
    return new ValidationComposite(validations)
}