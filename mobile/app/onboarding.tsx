import React, { useRef, useState } from "react";

import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from "react-native";

import PagerView from "react-native-pager-view";

import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";

import colors from "../src/constants/colors";
import { onboardingData } from "../src/data/onboardingData";

const { width } = Dimensions.get("window");

export default function OnboardingScreen() {
    const pagerRef = useRef<PagerView>(null);

    const [currentPage, setCurrentPage] = useState(0);

    const handleNext = () => {
        if (currentPage < onboardingData.length - 1) {
            pagerRef.current?.setPage(currentPage + 1);
        } else {
            router.push("/login");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Skip */}
            <TouchableOpacity style={styles.skipButton}>
                <Text style={styles.skipText}>SKIP</Text>
            </TouchableOpacity>

            {/* Pager */}
            <PagerView
                style={styles.pager}
                initialPage={0}
                ref={pagerRef}
                onPageSelected={(e) =>
                    setCurrentPage(e.nativeEvent.position)
                }
            >
                {onboardingData.map((item) => (
                    <View key={item.id} style={styles.page}>

                        {/* Illustration */}
                        <View style={styles.imageCard}>
                            <View style={styles.fakeImage} />
                        </View>

                        {/* Content */}
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>
                                {item.title}
                            </Text>

                            <Text style={styles.description}>
                                {item.description}
                            </Text>
                        </View>
                    </View>
                ))}
            </PagerView>

            {/* Bottom */}
            <View style={styles.bottomContainer}>

                {/* Dots */}
                <View style={styles.pagination}>
                    {onboardingData.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                currentPage === index && styles.activeDot,
                            ]}
                        />
                    ))}
                </View>

                {/* Button */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleNext}
                >
                    <Text style={styles.buttonText}>
                        {currentPage === 2 ? "GET STARTED" : "NEXT"}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    skipButton: {
        alignSelf: "flex-end",
        marginTop: 10,
        marginRight: 24,
    },

    skipText: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.subText,
    },

    pager: {
        flex: 1,
    },

    page: {
        width,
        alignItems: "center",
        paddingHorizontal: 24,
    },

    imageCard: {
        width: "100%",
        height: 380,
        backgroundColor: colors.white,
        borderRadius: 32,

        marginTop: 40,

        justifyContent: "center",
        alignItems: "center",

        borderWidth: 1,
        borderColor: colors.border,
    },

    fakeImage: {
        width: 220,
        height: 220,
        borderRadius: 24,
        backgroundColor: colors.blueSoft,
    },

    textContainer: {
        marginTop: 50,
        alignItems: "center",
    },

    title: {
        fontSize: 32,
        fontWeight: "700",
        color: colors.text,
        textAlign: "center",
        lineHeight: 40,
    },

    description: {
        marginTop: 18,
        fontSize: 17,
        color: colors.subText,
        textAlign: "center",
        lineHeight: 28,
        paddingHorizontal: 12,
    },

    bottomContainer: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },

    pagination: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 28,
    },

    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#D1D5DB",
        marginHorizontal: 5,
    },

    activeDot: {
        width: 26,
        backgroundColor: colors.primary,
    },

    button: {
        height: 58,
        borderRadius: 18,
        backgroundColor: colors.primary,

        justifyContent: "center",
        alignItems: "center",
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },
});