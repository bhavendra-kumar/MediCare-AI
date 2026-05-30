import React from "react";

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import colors from "../src/constants/colors";

export default function EmergencyScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <TouchableOpacity style={styles.sosButton}>
                    <Text style={styles.sosText}>
                        SOS
                    </Text>
                </TouchableOpacity>

                <Text style={styles.title}>
                    Emergency Assistance
                </Text>

                <Text style={styles.subtitle}>
                    Instantly alert emergency contacts and nearby healthcare providers.
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

        paddingHorizontal: 24,
    },

    sosButton: {
        width: 180,
        height: 180,

        borderRadius: 90,

        backgroundColor: colors.danger,

        justifyContent: "center",
        alignItems: "center",
    },

    sosText: {
        color: "#FFFFFF",

        fontSize: 42,
        fontWeight: "700",
    },

    title: {
        marginTop: 40,

        fontSize: 32,
        fontWeight: "700",

        color: colors.text,
    },

    subtitle: {
        marginTop: 16,

        textAlign: "center",

        fontSize: 17,
        lineHeight: 28,

        color: colors.subText,
    },
});