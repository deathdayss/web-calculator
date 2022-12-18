import { useArithmeticCell } from "@/components/hooks/Form/input";
import { invalidNumberCellPattern, validNumberCellRule, validOperatorPattern } from "@/data/regExp/form";
import { useLanguageStore } from "@/data/withMobx/Language/LanguageStoreProvider";
import { observer } from "mobx-react-lite";
import { ChangeEventHandler } from "react";
import GenericInput from "../GenericInput";
import { ArithmeticCellProps } from "../type";

const NumberCell = ({ row, column, arithmeticFormula, maxLength = 20, ...genericInputProps }: ArithmeticCellProps) => {
    const arithmeticCell = useArithmeticCell(arithmeticFormula, row, column)
    const errorMessage = useLanguageStore().getLangText.form.rule.error
    const filterOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const nextValue = e.target.value
        arithmeticFormula.addNextInput(nextValue, validOperatorPattern)
        const filteredValue = nextValue.replace(invalidNumberCellPattern, '').substring(0, maxLength)
        arithmeticFormula.setValueByCurrentPosition(filteredValue)
    }
    return <GenericInput {...genericInputProps}
        {...arithmeticCell}
        onChange={filterOnChange}
        validation={[{
            rule: validNumberCellRule,
            warningMessage: errorMessage.invalidNumber
        }]} />;
}

export default observer(NumberCell);