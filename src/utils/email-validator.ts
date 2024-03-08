import { EmailValidator } from '../presentation/http/email-validator'
import validator from "validator"
export class EmailValidatorAdapter implements EmailValidator {
    isValid(email: string): boolean {
        return validator.isEmail(email)
    }
}