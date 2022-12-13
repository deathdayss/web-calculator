import { message } from "antd";
import { action, computed, makeObservable, observable } from "mobx";
import { FormulaPosition } from "./type";

message.config({ maxCount: 1 })

export default class ArithmeticFormula {
    formulaValues: string[][] = [['']]
    formulatPosition: FormulaPosition | undefined = undefined
    autoFocusPosition: FormulaPosition = { row: 0, column: 0 }

    constructor() {
        makeObservable(this, {
            formulaValues: observable,
            formulatPosition: observable,
            autoFocusPosition: observable,
            setValueByCurrentPosition: action,
            addNewRow: action,
            addNewInputByPosition: action,
            deleteInputByPosition: action,
            deleteCurrentInput: action,
            addNextInput: action,
            setPosition: action,
            setAutoFocusPosition: action,
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
    }

    addNewInputByPosition(row: number, column: number, initialValue = '') {
        if (row >= 0 && column >= 0 && row < this.formulaValues.length && column < this.formulaValues[row].length) {
            this.formulaValues[row].splice(column, 0, initialValue)
        }
    }

    deleteInputByPosition(row: number, column: number) {
        if (row >= 0 && column >= 0 && row < this.formulaValues.length && column < this.formulaValues[row].length) {
            this.formulaValues[row].splice(column, 1)
        }
    }

    deleteCurrentInput() {
        this.deleteInputByPosition(this.rowIndex, this.columnIndex)
    }

    addNextInput(initialValue = '') {
        this.setAutoFocusPosition(this.rowIndex, this.columnIndex + 1)
        this.addNewInputByPosition(this.rowIndex, this.columnIndex + 1, initialValue)
    }

    getValueByPosition(row: number, column: number) {
        if (row >= 0 && column >= 0 && row < this.formulaValues.length && column < this.formulaValues[row].length) {
            return this.formulaValues[row][column]
        }
        return ''
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
        if (row >= 0 && row < this.rowLength) {
            return this.formulaValues[row].length
        }
        return -1
    }
}