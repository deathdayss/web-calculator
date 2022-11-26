import { makeAutoObservable } from "mobx";
import { LanguageCode } from "./type"

export default class LanguageDisplay {
    langCode = LanguageCode.English;

    constructor(langCode: LanguageCode) {
        this.langCode = langCode;
        makeAutoObservable(this);
    }

    get getLangCode() {
        return this.langCode;
    }

    set setLangCode(langCode: LanguageCode) {
        this.langCode = langCode;
    }
}