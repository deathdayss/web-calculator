import { type } from "os";
import { useRef, useState } from "react";
import GenericInput from "../common/Basic/GenericInput";
import GenericForm from "../common/Basic/GenericForm";
import React from "react";
import NumberCell from "../common/Basic/NumberCell";

const ArithmeticMain = () => {
    const [value, setValue] = useState('')
    const ref = useRef<HTMLInputElement>(null)
    // const ref = React.createRef<HTMLButtonElement>()
    return <GenericForm name="formName">
        <NumberCell />
    </GenericForm>;
}

export default ArithmeticMain