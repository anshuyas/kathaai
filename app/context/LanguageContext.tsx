"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Language = "en" | "np";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<
  LanguageContextType | undefined
>(undefined);

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguageState] =
    useState<Language>("en");

  // Load saved language when app starts
  useEffect(() => {
    const savedLanguage = localStorage.getItem(
      "language"
    ) as Language | null;

    if (savedLanguage) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Save language whenever it changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}