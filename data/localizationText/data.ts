import { LanguageCode } from "../language/type"
import { LanguageTextMapping } from "./type"

export const englishLocalText = {
    Header: {
        toggleButton: {
            arithmetic: 'Arithmetic',
            'exchange-rate': 'Exchange Rate'
        }
    },
    form: {
        rule: {
            error: {
                invalidNumber: 'Please input a valid number',
                invalidOperator: 'Please input a valid operator'
            }
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
    },
    form: {
        rule: {
            error: {
                invalidNumber: '请输入正确的数字',
                invalidOperator: '请输入正确的操作符'
            }
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