import { useArithmeticCell } from "@/components/hooks/Form/input";
import { invalidNumberCellPattern, validNumberCellRule, validOperatorPattern } from "@/data/regExp/form";
import { addNextInputByRegExpFirstMatch } from "@/helperFunction/component/Form/input";
import { observer } from "mobx-react-lite";
import { ChangeEventHandler } from "react";
import GenericInput from "../GenericInput";
import { ArithmeticCellProps } from "../type";

const NumberCell = ({ row, column, arithmeticFormula, maxLength = 20, ...genericInputProps }: ArithmeticCellProps) => {
    const arithmeticCell = useArithmeticCell(arithmeticFormula, row, column)
    const filterOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const nextValue = e.target.value
        addNextInputByRegExpFirstMatch(arithmeticFormula, nextValue, validOperatorPattern)
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