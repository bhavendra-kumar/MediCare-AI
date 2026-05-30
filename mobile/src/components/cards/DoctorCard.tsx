import React from "react";

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

import { Star } from "lucide-react-native";

import colors from "../../constants/colors";

interface Props {
    name: string;
    specialty: string;
    rating: number;
    onPress?: () => void;
}

export default function DoctorCard({
    name,
    specialty,
    rating,
    onPress,
}: Props) {
    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={onPress}
        >
            <View style={styles.avatar} />

            <View style={styles.info}>
                <Text style={styles.name}>
                    {name}
                </Text>

                <Text style={styles.specialty}>
                    {specialty}
                </Text>

                <View style={styles.ratingRow}>
                    <Star
                        size={16}
                        color="#F59E0B"
                        fill="#F59E0B"
                    />

                    <Text style={styles.rating}>
                        {rating}
                    </Text>
                </View>
            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>
                    Book
                </Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,

        borderRadius: 24,

        padding: 18,

        marginBottom: 18,

        flexDirection: "row",
        alignItems: "center",

        borderWidth: 1,
        borderColor: colors.border,
    },

    avatar: {
        width: 70,
        height: 70,

        borderRadius: 35,

        backgroundColor: colors.blueSoft,
    },

    info: {
        flex: 1,
        marginLeft: 16,
    },

    name: {
        fontSize: 18,
        fontWeight: "700",
        color: colors.text,
    },

    specialty: {
        marginTop: 5,
        color: colors.subText,
    },

    ratingRow: {
        flexDirection: "row",
        alignItems: "center",

        marginTop: 10,
    },

    rating: {
        marginLeft: 6,
        fontWeight: "600",
    },

    button: {
        backgroundColor: colors.primary,

        paddingHorizontal: 18,
        paddingVertical: 10,

        borderRadius: 14,
    },

    buttonText: {
        color: "#FFFFFF",
        fontWeight: "700",
    },
});