"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Lang, t as translate } from "@/lib/i18n";

type Ctx = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<Ctx>({
  lang: "en",
  setLang: () => undefined,
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("govsearch_lang");
      if (stored === "hi" || stored === "en") setLangState(stored);
    } catch {
      // ignore
    }
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem("govsearch_lang", next);
    } catch {
      // ignore
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: (key) => translate(lang, key) }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useI18n() {
  return useContext(LanguageContext);
}
