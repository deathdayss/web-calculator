import { languageCountryMap } from "@/data/language/data";
import { LanguageCode } from "@/data/language/type";

export function findLanguageCodeByCountryCode(countryCode: string) {
    if (languageCountryMap[LanguageCode.SimplifiedChiense].includes(countryCode)) {
        return LanguageCode.SimplifiedChiense
    }
    else {
        return LanguageCode.English
    }
}