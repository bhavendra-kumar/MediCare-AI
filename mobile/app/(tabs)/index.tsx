import React, {
    useEffect,
    useState,
} from "react";

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
} from "react-native";

import {
    SafeAreaView
} from "react-native-safe-area-context";

import colors
    from "../../src/constants/colors";

import {
    getHealthDashboard
} from "../../src/services/dashboardService";

export default function HomeScreen() {

    const [dashboard, setDashboard] =
        useState<any>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        fetchDashboard();

    }, []);

    const fetchDashboard =
        async () => {

            try {

                const response =
                    await getHealthDashboard();

                setDashboard(
                    response.data
                );

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);
            }
        };

    if (loading) {

        return (
            <View style={styles.loader}>

                <ActivityIndicator
                    size="large"
                    color={colors.primary}
                />

            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>

            <ScrollView>

                <Text style={styles.title}>
                    Health Dashboard
                </Text>

                {/* Score Card */}

                <View style={styles.scoreCard}>

                    <Text style={styles.scoreLabel}>
                        Health Score
                    </Text>

                    <Text style={styles.score}>
                        {dashboard.health_score}
                    </Text>

                    <Text style={styles.risk}>
                        Risk: {dashboard.risk_level}
                    </Text>

                </View>

                {/* Summary */}

                <View style={styles.card}>

                    <Text style={styles.cardTitle}>
                        AI Summary
                    </Text>

                    <Text style={styles.summary}>
                        {dashboard.summary}
                    </Text>

                </View>

                {/* Timeline */}

                <View style={styles.card}>

                    <Text style={styles.cardTitle}>
                        Medical Timeline
                    </Text>

                    {dashboard.timeline.map(
                        (item: any, index: number) => (

                            <View
                                key={index}
                                style={styles.timelineItem}
                            >

                                <Text style={styles.timelineTitle}>
                                    {item.title}
                                </Text>

                                <Text style={styles.timelineDate}>
                                    {item.date}
                                </Text>

                            </View>
                        ))}

                </View>

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

    loader: {
        flex: 1,

        justifyContent: "center",
        alignItems: "center",

        backgroundColor:
            colors.background,
    },

    title: {
        marginTop: 10,

        fontSize: 32,
        fontWeight: "700",

        color: colors.text,
    },

    scoreCard: {
        marginTop: 30,

        backgroundColor:
            colors.primary,

        borderRadius: 28,

        padding: 30,
    },

    scoreLabel: {
        color: "#FFFFFF",

        fontSize: 18,
    },

    score: {
        color: "#FFFFFF",

        fontSize: 56,
        fontWeight: "700",

        marginTop: 10,
    },

    risk: {
        color: "#FFFFFF",

        marginTop: 8,

        fontSize: 16,
    },

    card: {
        marginTop: 24,

        backgroundColor:
            colors.white,

        borderRadius: 24,

        padding: 22,

        borderWidth: 1,
        borderColor:
            colors.border,
    },

    cardTitle: {
        fontSize: 22,
        fontWeight: "700",

        marginBottom: 18,

        color: colors.text,
    },

    summary: {
        fontSize: 16,

        lineHeight: 28,

        color: colors.subText,
    },

    timelineItem: {
        marginBottom: 18,
    },

    timelineTitle: {
        fontSize: 16,
        fontWeight: "600",

        color: colors.text,
    },

    timelineDate: {
        marginTop: 4,

        color: colors.subText,
    },
});