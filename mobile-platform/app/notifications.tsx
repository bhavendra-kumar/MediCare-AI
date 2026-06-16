import React from "react";

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import colors from "../src/constants/colors";

const notifications = [
    "Appointment confirmed for tomorrow at 4 PM",
    "Blood report analysis completed",
    "Reminder: Take your medications",
];

export default function NotificationsScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>
                    Notifications
                </Text>

                {notifications.map((item, index) => (
                    <View
                        key={index}
                        style={styles.card}
                    >
                        <Text style={styles.text}>
                            {item}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 24,
    },

    title: {
        marginTop: 10,

        fontSize: 34,
        fontWeight: "700",

        color: colors.text,

        marginBottom: 30,
    },

    card: {
        backgroundColor: colors.white,

        borderRadius: 22,

        padding: 20,

        marginBottom: 18,

        borderWidth: 1,
        borderColor: colors.border,
    },

    text: {
        fontSize: 16,
        lineHeight: 26,
        color: colors.text,
    },
});