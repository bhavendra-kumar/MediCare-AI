import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../locales/i18n";
import api from "../api/axios";

const LANGUAGE_KEY = "app_language";

export const getLanguage = async () => {
  return await AsyncStorage.getItem(LANGUAGE_KEY) || "en";
};

export const setLanguage = async (language: string, syncWithBackend: boolean = false) => {
  await AsyncStorage.setItem(LANGUAGE_KEY, language);
  i18n.changeLanguage(language);
  
  if (syncWithBackend) {
    try {
      await api.post("/auth/update-language", { language });
    } catch (e) {
      console.warn("Could not sync language with backend");
    }
  }
};

export const loadLanguage = async () => {
  const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
  if (savedLanguage) {
    i18n.changeLanguage(savedLanguage);
  } else {
    // Default to Indian English if no language set
    i18n.changeLanguage("en");
  }
};

