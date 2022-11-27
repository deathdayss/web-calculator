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
        if (typeof (window) !== "undefined" && localStorage) {
            const storeLangCode = localStorage.getItem(LocalStorageKey.WebCalculatorLangCode);
            if (storeLangCode && storeLangCode in languageCodes) {
                this.langCode = storeLangCode as LanguageCode;
            }
        }
        makeObservable(this, {
            langCode: observable,
            languageCodes: false,
            getLangCode: computed,
            getLangText: computed,
            setLangCode: action
        })
    }

    get getLangCode() {
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
}