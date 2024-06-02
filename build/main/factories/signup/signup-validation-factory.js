"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSignUpValidation = void 0;
const email_validator_adapter_1 = require("../../adapters/validators/email-validator-adapter");
const validators_1 = require("../../../presentation/helpers/validators");
const makeSignUpValidation = () => {
    const validations = [];
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
        validations.push(new validators_1.RequiredFieldValidation(field));
    }
    validations.push(new validators_1.CompareFieldValidation('password', 'passwordConfirmation'));
    validations.push(new validators_1.EmailValidation('email', new email_validator_adapter_1.EmailValidatorAdapter));
    return new validators_1.ValidationComposite(validations);
};
exports.makeSignUpValidation = makeSignUpValidation;
