import React, { useState, useEffect } from "react";

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    FlatList,
    Platform,
} from "react-native";

import * as DocumentPicker
    from "expo-document-picker";

import { SafeAreaView }
    from "react-native-safe-area-context";

import colors
    from "../../src/constants/colors";

import { uploadReport }
    from "../../src/services/reportService";

import api from "../../src/services/apiClient";

export default function ReportsScreen() {

    const [loading, setLoading] =
        useState(false);

    const [analysis, setAnalysis] =
        useState("");

    const [history, setHistory] = useState<any[]>([]);
    const [loadingHistory, setLoadingHistory] = useState(false);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            setLoadingHistory(true);
            const response = await api.get("/reports/history");
            if (response.data.success) {
                setHistory(response.data.data || []);
            }
        } catch (error) {
            console.log("Error fetching history:", error);
        } finally {
            setLoadingHistory(false);
        }
    };

    const pickDocument = async () => {

        const result =
            await DocumentPicker.getDocumentAsync({
                type: "*/*",
            });

        if (result.canceled) return;

        const file =
            result.assets[0];

        const formData = new FormData();

        if (Platform.OS === "web") {
            // On Web, document picker returns a File object or blob
            // We use the 'file' property if available, or fetch the blob from URI
            if (file.file) {
                formData.append("file", file.file);
            } else {
                const response = await fetch(file.uri);
                const blob = await response.blob();
                formData.append("file", blob, file.name);
            }
        } else {
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
        }

        try {

            setLoading(true);

            const response =
                await uploadReport(
                    formData
                );

            setAnalysis(
                response.analysis
            );
            fetchHistory(); // Refresh history after upload

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
                <View style={{ maxHeight: 300 }}>
                    <ScrollView
                        style={styles.resultCard}
                    >

                        <Text style={styles.resultTitle}>
                            AI Analysis
                        </Text>

                        <Text style={styles.resultText}>
                            {analysis}
                        </Text>
                        <TouchableOpacity 
                            onPress={() => setAnalysis("")}
                            style={{ marginTop: 10 }}
                        >
                            <Text style={{ color: colors.primary, fontWeight: '600' }}>Close Analysis</Text>
                        </TouchableOpacity>

                    </ScrollView>
                </View>
            ) : null}

            <Text style={[styles.title, { fontSize: 24, marginTop: 20 }]}>
                Report History
            </Text>

            {loadingHistory ? (
                <ActivityIndicator color={colors.primary} />
            ) : (
                <FlatList
                    data={history}
                    keyExtractor={(item, index) => item._id || index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.historyCard}>
                            <Text style={styles.historyDate}>
                                {new Date(item.created_at || Date.now()).toLocaleDateString()}
                            </Text>
                            <Text numberOfLines={2} style={styles.historyPreview}>
                                {item.analysis}
                            </Text>
                            <TouchableOpacity 
                                onPress={() => setAnalysis(item.analysis)}
                            >
                                <Text style={{ color: colors.primary, marginTop: 5 }}>View Full Analysis</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>No reports yet.</Text>
                    }
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}

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
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 20,
    },
    uploadText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
    resultCard: {
        marginTop: 20,
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    resultTitle: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 10,
        color: colors.primary,
    },
    resultText: {
        fontSize: 16,
        lineHeight: 24,
        color: colors.text,
    },
    historyCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
        marginTop: 15,
        elevation: 1,
    },
    historyDate: {
        fontSize: 12,
        color: "#666",
        marginBottom: 5,
    },
    historyPreview: {
        fontSize: 14,
        color: colors.text,
    },
    emptyText: {
        textAlign: "center",
        marginTop: 40,
        color: "#999",
        fontSize: 16,
    }
});
