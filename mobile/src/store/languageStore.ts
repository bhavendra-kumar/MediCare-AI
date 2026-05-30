import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../locales/i18n";

const LANGUAGE_KEY = "app_language";

export const setLanguage = async (language: string) => {
  await AsyncStorage.setItem(LANGUAGE_KEY, language);
  i18n.changeLanguage(language);
};

export const loadLanguage = async () => {
  const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
  if (savedLanguage) {
    i18n.changeLanguage(savedLanguage);
  }
};
