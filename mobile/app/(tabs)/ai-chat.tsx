import React, { useState, useEffect } from "react";

import socket from "../../src/services/socketService";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Send, Mic, MicOff, Volume2, VolumeX } from "lucide-react-native";
import colors from "../../src/constants/colors";
import { sendMessageToAI } from "../../src/services/aiService";
import { speakText } from "../../src/services/voiceService";
import { startVoiceRecognition, stopVoiceRecognition } from "../../src/services/speechRecognitionService";
import { 
  startContinuousVoiceMode, 
  stopContinuousVoiceMode, 
  speakAIResponse 
} from "../../src/services/continuousVoiceService";
import { useTranslation } from "react-i18next";

interface Message {
  role: "user" | "ai";
  text: string;
}

export default function AIChatScreen() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] =
    useState<Message[]>([
      {
        role: "ai",
        text: "Hello 👋 I am MediCare AI. Describe your symptoms.",
      },
    ]);

  const handleVoiceMode = async () => {
    if (voiceMode) {
      stopContinuousVoiceMode();
      setVoiceMode(false);
      return;
    }

    // Stop normal recording if active
    if (isRecording) {
      stopVoiceRecognition();
      setIsRecording(false);
    }

    setVoiceMode(true);
    await startContinuousVoiceMode(currentLanguage, async (spokenText) => {
      // Add user message to UI
      setMessages((prev) => [...prev, { role: "user", text: spokenText }]);
      
      try {
        setLoading(true);
        const data = await sendMessageToAI("demo-user", spokenText, currentLanguage);
        const aiResponse = data.response;

        setMessages((prev) => [...prev, { role: "ai", text: aiResponse }]);
        await speakAIResponse(aiResponse, currentLanguage);
      } catch (error) {
        console.error("AI Chat Error:", error);
      } finally {
        setLoading(false);
      }
    });
  };

  const handleSend = async () => {

    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      text: input,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    const currentInput = input;

    setInput("");

    try {

      setLoading(true);

      const data =
        await sendMessageToAI(
          "demo-user",
          currentInput,
          currentLanguage
        );

      const aiMessage: Message = {
        role: "ai",
        text: data.response,
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

      await speakText(data.response, currentLanguage);

    } catch (error) {

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Something went wrong. Please try again.",
        },
      ]);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    socket.on(
      "ai_stream",

      (data) => {

        setMessages((prev) => {

          const updated =
            [...prev];

          updated[
            updated.length - 1
          ] = {
            role: "ai",
            text: data.text,
          };

          return updated;
        });
      }
    );
  }, []);

  const toggleVoiceRecording = async () => {
    if (voiceMode) {
      stopContinuousVoiceMode();
      setVoiceMode(false);
    }

    if (isRecording) {
      stopVoiceRecognition();
      setIsRecording(false);
    } else {
      setIsRecording(true);
      await startVoiceRecognition(currentLanguage, (text) => {
        setInput(text);
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>
        MediCare AI
      </Text>

      <ScrollView
        style={styles.chatContainer}
        showsVerticalScrollIndicator={false}
      >

        {messages.map((msg, index) => (

          <View
            key={index}
            style={[
              styles.messageBubble,

              msg.role === "user"
                ? styles.userBubble
                : styles.aiBubble,
            ]}
          >

            <Text
              style={[
                styles.messageText,

                msg.role === "user"
                  ? styles.userText
                  : styles.aiText,
              ]}
            >
              {msg.text}
            </Text>

          </View>
        ))}

        {loading && (
          <ActivityIndicator
            size="small"
            color={colors.primary}
            style={{
              marginTop: 20,
            }}
          />
        )}

      </ScrollView>

      {/* Input */}

      <View style={styles.inputContainer}>

        <TouchableOpacity
          style={[
            styles.voiceModeButton,
            voiceMode && { backgroundColor: "#EF4444", shadowColor: "#EF4444" }
          ]}
          onPress={handleVoiceMode}
        >
          {voiceMode ? (
            <VolumeX size={24} color="#FFFFFF" />
          ) : (
            <Volume2 size={24} color="#FFFFFF" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.voiceButton}
          onPress={toggleVoiceRecording}
        >
          {isRecording ? (
            <MicOff size={20} color={colors.primary} />
          ) : (
            <Mic size={20} color={colors.text} />
          )}
        </TouchableOpacity>

        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Describe symptoms..."
          placeholderTextColor="#9CA3AF"
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSend}
        >
          <Send
            size={20}
            color="#FFFFFF"
          />
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },

  title: {
    marginTop: 10,

    fontSize: 32,
    fontWeight: "700",

    color: colors.text,
  },

  chatContainer: {
    flex: 1,
    marginTop: 20,
  },

  messageBubble: {
    maxWidth: "85%",

    padding: 18,

    borderRadius: 22,

    marginBottom: 18,
  },

  aiBubble: {
    alignSelf: "flex-start",

    backgroundColor: colors.white,

    borderWidth: 1,
    borderColor: colors.border,
  },

  userBubble: {
    alignSelf: "flex-end",

    backgroundColor: colors.primary,
  },

  messageText: {
    fontSize: 16,
    lineHeight: 26,
  },

  aiText: {
    color: colors.text,
  },

  userText: {
    color: "#FFFFFF",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },

  voiceModeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },

  voiceButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },

  input: {
    flex: 1,

    height: 58,

    backgroundColor: colors.white,

    borderRadius: 18,

    paddingHorizontal: 18,

    borderWidth: 1,
    borderColor: colors.border,
  },

  sendButton: {
    width: 58,
    height: 58,

    borderRadius: 18,

    backgroundColor: colors.primary,

    justifyContent: "center",
    alignItems: "center",

    marginLeft: 12,
  },
});