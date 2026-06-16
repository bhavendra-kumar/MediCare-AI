import React from "react";
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
} from "react-native";
import colors from "../constants/colors";

interface Props {
  text?: string;
}

export default function Loader({
  text = "Loading..."
}: Props) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    color: colors.text,
  },
});
