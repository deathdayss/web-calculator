import { useArithmeticCell } from "@/components/hooks/Form/input";
import { invalidOperatorCellPattern, validNumberPattern, validOperatorCellPattern } from "@/data/regExp/form";
import { useLanguageStore } from "@/data/withMobx/Language/LanguageStoreProvider";
import { observer } from "mobx-react-lite";
import { ChangeEventHandler } from "react";
import GenericInput from "../GenericInput";
import { ArithmeticCellProps } from "../type";
import styles from './index.module.scss'

const OperatorCell = ({ row, column, arithmeticFormula, maxLength = 2, ...genericInputProps }: ArithmeticCellProps) => {
    const arithmeticCell = useArithmeticCell(arithmeticFormula, row, column)
    const errorMessage = useLanguageStore().getLangText.form.rule.error
    const filterOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const nextValue = e.target.value
        const filteredValue = nextValue.replace(invalidOperatorCellPattern, '').substring(0, maxLength)
        arithmeticFormula.setValueByPosition(row, column, filteredValue)
        arithmeticFormula.addNextInput(row, column, nextValue, validNumberPattern)
    }
    return <GenericInput {...genericInputProps}
        {...arithmeticCell}
        onChange={filterOnChange}
        inputClassName={styles.operatorInput}
        validation={[{
            rule: validOperatorCellPattern,
            warningMessage: errorMessage.invalidOperator
        }]} />;
}

export default observer(OperatorCell);