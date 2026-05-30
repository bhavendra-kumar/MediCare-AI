import React from "react";

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import colors from "../src/constants/colors";

export default function ProfileScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <View style={styles.avatar} />

                    <Text style={styles.name}>
                        Bhavi
                    </Text>

                    <Text style={styles.email}>
                        bhavi@example.com
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.label}>
                        Blood Group
                    </Text>

                    <Text style={styles.value}>
                        O+
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.label}>
                        Height
                    </Text>

                    <Text style={styles.value}>
                        178 cm
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.label}>
                        Weight
                    </Text>

                    <Text style={styles.value}>
                        72 kg
                    </Text>
                </View>
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

    header: {
        alignItems: "center",
        marginTop: 30,
        marginBottom: 40,
    },

    avatar: {
        width: 110,
        height: 110,

        borderRadius: 55,

        backgroundColor: colors.blueSoft,
    },

    name: {
        marginTop: 20,

        fontSize: 28,
        fontWeight: "700",

        color: colors.text,
    },

    email: {
        marginTop: 8,
        color: colors.subText,
    },

    card: {
        backgroundColor: colors.white,

        borderRadius: 24,

        padding: 20,

        marginBottom: 18,

        borderWidth: 1,
        borderColor: colors.border,
    },

    label: {
        color: colors.subText,
        marginBottom: 8,
    },

    value: {
        fontSize: 20,
        fontWeight: "700",
        color: colors.text,
    },
});