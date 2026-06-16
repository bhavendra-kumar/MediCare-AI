import i18n from "i18next";

import { initReactI18next }
from "react-i18next";

import enCommon
from "./en/common.json";

import teCommon from "./te/common.json";
import hiCommon from "./hi/common.json";
import taCommon from "./ta/common.json";
import knCommon from "./kn/common.json";
import mlCommon from "./ml/common.json";
import bnCommon from "./bn/common.json";
import mrCommon from "./mr/common.json";

i18n.use(initReactI18next).init({

  lng: "en",

  fallbackLng: "en",

  resources: {

    en: {
      translation: enCommon,
    },

    te: {
      translation: teCommon,
    },

    hi: {
      translation: hiCommon,
    },
    ta: {
      translation: taCommon,
    },
    kn: {
      translation: knCommon,
    },
    ml: {
      translation: mlCommon,
    },
    bn: {
      translation: bnCommon,
    },
    mr: {
      translation: mrCommon,
    },
  },

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
