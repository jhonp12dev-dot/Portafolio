const dictionaries = {
  es: () => import("@/dictionaries/es.json").then((module) => module.default),
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  pt: () => import("@/dictionaries/pt.json").then((module) => module.default),
  zh: () => import("@/dictionaries/zh.json").then((module) => module.default),
  ko: () => import("@/dictionaries/ko.json").then((module) => module.default),
  ru: () => import("@/dictionaries/ru.json").then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;

export const getDictionary = async (locale: Locale) => {
  if (!dictionaries[locale]) {
    return dictionaries.es(); // Fallback a español
  }
  return dictionaries[locale]();
};
