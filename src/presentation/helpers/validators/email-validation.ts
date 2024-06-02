import { InvalidParamError } from '../../errors';
import { Validation } from '../../http/validation'
import { EmailValidator } from '../../http/email-validator';

export class EmailValidation implements Validation {
    constructor(private readonly fieldName: string,
        private readonly emailValidator: EmailValidator,
    ) { }

    validate(input: any): Error {
        const isValid = this.emailValidator.isValid(input[this.fieldName])
        if (!isValid) {
            return new InvalidParamError(this.fieldName)
        }
    }
}