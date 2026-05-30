import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Palette, Spacing, Typography, Shadow, BorderRadius } from "../src/constants/theme";
import { User, Settings, Languages, Globe, Eye, LogOut, ChevronRight } from "lucide-react-native";
import { useAccessibility } from "../src/context/AccessibilityContext";
import { useTranslation } from "react-i18next";
import { setLanguage } from "../src/store/languageStore";

export default function ProfileScreen() {
    const { isElderlyMode, toggleElderlyMode } = useAccessibility();
    const { t, i18n } = useTranslation();

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'hi', name: 'Hindi' },
        { code: 'te', name: 'Telugu' },
        { code: 'tm', name: 'Tamil' },
    ];

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <View style={styles.avatar}>
                        <User color={Palette.primary.main} size={40} />
                    </View>
                    <Text style={Typography.h2}>Bhavi</Text>
                    <Text style={[Typography.body2, { color: Palette.grey[500] }]}>bhavi@example.com</Text>
                </View>

                <View style={styles.section}>
                    <Text style={[Typography.h3, styles.sectionTitle]}>{t('settings')}</Text>
                    
                    <View style={styles.settingCard}>
                        <View style={styles.settingInfo}>
                            <Eye color={Palette.primary.main} size={24} />
                            <Text style={[Typography.body1, { marginLeft: Spacing.md }]}>Elderly Mode (Large Text)</Text>
                        </View>
                        <Switch 
                            value={isElderlyMode} 
                            onValueChange={toggleElderlyMode}
                            trackColor={{ false: Palette.grey[200], true: Palette.primary.main }}
                        />
                    </View>

                    <View style={styles.settingCard}>
                        <View style={styles.settingInfo}>
                            <Globe color={Palette.primary.main} size={24} />
                            <Text style={[Typography.body1, { marginLeft: Spacing.md }]}>App Language</Text>
                        </View>
                        <View style={styles.langList}>
                            {languages.map(lang => (
                                <TouchableOpacity 
                                    key={lang.code}
                                    style={[
                                        styles.langButton, 
                                        i18n.language === lang.code && styles.langButtonActive
                                    ]}
                                    onPress={() => setLanguage(lang.code, true)}
                                >
                                    <Text style={[
                                        styles.langText,
                                        i18n.language === lang.code && styles.langTextActive
                                    ]}>{lang.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.logoutButton}>
                    <LogOut color={Palette.error.main} size={20} />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={Typography.caption}>MediCare AI v1.0.0</Text>
                    <Text style={Typography.caption}>Made with ❤️ for Accessibility</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Palette.grey[50],
    },
    scrollContent: {
        padding: Spacing.md,
    },
    header: {
        alignItems: 'center',
        marginVertical: Spacing.xl,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Palette.primary.light,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    section: {
        marginTop: Spacing.md,
    },
    sectionTitle: {
        marginBottom: Spacing.md,
        color: Palette.grey[500],
        fontSize: 14,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    settingCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: Spacing.md,
        ...Shadow.sm,
    },
    settingInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    langList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: Spacing.sm,
    },
    langButton: {
        paddingHorizontal: Spacing.sm,
        paddingVertical: 4,
        borderRadius: BorderRadius.sm,
        marginRight: Spacing.xs,
        borderWidth: 1,
        borderColor: Palette.grey[200],
    },
    langButtonActive: {
        backgroundColor: Palette.primary.main,
        borderColor: Palette.primary.main,
    },
    langText: {
        ...Typography.caption,
        color: Palette.grey[600],
    },
    langTextActive: {
        color: '#FFFFFF',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Spacing.xl,
        padding: Spacing.md,
    },
    logoutText: {
        color: Palette.error.main,
        fontWeight: '600',
        marginLeft: Spacing.sm,
        fontSize: 16,
    },
    footer: {
        alignItems: 'center',
        marginTop: Spacing.xxl,
        opacity: 0.5,
    },
});
