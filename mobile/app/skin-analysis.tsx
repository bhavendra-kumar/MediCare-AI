import React, { useState } from "react";

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    ActivityIndicator,
} from "react-native";

import * as ImagePicker
    from "expo-image-picker";

import {
    SafeAreaView
} from "react-native-safe-area-context";

import colors
    from "../src/constants/colors";

import {
    analyzeSkin
} from "../src/services/skinAnalysisService";

export default function SkinAnalysisScreen() {

    const [image, setImage] =
        useState<any>(null);

    const [analysis, setAnalysis] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const pickImage = async () => {

        const result =
            await ImagePicker.launchImageLibraryAsync({
                mediaTypes:
                    ImagePicker.MediaTypeOptions.Images,

                quality: 1,
            });

        if (!result.canceled) {

            const selectedImage =
                result.assets[0];

            setImage(selectedImage);

            const formData =
                new FormData();

            formData.append(
                "file",
                {
                    uri: selectedImage.uri,

                    type: "image/jpeg",

                    name: "skin.jpg",
                } as any
            );

            try {

                setLoading(true);

                const response =
                    await analyzeSkin(
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
        }
    };

    return (
        <SafeAreaView style={styles.container}>

            <ScrollView>

                <Text style={styles.title}>
                    Skin Analysis
                </Text>

                <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={pickImage}
                >

                    <Text style={styles.uploadText}>
                        Upload Skin Image
                    </Text>

                </TouchableOpacity>

                {image && (
                    <Image
                        source={{
                            uri: image.uri
                        }}
                        style={styles.image}
                    />
                )}

                {loading && (
                    <ActivityIndicator
                        size="large"
                        color={colors.primary}
                        style={{
                            marginTop: 30,
                        }}
                    />
                )}

                {analysis ? (
                    <View style={styles.resultCard}>

                        <Text style={styles.resultTitle}>
                            AI Analysis
                        </Text>

                        <Text style={styles.resultText}>
                            {analysis}
                        </Text>

                    </View>
                ) : null}

            </ScrollView>

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

    image: {
        width: "100%",
        height: 320,

        borderRadius: 22,

        marginTop: 30,
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