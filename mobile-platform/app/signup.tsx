import React, { useState } from "react";

import {
    useContext
} from "react";

import {
    AuthContext
} from "../src/context/AuthContext";

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";

import colors from "../src/constants/colors";

import CustomInput from "../src/components/ui/CustomInput";
import CustomButton from "../src/components/ui/CustomButton";

import { signupUser } from "../src/services/authService";
import { saveToken, setOnboardingCompleted } from "../src/store/authStorage";

export default function SignupScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useContext(AuthContext);

    const handleSignup = async () => {
        if (!name || !email || !password) {
            Alert.alert("Error", "Please fill in all required fields.");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            const response = await signupUser({
                name,
                email,
                password,
            });

            if (response.success) {
                await saveToken(response.token);
                await setOnboardingCompleted();

                login(
                    response.token,
                    response.user
                );

                router.replace("/(tabs)");
            } else {
                Alert.alert("Signup Failed", response.message || "Something went wrong.");
            }
        } catch (error: any) {
            console.log(error);
            Alert.alert("Error", "Could not connect to the server. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <Text style={styles.title}>
                        Create Account
                    </Text>

                    <Text style={styles.subtitle}>
                        Join MediCare AI and access smarter healthcare.
                    </Text>
                </View>

                <View style={styles.form}>
                    <CustomInput
                        placeholder="Full Name"
                        value={name}
                        onChangeText={setName}
                    />

                    <CustomInput
                        placeholder="Email Address"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />

                    <CustomInput
                        placeholder="Phone Number"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                    />

                    <CustomInput
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    <CustomInput
                        placeholder="Confirm Password"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />

                    <CustomButton
                        title="Create Account"
                        onPress={handleSignup}
                        loading={loading}
                    />
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Already have an account?
                    </Text>

                    <TouchableOpacity
                        onPress={() => router.push("/login")}
                    >
                        <Text style={styles.login}>
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    content: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 40,
    },

    header: {
        marginBottom: 40,
    },

    title: {
        fontSize: 38,
        fontWeight: "700",
        color: colors.text,
    },

    subtitle: {
        marginTop: 12,
        fontSize: 17,
        color: colors.subText,
        lineHeight: 28,
    },

    form: {
        marginBottom: 40,
    },

    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: "auto",
    },

    footerText: {
        color: colors.subText,
        fontSize: 15,
    },

    login: {
        marginLeft: 5,
        color: colors.primary,
        fontWeight: "700",
        fontSize: 15,
    },
});