import { arithmeticFormula } from "@/data/ArithmeticFormula/data";
import { observer } from "mobx-react-lite";
import FormulaArea from "../common/Basic/Form/FormulaArea";
import GenericForm from "../common/Basic/Form/GenericForm";


const ArithmeticMain = () => {
    return <GenericForm name="formName">
        <FormulaArea arithmeticFormula={arithmeticFormula} />
    </GenericForm>;
}

export default observer(ArithmeticMain)