import i18n from "i18next"
import {initReactI18next} from "react-i18next"
import * as en from "./en/en.json"
import * as sk from "./sk/sk.json"

i18n.use(initReactI18next)
    .init({
        resources: {
            en: {translation: en},
            sk: {translation: sk},
        },
        lng: localStorage.getItem("language") ?? "en",
        interpolation: {escapeValue: false},
        fallbackLng: "en",
    })