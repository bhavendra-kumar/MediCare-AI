import React from "react";

import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
} from "react-native";

import colors from "../../constants/colors";

interface Props {
    title: string;
    onPress?: () => void;
    loading?: boolean;
}

export default function CustomButton({
    title,
    onPress,
    loading = false,
}: Props) {
    return (
        <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={onPress}
        >
            {loading ? (
                <ActivityIndicator color="#FFFFFF" />
            ) : (
                <Text style={styles.text}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 58,
        backgroundColor: colors.primary,
        borderRadius: 18,

        justifyContent: "center",
        alignItems: "center",
    },

    text: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },
});

