import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { setLanguage } from "../src/store/languageStore";
import colors from "../src/constants/colors";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
  { code: "te", label: "తెలుగు" },
  { code: "ta", label: "தமிழ்" },
  { code: "kn", label: "ಕನ್ನಡ" },
  { code: "ml", label: "മലയാളം" },
  { code: "bn", label: "বাংলা" },
  { code: "mr", label: "मराठी" },
];

export default function LanguageSelectionScreen() {
  const { t } = useTranslation();

  const handleLanguageChange = async (language: string) => {
    await setLanguage(language);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t("language")}</Text>
        <Text style={styles.subtitle}>Choose your preferred language</Text>
        {LANGUAGES.map((language) => (
          <TouchableOpacity
            key={language.code}
            style={styles.languageCard}
            onPress={() => handleLanguageChange(language.code)}
          >
            <Text style={styles.languageText}>{language.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 30,
    fontSize: 34,
    fontWeight: "700",
    color: colors.text,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    color: colors.subText,
    marginBottom: 30,
  },
  languageCard: {
    height: 70,
    backgroundColor: colors.white,
    borderRadius: 20,
    justifyContent: "center",
    paddingHorizontal: 24,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  languageText: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text,
  },
});
