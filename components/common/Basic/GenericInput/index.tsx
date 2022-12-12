import { useInputValue } from "@/components/hooks/Form/input"
import { ChangeEventHandler, forwardRef, useEffect, useState } from "react"
import styles from './index.module.scss'

export const GENERIC_INPUT_DISPLAY_NAME = 'GenericInput'

interface InputValidation {
    rule: ((value: string | undefined) => boolean) | RegExp
    warningMessage: string
}

interface GenericInputProps {
    value?: string | undefined,
    getValue?: (() => string | undefined) | undefined
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined,
    formName?: string | undefined,
    name?: string | undefined
    realTimeWarning?: boolean | undefined,
    validation?: InputValidation[] | undefined,
    className?: string | undefined,
    inputClassName?: string | undefined,
    warningMessageClassName?: string | undefined
}

const getWarningMessage = (value: string | undefined, validation: InputValidation[] | undefined) => {
    if (!validation || value === undefined) {
        return ''
    }
    for (const val of validation) {
        if (val.rule instanceof RegExp) {
            if (!val.rule.test(value)) {
                return val.warningMessage
            }
        }
        else if (!val.rule(value)) {
            return val.warningMessage
        }
    }
    return ''
}

const useInputRealTimeWarning = (realTimeWarning: boolean, realTimeWarningMessage: string, setWarningMessage: (value: string) => void) => {
    useEffect(() => {
        if (realTimeWarning) {
            setWarningMessage(realTimeWarningMessage)
        }
    }, [realTimeWarning, realTimeWarningMessage, setWarningMessage])
}

const useInputFormSubmit = (formName: string | undefined, realTimeWarning: boolean, realTimeWarningMessage: string, setWarningMessage: (value: string) => void) => {
    useEffect(() => {
        if (formName) {
            const onSubmitEvent = (e: any) => {
                if (e.target.name === formName && !realTimeWarning) {
                    setWarningMessage(realTimeWarningMessage)
                }
            }
            window.addEventListener('submit', onSubmitEvent);
            return () => window.removeEventListener('submit', onSubmitEvent)
        }
    }, [formName, realTimeWarning, realTimeWarningMessage, setWarningMessage])
}

const GenericInput = forwardRef<HTMLInputElement, GenericInputProps>(({
    value,
    getValue,
    onChange,
    formName,
    name,
    realTimeWarning = true,
    validation,
    className,
    inputClassName,
    warningMessageClassName }, ref) => {
    const [inputValue, setInputValue] = useInputValue(value, getValue, onChange)
    const realTimeWarningMessage = getWarningMessage(inputValue, validation)
    const [warningMessage, setWarningMessage] = useState(realTimeWarningMessage)
    useInputRealTimeWarning(realTimeWarning, realTimeWarningMessage, setWarningMessage)
    useInputFormSubmit(formName, realTimeWarning, realTimeWarningMessage, setWarningMessage)
    return <span className={className ?? styles.GenericInputContainer}>
        <input value={inputValue} 
        onChange={setInputValue} className={inputClassName ?? styles.input}
        ref={ref} autoComplete="off" name={name} />
        {warningMessage ? <div className={warningMessageClassName ?? styles.message}>{warningMessage}</div> : null}
    </span>
})

GenericInput.displayName = GENERIC_INPUT_DISPLAY_NAME

export default GenericInput