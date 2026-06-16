import React, { useState } from "react";

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
    ScrollView,
} from "react-native";

import {
    scheduleNotification
} from "../../src/services/notificationService";

import { SafeAreaView } from "react-native-safe-area-context";

import {
    Globe,
    Bell,
    Shield,
    ChevronRight,
    LogOut,
    User,
} from "lucide-react-native";

import colors from "../../src/constants/colors";

import { useContext } from "react";
import { AuthContext } from "../../src/context/AuthContext";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { setLanguage } from "../../src/store/languageStore";

export default function SettingsScreen() {
    const [enabled, setEnabled] = useState(true);
    const { logout } = useContext(AuthContext);
    const { t, i18n } = useTranslation();

    const changeLang = (lang: string) => {
        setLanguage(lang);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>
                    {t("settings")}
                </Text>

                <Text style={styles.subtitle}>
                    Manage your clinical preferences and account security.
                </Text>

                {/* Language */}
                <View style={styles.card}>
                    <View style={styles.row}>
                        <Globe size={22} color={colors.text} />

                        <Text style={styles.cardTitle}>
                            Language Selection
                        </Text>
                    </View>

                    <View style={styles.languageContainer}>
                        <TouchableOpacity 
                            style={i18n.language === "en" ? styles.activeLanguage : styles.languageButton}
                            onPress={() => changeLang("en")}
                        >
                            <Text style={i18n.language === "en" ? styles.activeText : styles.languageText}>
                                English
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={i18n.language === "hi" ? styles.activeLanguage : styles.languageButton}
                            onPress={() => changeLang("hi")}
                        >
                            <Text style={i18n.language === "hi" ? styles.activeText : styles.languageText}>
                                Hindi
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={i18n.language === "te" ? styles.activeLanguage : styles.languageButton}
                            onPress={() => changeLang("te")}
                        >
                            <Text style={i18n.language === "te" ? styles.activeText : styles.languageText}>
                                Telugu
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Options */}
                <View style={styles.card}>
                    {/* Account */}
                    <TouchableOpacity style={styles.option}>
                        <View style={styles.left}>
                            <View style={styles.iconBox}>
                                <User size={20} color={colors.primary} />
                            </View>

                            <View>
                                <Text style={styles.optionTitle}>
                                    Account Settings
                                </Text>

                                <Text style={styles.optionSub}>
                                    Update profile and medical data
                                </Text>
                            </View>
                        </View>

                        <ChevronRight
                            size={20}
                            color="#9CA3AF"
                        />
                    </TouchableOpacity>

                    {/* Notifications */}
                    <View style={styles.option}>
                        <View style={styles.left}>
                            <View style={styles.iconBox}>
                                <Bell size={20} color={colors.primary} />
                            </View>

                            <View>
                                <Text style={styles.optionTitle}>
                                    Notifications
                                </Text>

                                <Text style={styles.optionSub}>
                                    Alerts and reminders
                                </Text>
                            </View>
                        </View>

                        <Switch
                            value={enabled}
                            onValueChange={setEnabled}
                        />
                    </View>

                    {/* Privacy */}
                    <TouchableOpacity style={styles.optionNoBorder}>
                        <View style={styles.left}>
                            <View style={styles.iconBox}>
                                <Shield size={20} color={colors.primary} />
                            </View>

                            <View>
                                <Text style={styles.optionTitle}>
                                    Privacy & Security
                                </Text>

                                <Text style={styles.optionSub}>
                                    Manage data permissions
                                </Text>
                            </View>
                        </View>

                        <ChevronRight
                            size={20}
                            color="#9CA3AF"
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.logoutButton}

                    onPress={() =>
                        scheduleNotification(
                            "Medicine Reminder 💊",
                            "Take your medicines on time.",
                            5
                        )
                    }
                >

                    <Text style={styles.logoutText}>
                        Test Reminder
                    </Text>

                </TouchableOpacity>

                {/* Logout */}
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={async () => {
                        await logout();
                        router.replace("/login");
                    }}
                >
                    <LogOut size={20} color={colors.danger} />

                    <Text style={styles.logoutText}>
                        Logout
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 24,
    },

    title: {
        marginTop: 10,

        fontSize: 40,
        fontWeight: "700",

        color: colors.text,
    },

    subtitle: {
        marginTop: 10,

        fontSize: 17,
        lineHeight: 28,

        color: colors.subText,
    },

    card: {
        backgroundColor: colors.white,

        borderRadius: 28,

        padding: 20,

        marginTop: 28,

        borderWidth: 1,
        borderColor: colors.border,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
    },

    cardTitle: {
        marginLeft: 12,

        fontSize: 22,
        fontWeight: "700",

        color: colors.text,
    },

    languageContainer: {
        flexDirection: "row",

        marginTop: 24,

        backgroundColor: "#F3F4F6",

        borderRadius: 18,

        padding: 6,
    },

    activeLanguage: {
        flex: 1,

        backgroundColor: colors.white,

        borderRadius: 14,

        paddingVertical: 14,

        alignItems: "center",
    },

    languageButton: {
        flex: 1,

        justifyContent: "center",
        alignItems: "center",
    },

    activeText: {
        fontWeight: "700",
        color: colors.text,
    },

    languageText: {
        color: colors.subText,
        fontWeight: "600",
    },

    option: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        paddingVertical: 20,

        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
    },

    optionNoBorder: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        paddingVertical: 20,
    },

    left: {
        flexDirection: "row",
        alignItems: "center",
    },

    iconBox: {
        width: 52,
        height: 52,

        borderRadius: 18,

        backgroundColor: colors.blueSoft,

        justifyContent: "center",
        alignItems: "center",

        marginRight: 16,
    },

    optionTitle: {
        fontSize: 17,
        fontWeight: "700",
        color: colors.text,
    },

    optionSub: {
        marginTop: 4,
        color: colors.subText,
    },

    logoutButton: {
        height: 58,

        borderRadius: 18,

        borderWidth: 1,
        borderColor: "#FECACA",

        backgroundColor: colors.white,

        marginTop: 40,
        marginBottom: 120,

        justifyContent: "center",
        alignItems: "center",

        flexDirection: "row",
    },

    logoutText: {
        marginLeft: 10,

        color: colors.danger,

        fontWeight: "700",
        fontSize: 16,
    },
});