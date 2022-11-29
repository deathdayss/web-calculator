import { LanguageCode } from "./type";

export const languageCountryMap = {
    [LanguageCode.English]: ['US', 'AU'],
    [LanguageCode.SimplifiedChiense]: ['CN']
}
export const languageCodes = Object.values(LanguageCode)