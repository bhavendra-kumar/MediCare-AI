import { Stack } from "expo-router";

import {
  SafeAreaProvider,
} from "react-native-safe-area-context";

import AuthProvider
  from "../src/context/AuthContext";
import { AccessibilityProvider } from "../src/context/AccessibilityContext";

import * as Notifications from "expo-notifications";

import { useEffect } from "react";
import "../src/locales/i18n";
import { loadLanguage } from "../src/store/languageStore";
import { startNetworkListener } from "../src/store/networkStore";
import NetworkBanner from "../src/components/NetworkBanner";

import Toast
from "react-native-toast-message";

export default function RootLayout() {
  useEffect(() => {
    Notifications.requestPermissionsAsync();
    loadLanguage();
    startNetworkListener();
  }, []);

  return (

    <SafeAreaProvider>
      <AccessibilityProvider>
        <AuthProvider>
          <NetworkBanner />
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />

        </AuthProvider>
      </AccessibilityProvider>

      <Toast />
    </SafeAreaProvider>
  );
}

