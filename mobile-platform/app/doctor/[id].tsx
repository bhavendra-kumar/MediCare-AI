import React from "react";

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import colors from "../../src/constants/colors";

export default function DoctorDetailScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.avatar} />

                <Text style={styles.name}>
                    Dr. Sarah Johnson
                </Text>

                <Text style={styles.specialty}>
                    Cardiologist
                </Text>

                <View style={styles.infoCard}>
                    <Text style={styles.sectionTitle}>
                        About Doctor
                    </Text>

                    <Text style={styles.description}>
                        Experienced cardiologist with 12+ years
                        in clinical healthcare and heart disease treatment.
                    </Text>
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.sectionTitle}>
                        Consultation Fee
                    </Text>

                    <Text style={styles.fee}>
                        ₹800
                    </Text>
                </View>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>
                        Book Appointment
                    </Text>
                </TouchableOpacity>
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

    avatar: {
        width: 140,
        height: 140,

        borderRadius: 70,

        backgroundColor: colors.blueSoft,

        alignSelf: "center",

        marginTop: 30,
    },

    name: {
        marginTop: 24,

        textAlign: "center",

        fontSize: 30,
        fontWeight: "700",

        color: colors.text,
    },

    specialty: {
        marginTop: 8,

        textAlign: "center",

        color: colors.subText,
        fontSize: 16,
    },

    infoCard: {
        backgroundColor: colors.white,

        borderRadius: 24,

        padding: 22,

        marginTop: 28,

        borderWidth: 1,
        borderColor: colors.border,
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",

        color: colors.text,
    },

    description: {
        marginTop: 14,

        lineHeight: 28,

        color: colors.subText,
    },

    fee: {
        marginTop: 12,

        fontSize: 28,
        fontWeight: "700",

        color: colors.primary,
    },

    button: {
        height: 58,

        backgroundColor: colors.primary,

        borderRadius: 18,

        marginTop: 40,
        marginBottom: 120,

        justifyContent: "center",
        alignItems: "center",
    },

    buttonText: {
        color: "#FFFFFF",

        fontWeight: "700",
        fontSize: 16,
    },
});