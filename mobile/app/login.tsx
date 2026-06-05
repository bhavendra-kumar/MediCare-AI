import React, { useState, useContext } from "react";

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";

import colors from "../src/constants/colors";

import CustomInput from "../src/components/ui/CustomInput";
import CustomButton from "../src/components/ui/CustomButton";

import { loginUser } from "../src/services/authService";
import { saveToken, setOnboardingCompleted } from "../src/store/authStorage";
import { AuthContext } from "../src/context/AuthContext";

export default function LoginScreen() {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please fill in all required fields.");
            return;
        }

        try {
            setLoading(true);

            const response = await loginUser({
                email,
                password,
            });

            if (response.success) {
                await saveToken(response.token);
                await setOnboardingCompleted();
                login(response.token, response.user);
                router.replace("/(tabs)");
            } else {
                Alert.alert("Login Failed", response.message || "Invalid credentials.");
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
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>
                        Welcome Back
                    </Text>

                    <Text style={styles.subtitle}>
                        Login to continue using MediCare AI
                    </Text>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    <CustomInput 
                        placeholder="Email Address" 
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />

                    <CustomInput
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TouchableOpacity>
                        <Text style={styles.forgot}>
                            Forgot Password?
                        </Text>
                    </TouchableOpacity>

                    <CustomButton
                        title="Login"
                        onPress={handleLogin}
                        loading={loading}
                    />
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Don’t have an account?
                    </Text>

                    <TouchableOpacity
                        onPress={() => router.push("/signup")}
                    >
                        <Text style={styles.signup}>
                            Sign Up
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
        paddingTop: 70,
    },

    header: {
        marginBottom: 50,
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

    forgot: {
        alignSelf: "flex-end",
        marginBottom: 30,
        color: colors.primary,
        fontSize: 15,
        fontWeight: "600",
    },

    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: "auto",
        paddingBottom: 40,
    },

    footerText: {
        color: colors.subText,
        fontSize: 15,
    },

    signup: {
        marginLeft: 5,
        color: colors.primary,
        fontWeight: "700",
        fontSize: 15,
    },
});