import { getInputValue } from "@/helperFunction/component/Form/input";
import { ChangeEventHandler, Dispatch, RefObject, SetStateAction, useLayoutEffect, useRef, useState } from "react";

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
    return [inputValue, onChange? onChange : setInternalValue] as UseInputValueReturn;
}