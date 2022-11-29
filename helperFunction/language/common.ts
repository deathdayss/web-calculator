import { languageCountryMap } from "@/data/language/data";
import { LanguageCode } from "@/data/language/type";

export function findLanguageCodeByCountryCode(countryCode: string) {
    if (languageCountryMap[LanguageCode.English].includes(countryCode)) {
        return LanguageCode.English
    }
    else {
        return LanguageCode.SimplifiedChiense
    }
}