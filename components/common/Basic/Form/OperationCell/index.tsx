import { useArithmeticCell } from "@/components/hooks/Form/input";
import { invalidOperationCellPattern, validNumberPattern } from "@/data/regExp/form";
import { addNextInputByRegExpFirstMatch } from "@/helperFunction/component/Form/input";
import { observer } from "mobx-react-lite";
import { ChangeEventHandler } from "react";
import GenericInput from "../GenericInput";
import { ArithmeticCellProps } from "../type";

const OperationCell = ({ row, column, arithmeticFormula, maxLength = 2, ...genericInputProps }: ArithmeticCellProps) => {
    const arithmeticCell = useArithmeticCell(arithmeticFormula, row, column)
    const filterOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const nextValue = e.target.value
        addNextInputByRegExpFirstMatch(arithmeticFormula, nextValue, validNumberPattern)
        const filteredValue = nextValue.replace(invalidOperationCellPattern, '').substring(0, maxLength)
        arithmeticFormula.setValueByCurrentPosition(filteredValue)
    }
    return <GenericInput {...genericInputProps}
        {...arithmeticCell}
        onChange={filterOnChange}
        validation={[{
            rule: validOperationCellRule,
            warningMessage: 'the input is not a valid number'
        }]} />;
}

export default observer(OperationCell);