import { action, computed, makeAutoObservable, makeObservable, observable } from "mobx";
import { languageTextMapping } from "../localizationText/data";
import { LocalStorageKey } from "../localStorage/type";
import { languageCodes } from "./data";
import { LanguageCode } from "./type"

export default class LanguageDisplay {
    langCode = LanguageCode.English
    languageCodes: LanguageCode[]

    constructor(languageCodes: LanguageCode[]) {
        this.languageCodes = languageCodes;
        makeObservable(this, {
            langCode: observable,
            languageCodes: false,
            getLangCode: computed,
            getLangText: computed,
            setLangCode: action,
            setLangCodeFromLocalStorage: action
        })
    }

    get getLangCode() {
        console.log('get lang code', this.langCode)
        return this.langCode
    }

    get getLangText() {
        return languageTextMapping[this.getLangCode]
    }

    setLangCode(langCode: LanguageCode) {
        if (localStorage) {
            localStorage.setItem(LocalStorageKey.WebCalculatorLangCode, langCode);
        }
        this.langCode = langCode
    }

    setLangCodeFromLocalStorage() {
        const storeLangCode = localStorage.getItem(LocalStorageKey.WebCalculatorLangCode) as LanguageCode;
        if (storeLangCode && languageCodes.includes(storeLangCode) && storeLangCode !== this.langCode) {
            this.langCode = storeLangCode
        }
    }
}