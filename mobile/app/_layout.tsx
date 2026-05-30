import { Stack } from "expo-router";

import {
  SafeAreaProvider,
} from "react-native-safe-area-context";

import AuthProvider
  from "../src/context/AuthContext";

import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import "../src/locales/i18n";
import { loadLanguage } from "../src/store/languageStore";

export default function RootLayout() {
  useEffect(() => {
    Notifications.requestPermissionsAsync();
    loadLanguage();
  }, []);

  return (

    <SafeAreaProvider>

      <AuthProvider>

        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />

      </AuthProvider>

    </SafeAreaProvider>
  );
}