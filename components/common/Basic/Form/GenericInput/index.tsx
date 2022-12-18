import { useInputValue } from "@/components/hooks/Form/input"
import { observer } from "mobx-react-lite"
import { ChangeEventHandler, FocusEventHandler, forwardRef, useEffect, useState } from "react"
import styles from './index.module.scss'

export const GENERIC_INPUT_DISPLAY_NAME = 'GenericInput'

interface InputValidation {
    rule: ((value: string | undefined) => boolean) | RegExp
    warningMessage: string
}

const getWarningMessage = (value: string | undefined, validation: InputValidation[] | undefined) => {
    if (!validation || value === undefined) {
        return ''
    }
    for (const val of validation) {
        if (val.rule instanceof RegExp) {
            val.rule.lastIndex = 0
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

interface GenericInputProps {
    value?: string | undefined,
    getValue?: (() => string | undefined) | undefined
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined,
    autoFocus?: boolean,
    onFocus?: FocusEventHandler<HTMLInputElement> | undefined,
    onBlur?: FocusEventHandler<HTMLInputElement> | undefined,
    formName?: string | undefined,
    name?: string | undefined
    realTimeWarning?: boolean | undefined,
    validation?: InputValidation[] | undefined,
    className?: string | undefined,
    inputClassName?: string | undefined,
    warningMessageClassName?: string | undefined,
    firstKeydown?: (e: React.KeyboardEvent<HTMLInputElement>, value: string | undefined) => void
}

const GenericInput = forwardRef<HTMLInputElement, GenericInputProps>(({
    value,
    getValue,
    onChange,
    autoFocus,
    onFocus,
    onBlur,
    formName,
    name,
    realTimeWarning = true,
    validation,
    className,
    inputClassName,
    warningMessageClassName,
    firstKeydown }, ref) => {
    const [inputValue, setInputValue] = useInputValue(value, getValue, onChange)
    const realTimeWarningMessage = getWarningMessage(inputValue, validation)
    const [warningMessage, setWarningMessage] = useState(realTimeWarningMessage)
    const [hasKeyDown, setHasKoyDown] = useState(false)
    useInputRealTimeWarning(realTimeWarning, realTimeWarningMessage, setWarningMessage)
    useInputFormSubmit(formName, realTimeWarning, realTimeWarningMessage, setWarningMessage)
    return <div className={className ?? styles.GenericInputContainer}>
        <input value={inputValue}
            autoFocus={autoFocus}
            onChange={setInputValue}
            className={inputClassName ?? styles.input}
            onFocus={onFocus}
            onBlur={onBlur}
            ref={ref} autoComplete="off" name={name}
            onKeyDown={(e) => {
                setHasKoyDown(true)
                if (!hasKeyDown && firstKeydown) {
                    firstKeydown(e, inputValue)
                }
            }}
            onKeyUp={(e) => {
                setHasKoyDown(false)
            }}
        />
        {warningMessage ? <div className={warningMessageClassName ?? styles.message}>{warningMessage}</div> : null}
    </div>
})

GenericInput.displayName = GENERIC_INPUT_DISPLAY_NAME

export default observer(GenericInput)