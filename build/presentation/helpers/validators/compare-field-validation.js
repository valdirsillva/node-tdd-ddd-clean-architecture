"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompareFieldValidation = void 0;
const errors_1 = require("../../errors");
class CompareFieldValidation {
    constructor(fieldName, fieldToCompareName) {
        this.fieldName = fieldName;
        this.fieldToCompareName = fieldToCompareName;
    }
    validate(input) {
        if (input[this.fieldName] !== input[this.fieldToCompareName]) {
            return new errors_1.InvalidParamError(this.fieldToCompareName);
        }
    }
}
exports.CompareFieldValidation = CompareFieldValidation;
