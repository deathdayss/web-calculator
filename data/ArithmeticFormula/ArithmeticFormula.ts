import { message } from "antd";
import { action, computed, makeObservable, observable } from "mobx";
import { ErrorType } from "../constantString/data";
import { FormulaPosition } from "./type";

message.config({ maxCount: 1 })

export default class ArithmeticFormula {
    formulaValues: string[][] = [['']]
    formulatPosition: FormulaPosition | undefined = undefined
    autoFocusPosition: FormulaPosition = { row: 0, column: 0 }
    formulaResults: string[] = ['']

    constructor() {
        makeObservable(this, {
            formulaValues: observable,
            formulatPosition: observable,
            autoFocusPosition: observable,
            formulaResults: observable,
            setValueByCurrentPosition: action,
            addNewRow: action,
            addInputByPosition: action,
            setResultByRow: action,
            deleteInputByPosition: action,
            deleteCurrentInput: action,
            addNextInput: action,
            setPosition: action,
            setAutoFocusPosition: action,
            clearAllByRow: action,
            blurPosition: action,
            rowIndex: computed,
            columnIndex: computed,
            isFocus: computed,
            focusedValue: computed,
            autoFocusRowIndex: computed,
            autoFocusColumnIndex: computed,
            rowLength: computed,
        })
    }

    setValueByCurrentPosition(value: string) {
        if (this.rowIndex >= 0 && this.columnIndex >= 0) {
            this.formulaValues[this.rowIndex][this.columnIndex] = value;
        }
    }

    addNewRow() {
        this.formulaValues.push(['']);
        this.formulaResults.push('');
    }

    deleteInputByPosition(row: number, column: number) {
        if (row >= 0 && column > 0 && row < this.formulaValues.length && column < this.formulaValues[row].length && this.columnLengthByRow(row) > 0) {
            let nextColumn = column
            if (column > 0) {
                nextColumn--
            }
            this.formulaValues[row].splice(column, 1)
            this.setPosition(row, nextColumn)
            this.setAutoFocusPosition(row, nextColumn)
        }
    }

    deleteCurrentInput() {
        this.deleteInputByPosition(this.rowIndex, this.columnIndex)
    }

    addNextInput(nextValue: string, regExp: RegExp) {
        if (this.columnIndex === this.columnLengthByRow(this.rowIndex) - 1) {
            const validOperators = nextValue.match(regExp)
            if (validOperators && validOperators.length > 0) {
                this.addInputByPosition(this.rowIndex, this.columnIndex + 1, validOperators[0])
            }
        }
    }

    addInputByPosition(row: number, column: number, initialValue = '') {
        if (row >= 0 && column >= 0 && row < this.formulaValues.length) {
            this.formulaValues[row].splice(column, 0, initialValue)
            this.setAutoFocusPosition(row, column)
        }
    }

    getValueByPosition(row: number, column: number) {
        if (row >= 0 && column >= 0 && row < this.formulaValues.length && column < this.formulaValues[row].length) {
            return this.formulaValues[row][column]
        }
        return ''
    }

    getResultByRow(row: number) {
        return this.formulaResults[row]
    }

    setResultByRow(row: number) {
        let evalValue = ''
        try {
            evalValue = eval(this.formulaValues[row].reduce((pre, cur) => pre + cur))
        }
        catch (exception) {
            this.formulaResults[row] = ErrorType.ARITHMETIC_ROW_RESULT_ERROR
        }
        if (typeof evalValue !== 'number') {
            this.formulaResults[row] = ErrorType.ARITHMETIC_ROW_RESULT_ERROR
        }
        else {
            this.formulaResults[row] = String(evalValue)
        }
    }

    setPosition(row: number, column: number) {
        if (row >= 0 && column >= 0 && row < this.formulaValues.length && column < this.formulaValues[row].length) {
            this.formulatPosition = { column, row }
        }
    }

    setAutoFocusPosition(row: number, column: number) {
        this.autoFocusPosition.row = row
        this.autoFocusPosition.column = column
    }

    clearAllByRow(row: number) {
        this.formulaValues[row] = ['']
        this.formulaResults[row] = ''
        this.setAutoFocusPosition(-1, -1)
    }

    blurPosition() {
        this.formulatPosition = undefined
    }

    get rowIndex() {
        return this.formulatPosition?.row ?? -1
    }

    get columnIndex() {
        return this.formulatPosition?.column ?? -1
    }

    get isFocus() {
        return this.formulatPosition !== undefined
    }

    get autoFocusRowIndex() {
        return this.autoFocusPosition.row
    }

    get autoFocusColumnIndex() {
        return this.autoFocusPosition.column
    }

    get focusedValue() {
        if (this.isFocus) {
            return this.formulaValues[this.rowIndex][this.columnIndex]
        }
        return ''
    }

    get rowLength() {
        return this.formulaValues.length
    }

    columnLengthByRow(row: number) {
        return computed(() => {
            if (row >= 0 && row < this.rowLength) {
                return this.formulaValues[row].length
            }
            return -1
        }).get()
    }
}