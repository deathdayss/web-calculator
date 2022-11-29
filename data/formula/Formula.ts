import { message } from "antd";
import { action, makeObservable, observable } from "mobx";

message.config({ maxCount: 1 })

export default class Formula {
    formula = [['']]
    constructor() {
        makeObservable(this, {
            formula: observable.deep,
            setValueByPosition: action,
            addNewRow: action,
            addNewInput: action
        })
    }

    setValueByPosition(row: number, col: number, value: string) {
        if (row >= 0 && col >= 0 && row < this.formula.length && col < this.formula[row].length) {
            this.formula[row][col] = value;
        }
        else {
            // message.error(languageDisplay.getLangText.message.error.positionError);
        }
    }

    addNewRow() {
        this.formula.push(['']);
    }

    addNewInput(row: number) {
        if (row >= 0 && row < this.formula.length) {
            this.formula[row].push('');
        }
        else {
            // message.error(languageDisplay.getLangText.message.error.positionError);
        }
    }
}