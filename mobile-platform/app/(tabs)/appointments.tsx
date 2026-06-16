import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Palette, Spacing, Typography } from "../../src/constants/theme";
import { getDoctors, bookAppointment } from "../../src/services/appointmentService";
import DoctorCard from "../../src/components/cards/DoctorCard";
import FullScreenLoader from "../../src/components/FullScreenLoader";

export default function AppointmentsScreen() {
    const [doctors, setDoctors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchDoctors = useCallback(async () => {
        try {
            const response = await getDoctors();
            setDoctors(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        fetchDoctors();
    }, [fetchDoctors]);

    const onRefresh = () => {
        setRefreshing(true);
        fetchDoctors();
    };

    const handleBooking = async (doctor: any) => {
        try {
            setLoading(true);
            await bookAppointment({
                doctor_id: doctor.id,
                date: "Tomorrow",
                time: "10:00 AM",
            });
            Alert.alert("Success", `Appointment booked with ${doctor.name}`);
        } catch (error) {
            Alert.alert("Error", "Could not book appointment. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const renderDoctor = ({ item }: { item: any }) => (
        <DoctorCard 
            name={item.name}
            specialty={item.specialization}
            rating={item.rating || 4.8}
            onPress={() => handleBooking(item)}
        />
    );

    if (loading && !refreshing) {
        return <FullScreenLoader visible={true} message="Finding nearby doctors..." />;
    }

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Text style={Typography.h2}>Specialists</Text>
            </View>

            <FlatList
                data={doctors}
                renderItem={renderDoctor}
                keyExtractor={(item) => item?.id?.toString() || item?._id?.toString() || Math.random().toString()}
                contentContainerStyle={styles.listContent}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={Typography.body1}>No specialists found in your area.</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Palette.grey[50],
    },
    header: {
        padding: Spacing.md,
        backgroundColor: '#FFFFFF',
    },
    listContent: {
        padding: Spacing.md,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 100,
    },
});