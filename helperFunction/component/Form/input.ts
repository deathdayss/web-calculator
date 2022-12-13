import ArithmeticFormula from "@/data/ArithmeticFormula/ArithmeticFormula";
import { arithmeticFormula } from "@/data/ArithmeticFormula/data";

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

export function addNextInputByRegExpFirstMatch(arithmeticFormula: ArithmeticFormula, nextValue: string, regExp: RegExp) {
    const validOperators = nextValue.match(regExp)
        if (validOperators && validOperators.length > 0) {
            arithmeticFormula.addNextInput(validOperators[0])
        }
}