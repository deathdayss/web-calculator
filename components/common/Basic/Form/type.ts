import ArithmeticFormula from "@/data/ArithmeticFormula/ArithmeticFormula";
import { FormulaPosition } from "@/data/ArithmeticFormula/type";

export interface ArithmeticCellProps extends FormulaPosition {
    arithmeticFormula: ArithmeticFormula
    formName?: string | undefined,
    name?: string | undefined,
    maxLength?: number,
    autoFocus?: boolean,
}