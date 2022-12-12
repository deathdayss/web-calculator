import React, { FormEventHandler, useEffect } from "react";
import { GENERIC_INPUT_DISPLAY_NAME } from "../GenericInput";

interface GenericFormProps {
    name?: string | undefined,
    onSubmit?: (e: any) => void | undefined;
    children?: React.ReactNode
}

const GenericForm = ({ name, onSubmit, children }: GenericFormProps) => {
    const submitHandle: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
    }
    const childrenWithProps = React.Children.map(children, (child: any) => {
        if (React.isValidElement(child) && typeof child !== 'string' && (child.type as any).displayName === GENERIC_INPUT_DISPLAY_NAME) {
            return React.cloneElement(child, { formName: name } as any);
        }
        return child;
    });
    return <form name={name} onSubmit={submitHandle}>
        {childrenWithProps}
    </form >
}

export default GenericForm