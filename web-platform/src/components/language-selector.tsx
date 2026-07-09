"use client";

import { useState } from "react";

export type Translations = Record<string, { dir: "ltr" | "rtl"; values: Record<string, string> }>;

export function useTranslation(translations: Translations, defaultLang: string = "en") {
  const [lang, setLang] = useState(defaultLang);
  const currentLangData = translations[lang] || translations["en"];
  const t = currentLangData.values;
  const dir = currentLangData.dir;

  return { t, dir, lang, setLang };
}
