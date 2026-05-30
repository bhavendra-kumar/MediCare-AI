import React from "react";

import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import colors from "../../constants/colors";

interface Props {
    doctor: string;
    specialty: string;
    date: string;
}

export default function AppointmentCard({
    doctor,
    specialty,
    date,
}: Props) {
    return (
        <View style={styles.card}>
            <Text style={styles.doctor}>
                {doctor}
            </Text>

            <Text style={styles.specialty}>
                {specialty}
            </Text>

            <Text style={styles.date}>
                {date}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,

        borderRadius: 24,

        padding: 22,

        marginBottom: 18,

        borderWidth: 1,
        borderColor: colors.border,
    },

    doctor: {
        fontSize: 22,
        fontWeight: "700",
        color: colors.text,
    },

    specialty: {
        marginTop: 6,
        color: colors.subText,
    },

    date: {
        marginTop: 16,

        color: colors.primary,
        fontWeight: "700",
    },
});