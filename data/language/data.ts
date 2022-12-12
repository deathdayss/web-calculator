import { LanguageCode } from "./type";

export const languageCountryMap = {
    [LanguageCode.English]: new Set(['US', 'AU']),
    [LanguageCode.SimplifiedChiense]: new Set(['CN'])
}
export const languageCodes = Object.values(LanguageCode)