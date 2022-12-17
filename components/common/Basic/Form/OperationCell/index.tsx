import { useArithmeticCell } from "@/components/hooks/Form/input";
import { invalidOperationCellPattern, validNumberPattern, validOperatorCellPattern } from "@/data/regExp/form";
import { useLanguageStore } from "@/data/withMobx/Language/LanguageStoreProvider";
import { addNextInputByRegExpFirstMatch } from "@/helperFunction/component/Form/input";
import { observer } from "mobx-react-lite";
import { ChangeEventHandler } from "react";
import GenericInput from "../GenericInput";
import { ArithmeticCellProps } from "../type";
import styles from './index.module.scss'

const OperationCell = ({ row, column, arithmeticFormula, maxLength = 2, ...genericInputProps }: ArithmeticCellProps) => {
    const arithmeticCell = useArithmeticCell(arithmeticFormula, row, column)
    const errorMessage = useLanguageStore().getLangText.form.rule.error
    const filterOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const nextValue = e.target.value
        addNextInputByRegExpFirstMatch(arithmeticFormula, nextValue, validNumberPattern)
        const filteredValue = nextValue.replace(invalidOperationCellPattern, '').substring(0, maxLength)
        arithmeticFormula.setValueByCurrentPosition(filteredValue)
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

export default observer(OperationCell);