import React, {
  useContext,
  useEffect,
} from "react";

import {
  View,
  ActivityIndicator,
} from "react-native";

import { router } from "expo-router";

import { AuthContext }
from "../src/context/AuthContext";

import colors
from "../src/constants/colors";

import { hasCompletedOnboarding } from "../src/store/authStorage";

export default function IndexScreen() {

  const {
    token,
    loading,
  } = useContext(AuthContext);

  useEffect(() => {

    if (loading) return;

    const checkNavigation = async () => {
      if (token) {
        router.replace("/(tabs)");
      } else {
        const completed = await hasCompletedOnboarding();
        if (completed) {
          router.replace("/login");
        } else {
          router.replace("/onboarding");
        }
      }
    };

    checkNavigation();

  }, [token, loading]);

  return (
    <View
      style={{
        flex: 1,

        justifyContent: "center",
        alignItems: "center",

        backgroundColor:
          colors.background,
      }}
    >
      <ActivityIndicator
        size="large"
        color={colors.primary}
      />
    </View>
  );
}