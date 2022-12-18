import { LanguageCode } from "../language/type"
import { LanguageTextMapping } from "./type"

export const englishLocalText = {
    Header: {
        toggleButton: {
            arithmetic: 'Arithmetic',
            'exchange-rate': 'Exchange Rate'
        }
    },
    footer: {
        devLinkLabel: 'Github Repository'
    },
    form: {
        arithmetic: {
            clearAllButtonLabel: 'Clear'
        },
        rule: {
            error: {
                invalidNumber: 'Please input a valid number',
                invalidOperator: 'Please input a valid operator',
                invalidResult: 'Formula with errors'
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
    footer: {
        devLinkLabel: 'Github代码库'
    },
    form: {
        arithmetic: {
            clearAllButtonLabel: '清除'
        },
        rule: {
            error: {
                invalidNumber: '请输入正确的数字',
                invalidOperator: '请输入正确的操作符',
                invalidResult: '算式有错误'
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