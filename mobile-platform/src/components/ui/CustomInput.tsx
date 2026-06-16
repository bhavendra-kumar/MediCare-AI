import React from "react";

import {
    View,
    TextInput,
    StyleSheet,
    TextInputProps,
} from "react-native";

import colors from "../../constants/colors";

interface Props extends TextInputProps {
    placeholder: string;
}

export default function CustomInput({
    placeholder,
    ...rest
}: Props) {
    return (
        <View style={styles.container}>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                style={styles.input}
                {...rest}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 58,
        backgroundColor: colors.white,
        borderRadius: 18,

        borderWidth: 1,
        borderColor: colors.border,

        justifyContent: "center",

        paddingHorizontal: 18,

        marginBottom: 18,
    },

    input: {
        fontSize: 16,
        color: colors.text,
    },
});