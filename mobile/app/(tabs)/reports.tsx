import React, { useState } from "react";

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from "react-native";

import * as DocumentPicker
    from "expo-document-picker";

import { SafeAreaView }
    from "react-native-safe-area-context";

import colors
    from "../../src/constants/colors";

import { uploadReport }
    from "../../src/services/reportService";

export default function ReportsScreen() {

    const [loading, setLoading] =
        useState(false);

    const [analysis, setAnalysis] =
        useState("");

    const pickDocument = async () => {

        const result =
            await DocumentPicker.getDocumentAsync({
                type: "*/*",
            });

        if (result.canceled) return;

        const file =
            result.assets[0];

        const formData = new FormData();

        formData.append(
            "file",
            {
                uri: file.uri,
                type:
                    file.mimeType ||
                    "image/jpeg",

                name:
                    file.name ||
                    "report.jpg",
            } as any
        );

        try {

            setLoading(true);

            const response =
                await uploadReport(
                    formData
                );

            setAnalysis(
                response.analysis
            );

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.title}>
                Medical Reports
            </Text>

            <TouchableOpacity
                style={styles.uploadButton}
                onPress={pickDocument}
            >

                <Text style={styles.uploadText}>
                    Upload Report
                </Text>

            </TouchableOpacity>

            {loading && (
                <ActivityIndicator
                    size="large"
                    color={colors.primary}
                    style={{
                        marginTop: 40,
                    }}
                />
            )}

            {analysis ? (
                <ScrollView
                    style={styles.resultCard}
                >

                    <Text style={styles.resultTitle}>
                        AI Analysis
                    </Text>

                    <Text style={styles.resultText}>
                        {analysis}
                    </Text>

                </ScrollView>
            ) : null}

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor:
            colors.background,

        paddingHorizontal: 20,
    },

    title: {
        marginTop: 10,

        fontSize: 32,
        fontWeight: "700",

        color: colors.text,
    },

    uploadButton: {
        marginTop: 30,

        height: 58,

        borderRadius: 18,

        backgroundColor:
            colors.primary,

        justifyContent: "center",
        alignItems: "center",
    },

    uploadText: {
        color: "#FFFFFF",

        fontWeight: "700",
        fontSize: 16,
    },

    resultCard: {
        marginTop: 30,

        backgroundColor:
            colors.white,

        borderRadius: 22,

        padding: 20,

        borderWidth: 1,
        borderColor:
            colors.border,
    },

    resultTitle: {
        fontSize: 22,
        fontWeight: "700",

        marginBottom: 18,

        color: colors.text,
    },

    resultText: {
        fontSize: 16,

        lineHeight: 28,

        color: colors.subText,
    },
});