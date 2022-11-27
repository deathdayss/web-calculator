import { LanguageCode } from "../language/type";
import { LocalizationText } from "./data";

export type LanguageTextMapping = {
    [key in LanguageCode]: LocalizationText
}