import { arithmeticFormula } from "@/data/ArithmeticFormula/data";
import { validOperatorCellPattern } from "@/data/regExp/form";

export function getInputValue(value: string | undefined, getValue: (() => string | undefined) | undefined, internalValue = '') {
    if (value !== undefined) {
        return value
    }
    if (getValue) {
        const getValueOutput = getValue()
        if (getValueOutput !== undefined) {
            return getValueOutput
        }
    }
    return internalValue;
}

export function validOperatorCellRule(value: string | undefined) {
    if (value === undefined) {
        return true;
    }
    return validOperatorCellPattern.test(value)
}

export function addNextInputByRegExpFirstMatch(nextValue: string, regExp: RegExp) {
    const validOperators = nextValue.match(regExp)
        if (validOperators && validOperators.length > 0) {
            arithmeticFormula.addNextInput(validOperators[0])
        }
}