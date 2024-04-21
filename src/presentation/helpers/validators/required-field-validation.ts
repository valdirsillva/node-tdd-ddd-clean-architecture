import { MissingParamError } from '../../errors';
import { Validation } from './validation'

export class RequiredFieldValidation implements Validation {
    private readonly fieldName: string;

    constructor(fielName: string) {
        this.fieldName = fielName
    }

    validate(input: any): Error {
        if (!input[this.fieldName]) {
            return new MissingParamError(this.fieldName)
        }
    }
}