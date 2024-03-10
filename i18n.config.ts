import {nl} from "~/translations/nl/nl";
import {en} from "~/translations/en/en";

export default defineI18nConfig(() => ({
    fallbackLocale: 'nl',
    messages: {
        en: en,
        nl: nl
    }
}))