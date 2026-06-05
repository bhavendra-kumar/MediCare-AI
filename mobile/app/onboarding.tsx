import React, { useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Palette, Spacing, Typography, BorderRadius, Shadows } from "../src/constants/theme";
import { onboardingData } from "../src/data/onboardingData";
import { ArrowRight, ChevronRight, Stethoscope, Brain, Shield } from "lucide-react-native";
import { LinearGradient } from 'expo-linear-gradient';
import OnboardingPager from "../src/components/OnboardingPager";
import { setOnboardingCompleted } from "../src/store/authStorage";

const { width, height } = Dimensions.get("window");

export default function OnboardingScreen() {
    const pagerRef = useRef<any>(null);
    const [currentPage, setCurrentPage] = useState(0);

    const handleNext = async () => {
        if (currentPage < onboardingData.length - 1) {
            pagerRef.current?.setPage(currentPage + 1);
        } else {
            await setOnboardingCompleted();
            router.push("/login");
        }
    };

    const getIcon = (id: number) => {
        switch(id) {
            case 1: return <Stethoscope size={80} color={Palette.primary.main} />;
            case 2: return <Brain size={80} color={Palette.secondary.main} />;
            case 3: return <Shield size={80} color={Palette.success.main} />;
            default: return <Stethoscope size={80} color={Palette.primary.main} />;
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[Palette.primary.light + '40', Palette.background.main]}
                style={StyleSheet.absoluteFill}
            />
            <SafeAreaView style={{ flex: 1 }}>
                {/* Skip */}
                <TouchableOpacity 
                    style={styles.skipButton}
                    onPress={async () => {
                        await setOnboardingCompleted();
                        router.push("/login");
                    }}
                >
                    <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>

                {/* Pager */}
                <OnboardingPager
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
                                <View style={styles.iconCircle}>
                                    {getIcon(item.id)}
                                </View>
                            </View>

                            {/* Content */}
                            <View style={styles.textContainer}>
                                <Text style={[Typography.h1, styles.title]}>
                                    {item.title}
                                </Text>

                                <Text style={[Typography.body1, styles.description]}>
                                    {item.description}
                                </Text>
                            </View>
                        </View>
                    ))}
                </OnboardingPager>

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
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={[Palette.primary.main, Palette.primary.dark]}
                            style={styles.gradientButton}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={styles.buttonText}>
                                {currentPage === onboardingData.length - 1 ? "Get Started" : "Next"}
                            </Text>
                            <ChevronRight size={20} color={Palette.common.white} />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Palette.background.main,
    },
    skipButton: {
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.md,
        alignSelf: 'flex-end',
    },
    skipText: {
        ...Typography.button,
        color: Palette.primary.main,
    },
    pager: {
        flex: 1,
    },
    page: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: Spacing.xl,
    },
    imageCard: {
        width: Math.min(width * 0.8, 300),
        height: Math.min(width * 0.8, 300),
        backgroundColor: Palette.common.white,
        borderRadius: Math.min(width * 0.4, 150),
        ...Shadows.lg,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.xxl,
    },
    iconCircle: {
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: Palette.primary.light + '30',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        alignItems: "center",
    },
    title: {
        textAlign: "center",
        marginBottom: Spacing.md,
        color: Palette.primary.dark,
    },
    description: {
        textAlign: "center",
        color: Palette.grey[600],
        lineHeight: 24,
    },
    bottomContainer: {
        paddingHorizontal: Spacing.xl,
        paddingBottom: Spacing.xxl,
        alignItems: "center",
    },
    pagination: {
        flexDirection: "row",
        marginBottom: Spacing.xxl,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Palette.primary.light,
        marginHorizontal: 5,
    },
    activeDot: {
        width: 28,
        backgroundColor: Palette.primary.main,
    },
    button: {
        width: '100%',
        borderRadius: BorderRadius.pill,
        overflow: 'hidden',
        ...Shadows.md,
    },
    gradientButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Spacing.lg,
        gap: Spacing.sm,
    },
    buttonText: {
        ...Typography.button,
        color: Palette.common.white,
        fontSize: 16,
    },
});
