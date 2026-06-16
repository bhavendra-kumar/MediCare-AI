import React, {
    useEffect,
    useState,
} from "react";

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
} from "react-native";

import {
    SafeAreaView
} from "react-native-safe-area-context";

import {
    LineChart
} from "react-native-chart-kit";

import colors
    from "../src/constants/colors";

import {
    getHealthInsights
} from "../src/services/healthInsightsService";

const screenWidth =
    Dimensions.get("window").width;

export default function HealthInsightsScreen() {

    const [data, setData] =
        useState<any>(null);

    useEffect(() => {

        fetchInsights();

    }, []);

    const fetchInsights =
        async () => {

            try {

                const response =
                    await getHealthInsights();

                setData(
                    response.data
                );

            } catch (error) {

                console.log(error);
            }
        };

    if (!data) return null;

    return (
        <SafeAreaView style={styles.container}>

            <ScrollView>

                <Text style={styles.title}>
                    Health Insights
                </Text>

                {/* Health Score */}

                <View style={styles.scoreCard}>

                    <Text style={styles.scoreLabel}>
                        Health Score
                    </Text>

                    <Text style={styles.score}>
                        {data.health_score}
                    </Text>

                    <Text style={styles.risk}>
                        Risk: {data.risk_level}
                    </Text>

                </View>

                {/* Weekly Trend Chart */}

                <View style={styles.card}>

                    <Text style={styles.cardTitle}>
                        Weekly Health Trend
                    </Text>

                    <LineChart
                        data={{
                            labels: Object.keys(
                                data.weekly_trends
                            ),

                            datasets: [
                                {
                                    data: Object.values(
                                        data.weekly_trends
                                    ),
                                },
                            ],
                        }}

                        width={screenWidth - 60}

                        height={220}

                        yAxisSuffix="%"

                        chartConfig={{
                            backgroundGradientFrom:
                                "#FFFFFF",

                            backgroundGradientTo:
                                "#FFFFFF",

                            decimalPlaces: 0,

                            color: (opacity = 1) =>
                                `rgba(37, 99, 235, ${opacity})`,

                            labelColor: () =>
                                "#6B7280",
                        }}

                        bezier

                        style={{
                            borderRadius: 16,
                        }}
                    />

                </View>

                {/* Insights */}

                <View style={styles.card}>

                    <Text style={styles.cardTitle}>
                        AI Insights
                    </Text>

                    {data.insights.map(
                        (
                            insight: string,
                            index: number
                        ) => (

                            <Text
                                key={index}
                                style={styles.insight}
                            >
                                • {insight}
                            </Text>
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
    },

    card: {
        marginTop: 24,

        backgroundColor:
            colors.white,

        borderRadius: 24,

        padding: 20,

        borderWidth: 1,
        borderColor:
            colors.border,
    },

    cardTitle: {
        fontSize: 22,
        fontWeight: "700",

        marginBottom: 20,

        color: colors.text,
    },

    insight: {
        marginBottom: 12,

        fontSize: 16,

        color: colors.subText,

        lineHeight: 26,
    },
});