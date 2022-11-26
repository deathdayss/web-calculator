import LanguageDisplay from "./LanguageDisplay";
import { LanguageCode } from "./type";

export const languageDisplay = new LanguageDisplay(LanguageCode.English);
export const languageCodes = Object.values(LanguageCode)