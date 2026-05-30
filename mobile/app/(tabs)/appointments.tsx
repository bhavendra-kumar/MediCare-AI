import React, {
    useEffect,
    useState,
} from "react";

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
} from "react-native";

import {
    SafeAreaView
} from "react-native-safe-area-context";

import colors
    from "../../src/constants/colors";

import {
    getDoctors,
    bookAppointment,
} from "../../src/services/appointmentService";

export default function AppointmentsScreen() {

    const [doctors, setDoctors] =
        useState<any[]>([]);

    useEffect(() => {

        fetchDoctors();

    }, []);

    const fetchDoctors =
        async () => {

            try {

                const response =
                    await getDoctors();

                setDoctors(
                    response.data
                );

            } catch (error) {

                console.log(error);
            }
        };

    const handleBooking =
        async (doctor: string) => {

            try {

                await bookAppointment({
                    doctor,
                    date: "Tomorrow",
                    time: "10:00 AM",
                });

                Alert.alert(
                    "Success",
                    "Appointment booked"
                );

            } catch (error) {

                console.log(error);
            }
        };

    return (
        <SafeAreaView style={styles.container}>

            <ScrollView>

                <Text style={styles.title}>
                    Doctors
                </Text>

                {doctors.map((doctor) => (

                    <View
                        key={doctor.id}
                        style={styles.card}
                    >

                        <Text style={styles.name}>
                            {doctor.name}
                        </Text>

                        <Text style={styles.specialization}>
                            {doctor.specialization}
                        </Text>

                        <Text style={styles.info}>
                            {doctor.experience}
                        </Text>

                        <Text style={styles.info}>
                            ⭐ {doctor.rating}
                        </Text>

                        <TouchableOpacity
                            style={styles.button}

                            onPress={() =>
                                handleBooking(
                                    doctor.name
                                )
                            }
                        >

                            <Text style={styles.buttonText}>
                                Book Appointment
                            </Text>

                        </TouchableOpacity>

                    </View>
                ))}

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

    name: {
        fontSize: 22,
        fontWeight: "700",

        color: colors.text,
    },

    specialization: {
        marginTop: 8,

        color: colors.primary,

        fontWeight: "600",
    },

    info: {
        marginTop: 6,

        color: colors.subText,
    },

    button: {
        marginTop: 20,

        height: 52,

        borderRadius: 18,

        backgroundColor:
            colors.primary,

        justifyContent: "center",
        alignItems: "center",
    },

    buttonText: {
        color: "#FFFFFF",

        fontWeight: "700",
    },
});