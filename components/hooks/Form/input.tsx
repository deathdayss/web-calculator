import ArithmeticFormula from "@/data/ArithmeticFormula/ArithmeticFormula";
import { arithmeticFormula } from "@/data/ArithmeticFormula/data";
import { getInputValue } from "@/helperFunction/component/Form/input";
import { autorun } from "mobx";
import { ChangeEventHandler, Dispatch, KeyboardEventHandler, RefObject, SetStateAction, useEffect, useLayoutEffect, useRef, useState } from "react";

type UseInternalInputValueReturn = [string, ChangeEventHandler<HTMLInputElement>]

const useInternalInputValue = (initialValue: string) => {
    const [internalValue, setInternalValue] = useState<string>(initialValue)
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setInternalValue(e.target.value)
    }
    return [internalValue, onChange] as UseInternalInputValueReturn
}

type UseInputValueReturn = [string | undefined, ChangeEventHandler<HTMLInputElement>]

export const useInputValue = (value: string | undefined, getValue: (() => string | undefined) | undefined, onChange: ChangeEventHandler<HTMLInputElement> | undefined) => {
    const [internalValue, setInternalValue] = useInternalInputValue('')
    const inputValue = getInputValue(value, getValue, internalValue)
    return [inputValue, onChange ? onChange : setInternalValue] as UseInputValueReturn;
}

export const useArithmeticCell = (arithmeticFormula: ArithmeticFormula, row: number, column: number) => {
    const onFocus = () => {
        if (row === arithmeticFormula.rowLength - 1) {
            arithmeticFormula.addNewRow()
        }
        arithmeticFormula.setPosition(row, column)
    }
    const onBlur = () => {
        arithmeticFormula.blurPosition()
    }
    const getValue = () => arithmeticFormula.getValueByPosition(row, column)
    const firstKeydown = (e: React.KeyboardEvent<HTMLInputElement>, currentValue: string | undefined) => {
        if (e.key === 'Delete' || e.key === 'Backspace') {
            if (currentValue === '') {
                e.preventDefault()
                arithmeticFormula.deleteInputByPosition(row, column)
            }
        }
        else if (e.key === 'Enter') {
            arithmeticFormula.setResultByRow(row)
        }
    }
    const onKeyDownEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
        }
    }
    const ref = useRef<HTMLInputElement>(null)
    useEffect(() => {
        autorun(() => {
            if (arithmeticFormula.rowIndex === row && arithmeticFormula.columnIndex === column) {
                ref.current?.focus()
            }
        })
    }, [])
    return { onFocus, onBlur, getValue, firstKeydown, onKeyDownEvent, ref }
}