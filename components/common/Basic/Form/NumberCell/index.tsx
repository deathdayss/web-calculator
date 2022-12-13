import { useArithmeticCell } from "@/components/hooks/Form/input";
import { arithmeticFormula } from "@/data/ArithmeticFormula/data";
import { FormulaPosition } from "@/data/ArithmeticFormula/type";
import { invalidNumberCellPattern, validOperatorsPattern } from "@/data/regExp/form";
import { addNextInputByRegExpFirstMatch } from "@/helperFunction/component/Form/input";
import { observer } from "mobx-react-lite";
import { ChangeEventHandler } from "react";
import GenericInput from "../GenericInput";

interface NumberCellProps extends FormulaPosition {
    formName?: string | undefined,
    name?: string | undefined,
    maxLength?: number,
    autoFocus?: boolean,
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

const NumberCell = ({ row, column, maxLength = 20, ...genericInputProps }: NumberCellProps) => {
    const arithmeticCell = useArithmeticCell(row, column)
    const filterOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const nextValue = e.target.value
        addNextInputByRegExpFirstMatch(nextValue, validOperatorsPattern)
        const filteredValue = nextValue.replace(invalidNumberCellPattern, '').substring(0, maxLength)
        arithmeticFormula.setValueByCurrentPosition(filteredValue)
    }
    return <GenericInput {...genericInputProps}
        {...arithmeticCell}
        onChange={filterOnChange}
        validation={[{
            rule: validNumberCellRule,
            warningMessage: 'the input is not a valid number'
        }]} />;
}

export default observer(NumberCell);