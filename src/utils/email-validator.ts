import { EmailValidator } from '../presentation/http/email-validator'

export class EmailValidatorAdapter implements EmailValidator {
    isValid(email: string): boolean {
        return false
    }
}