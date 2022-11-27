import { LanguageCode } from "../language/type"
import { LanguageTextMapping } from "./type"

export const englishLocalText = {
    Header: {
        toggleButton: {
            arithmetic: 'Arithmetic',
            'exchange-rate': 'Exchange Rate'
        }
    }
}

export type LocalizationText = typeof englishLocalText

export const simplifiedChineseLocalText: LocalizationText = {
    Header: {
        toggleButton: {
            arithmetic: '算术',
            'exchange-rate': '汇率'
        }
    }
}

export const languageTextMapping: LanguageTextMapping = {
    [LanguageCode.English]: englishLocalText,
    [LanguageCode.SimplifiedChiense]: simplifiedChineseLocalText
}

export const commonLocalText = {
    language: {
        en: 'English',
        zh_CN: '简体中文'
    }
}

export type CommonLocalizationText = typeof commonLocalText