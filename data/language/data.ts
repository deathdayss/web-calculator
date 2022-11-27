import LanguageDisplay from "./LanguageDisplay";
import { LanguageCode } from "./type";



export const languageCodes = Object.values(LanguageCode)
export const languageDisplay = new LanguageDisplay(languageCodes);