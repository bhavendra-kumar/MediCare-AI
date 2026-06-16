import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Palette, Spacing, Typography, Shadow, BorderRadius } from "../../src/constants/theme";
import { getHealthDashboard } from "../../src/services/dashboardService";
import HealthStatCard from "../../src/components/cards/HealthStatCard";
import MedicalCard from "../../src/components/cards/MedicalCard";
import FullScreenLoader from "../../src/components/FullScreenLoader";
import { Activity, Heart, Thermometer, Droplets, AlertTriangle } from "lucide-react-native";

export default function HomeScreen() {
    const [dashboard, setDashboard] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const response = await getHealthDashboard();
            setDashboard(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchDashboard();
    };

    if (loading && !refreshing) {
        return <FullScreenLoader visible={true} message="Loading your health data..." />;
    }

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <View>
                    <Text style={[Typography.body2, { color: Palette.grey[500] }]}>Good Morning,</Text>
                    <Text style={Typography.h2}>John Doe</Text>
                </View>
                <TouchableOpacity style={styles.sosButton}>
                    <AlertTriangle color="#FFFFFF" size={20} />
                    <Text style={styles.sosText}>SOS</Text>
                </TouchableOpacity>
            </View>

            <ScrollView 
                contentContainerStyle={styles.scrollContent}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {/* Health Overview */}
                <MedicalCard 
                    title="Health Score" 
                    subtitle="Based on your recent reports"
                    icon={<Activity color={Palette.primary.main} />}
                >
                    <View style={styles.scoreRow}>
                        <Text style={[styles.scoreValue, { color: Palette.primary.main }]}>
                            {dashboard?.health_score || 85}
                        </Text>
                        <View style={styles.scoreInfo}>
                            <Text style={[Typography.h3, { color: Palette.success.main }]}>Excellent</Text>
                            <Text style={Typography.caption}>+2% from last month</Text>
                        </View>
                    </View>
                </MedicalCard>

                {/* Statistics Grid */}
                <View style={styles.statsGrid}>
                    <HealthStatCard 
                        label="Heart Rate" 
                        value="72" 
                        unit="bpm" 
                        icon={<Heart color="#EF4444" size={24} />}
                        color="#EF4444"
                        trend={{ value: '2%', type: 'up' }}
                    />
                    <HealthStatCard 
                        label="Body Temp" 
                        value="98.6" 
                        unit="°F" 
                        icon={<Thermometer color="#F59E0B" size={24} />}
                        color="#F59E0B"
                    />
                    <HealthStatCard 
                        label="Blood Glucose" 
                        value="110" 
                        unit="mg/dL" 
                        icon={<Droplets color="#3B82F6" size={24} />}
                        color="#3B82F6"
                    />
                    <HealthStatCard 
                        label="Oxygen Level" 
                        value="99" 
                        unit="%" 
                        icon={<Activity color="#10B981" size={24} />}
                        color="#10B981"
                    />
                </View>

                {/* Next Appointment */}
                <Text style={[Typography.h3, styles.sectionTitle]}>Upcoming Appointment</Text>
                <MedicalCard
                    title="Dr. Sarah Johnson"
                    subtitle="Cardiologist • Tomorrow, 10:00 AM"
                    variant="outlined"
                />

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Palette.grey[50],
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.md,
        backgroundColor: '#FFFFFF',
    },
    sosButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Palette.error.main,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.full,
        ...Shadow.sm,
    },
    sosText: {
        color: '#FFFFFF',
        fontWeight: '700',
        marginLeft: Spacing.xs,
    },
    scrollContent: {
        padding: Spacing.md,
    },
    scoreRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    scoreValue: {
        fontSize: 48,
        fontWeight: '800',
        marginRight: Spacing.md,
    },
    scoreInfo: {
        justifyContent: 'center',
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -Spacing.xs,
        marginTop: Spacing.sm,
    },
    sectionTitle: {
        marginTop: Spacing.lg,
        marginBottom: Spacing.md,
    },
});