import React from "react";

import { Tabs } from "expo-router";

import {
    House,
    Calendar,
    Bot,
    FileText,
    Settings,
} from "lucide-react-native";

import colors from "../../src/constants/colors";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,

                tabBarStyle: {
                    height: 85,
                    paddingTop: 10,
                    paddingBottom: 20,

                    borderTopWidth: 1,
                    borderTopColor: colors.border,

                    backgroundColor: colors.white,
                },

                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: "#9CA3AF",
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",

                    tabBarIcon: ({ color, size }) => (
                        <House color={color} size={size} />
                    ),
                }}
            />

            <Tabs.Screen
                name="appointments"
                options={{
                    title: "Appointments",

                    tabBarIcon: ({ color, size }) => (
                        <Calendar color={color} size={size} />
                    ),
                }}
            />

            <Tabs.Screen
                name="ai-chat"
                options={{
                    title: "AI Chat",

                    tabBarIcon: ({ color, size }) => (
                        <Bot color={color} size={size} />
                    ),
                }}
            />

            <Tabs.Screen
                name="reports"
                options={{
                    title: "Reports",

                    tabBarIcon: ({ color, size }) => (
                        <FileText color={color} size={size} />
                    ),
                }}
            />

            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",

                    tabBarIcon: ({ color, size }) => (
                        <Settings color={color} size={size} />
                    ),
                }}
            />
        </Tabs>
    );
}