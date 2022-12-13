import { arithmeticFormula } from "@/data/ArithmeticFormula/data";
import { observable } from "mobx";
import { observer } from "mobx-react-lite";
import { useRef, useState } from "react";
import GenericForm from "../common/Basic/Form/GenericForm";
import GenericInput from "../common/Basic/Form/GenericInput";
import NumberCell from "../common/Basic/Form/NumberCell";

const ArithmeticMain = () => {
    const [value, setValue] = useState('')
    const ref = useRef<HTMLInputElement>(null)
    // const ref = React.createRef<HTMLButtonElement>()
    return <GenericForm name="formName">
        <NumberCell arithmeticFormula={arithmeticFormula} row={0} column={0} />
    </GenericForm>;
}

export default ArithmeticMain