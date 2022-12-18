import ArithmeticFormula from '@/data/ArithmeticFormula/ArithmeticFormula'
import { ErrorType } from '@/data/constantString/data'
import { useLanguageStore } from '@/data/withMobx/Language/LanguageStoreProvider'
import { generateRandomNumber } from '@/helperFunction/math/random'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import NumberCell from '../NumberCell'
import OperatorCell from '../OperatorCell'
import styles from './index.module.scss'

interface FormulaAreaProps {
    arithmeticFormula: ArithmeticFormula
}

interface ChildrenProps {
    children: React.ReactNode
}

const ArithmeticColumnStyle = ({ children }: ChildrenProps) => {
    return <span className={styles.arithmeticColumnStyle}>{children}</span>
}

const ArithmeticRowStyle = ({ children }: ChildrenProps) => {
    return <div className={styles.arithmeticRowStyle}>{children}</div>
}

interface ArithemeticRowResultProps {
    resultCode: string | ErrorType
}

const ArithemeticRowResult = observer(({ resultCode }: ArithemeticRowResultProps) => {
    const formText = useLanguageStore().getLangText.form
    return <span className={styles.resultContainer}>
        {resultCode === ErrorType.ARITHMETIC_ROW_RESULT_ERROR ? <span className={styles.resultError}>{formText.rule.error.invalidResult}</span> :
            <span>{resultCode}</span>}
    </span>
})

interface ClearAllButtonProps {
    arithmeticFormula: ArithmeticFormula,
    row: number
}

const ClearAllButton = observer(({ arithmeticFormula, row }: ClearAllButtonProps) => {
    const clearAllButtonLabel = useLanguageStore().getLangText.form.arithmetic.clearAllButtonLabel
    const clearAllButtonClickHandle = () => {
        arithmeticFormula.clearAllByRow(row)
    }
    return <div className={styles.clearAllButtonContainer}><button onClick={clearAllButtonClickHandle} className={styles.clearAllButton}>{clearAllButtonLabel}</button></div>
})

class ArithmeticRowJSX {
    array: JSX.Element[] = []
    push(jsx: JSX.Element) {
        this.array.push(<ArithmeticColumnStyle key={generateRandomNumber()}>{jsx}</ArithmeticColumnStyle>)
    }
}

const FormulaArea = ({ arithmeticFormula }: FormulaAreaProps) => {
    const area: JSX.Element[] = []
    for (let i = 0; i < arithmeticFormula.rowLength; ++i) {
        const arithmeticRowJSX = new ArithmeticRowJSX()
        arithmeticRowJSX.push(<ClearAllButton arithmeticFormula={arithmeticFormula} row={i} />)
        for (let j = 0; j < arithmeticFormula.columnLengthByRow(i); ++j) {
            arithmeticRowJSX.push(j % 2 == 0 ? <NumberCell arithmeticFormula={arithmeticFormula} column={j} row={i} /> : <OperatorCell arithmeticFormula={arithmeticFormula} column={j} row={i} />)
        }
        const rowResult = arithmeticFormula.getResultByRow(i)
        if (rowResult) {
            arithmeticRowJSX.push(<ArithemeticRowResult resultCode={rowResult} />)
        }
        area.push(<ArithmeticRowStyle key={generateRandomNumber()}>{arithmeticRowJSX.array}</ArithmeticRowStyle>)
    }
    return <div className={styles.formulaAreaContainer}>{area}</div>
}

export default observer(FormulaArea)