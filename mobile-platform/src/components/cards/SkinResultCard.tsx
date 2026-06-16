import React from "react";

import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import colors from "../../constants/colors";

interface Props {
    condition: string;
    confidence: string;
    recommendation: string;
}

export default function SkinResultCard({
    condition,
    confidence,
    recommendation,
}: Props) {
    return (
        <View style={styles.card}>
            <Text style={styles.condition}>
                {condition}
            </Text>

            <Text style={styles.confidence}>
                Confidence: {confidence}
            </Text>

            <Text style={styles.recommendation}>
                {recommendation}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,

        borderRadius: 24,

        padding: 22,

        marginTop: 24,

        borderWidth: 1,
        borderColor: colors.border,
    },

    condition: {
        fontSize: 22,
        fontWeight: "700",

        color: colors.text,
    },

    confidence: {
        marginTop: 12,

        color: colors.primary,

        fontWeight: "700",
    },

    recommendation: {
        marginTop: 16,

        lineHeight: 28,

        color: colors.subText,
    },
});