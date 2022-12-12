import { useInputValue } from "@/components/hooks/Form/input";
import { ChangeEventHandler } from "react";
import GenericInput from "../GenericInput";

interface NumberCellProps {
    value?: string | undefined,
    getValue?: (() => string | undefined) | undefined
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined,
    formName?: string | undefined,
    name?: string | undefined
    maxLength?: number
}

const validNumberCellRule = (value: string | undefined) => {
    if (value === undefined) {
        return true
    }
    let firstIndex = 0
    let lastIndex = value.length - 1
    if (value[0] === '(') {
        firstIndex += 1
    }
    if (value[lastIndex] === ')') {
        lastIndex -= 1
    }
    const numberValue = value.substring(firstIndex, lastIndex + 1)
    return !isNaN(Number(numberValue));
}

const invalidNumberCellCharactersPattern = /[^\d\-\)\(\.\-]/g

const NumberCell = ({ value, getValue, onChange, maxLength = 20, ...genericInputProps }: NumberCellProps) => {
    const [inputValue, setInputValue] = useInputValue(value, getValue, onChange)
    const filterOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        e.target.value = e.target.value.replace(invalidNumberCellCharactersPattern, '').substring(0, maxLength)
        setInputValue(e)
    }
    return <GenericInput {...genericInputProps} value={inputValue} onChange={filterOnChange} validation={[{
        rule: validNumberCellRule,
        warningMessage: 'the input is not a valid number'
    }]} />;
}

export default NumberCell;