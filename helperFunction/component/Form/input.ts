export function getInputValue(value: string | undefined, getValue: (() => string | undefined) | undefined, internalValue = '') {
    if (value !== undefined) {
        return value
    }
    if (getValue) {
        const getValueOutput = getValue()
        if (getValueOutput !== undefined) {
            return getValue()
        }
    }
    return internalValue;
}