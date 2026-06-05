import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Send } from "lucide-react-native";
import { Palette, Spacing, Typography, Shadow, BorderRadius } from "../../src/constants/theme";
import { sendMessageToAI } from "../../src/services/aiService";
import { voiceService } from "../../src/services/voice.service";
import { useTranslation } from "react-i18next";
import AIChatBubble from "../../src/components/chat/AIChatBubble";
import VoiceAssistantButton from "../../src/components/VoiceAssistantButton";

interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
  timestamp: string;
}

export default function AIChatScreen() {
  const { i18n } = useTranslation();
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: "ai",
      text: "Hello 👋 I am MediCare AI. I can help you understand your symptoms or medical reports. How are you feeling today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const flatListRef = useRef<FlatList>(null);

  const getVoiceLang = () => {
    const lang = i18n.language;
    const map: Record<string, string> = {
      en: 'en-IN', hi: 'hi-IN', te: 'te-IN',
      ta: 'ta-IN', kn: 'kn-IN', ml: 'ml-IN',
      bn: 'bn-IN', mr: 'mr-IN',
    };
    return map[lang] ?? 'en-IN';
  };

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await sendMessageToAI("user-123", textToSend, i18n.language);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        text: response.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiMsg]);

      // Auto-speak AI response in voice mode
      if (isListening) {
        await voiceService.speak(aiMsg.text, getVoiceLang());
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const startVoiceMode = async () => {
    setIsListening(true);
    await voiceService.startListening(
      (result) => setInput(result),
      () => {
        setIsListening(false);
        if (input.trim()) handleSend();
      },
      getVoiceLang()
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={Typography.h2}>MediCare AI</Text>
        <Text style={Typography.caption}>Always active • Highly Secure</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AIChatBubble
            message={item.text}
            isAi={item.role === 'ai'}
            timestamp={item.timestamp}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      {loading && <AIChatBubble message="" isAi={true} isLoading={true} />}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        <View style={styles.inputContainer}>
          <VoiceAssistantButton
            isListening={isListening}
            onSpeechStart={startVoiceMode}
            size={48}
          />

          <TextInput
            style={styles.input}
            placeholder="Describe your symptoms..."
            placeholderTextColor={Palette.grey[400]}
            value={input}
            onChangeText={setInput}
            multiline
          />

          <TouchableOpacity
            style={[styles.sendButton, !input.trim() && { opacity: 0.5 }]}
            onPress={() => handleSend()}
            disabled={!input.trim()}
          >
            <Send color="#FFFFFF" size={20} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Palette.grey[100],
    alignItems: 'center',
  },
  listContent: {
    padding: Spacing.md,
    paddingBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: Palette.grey[100],
  },
  input: {
    flex: 1,
    backgroundColor: Palette.grey[100],
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginHorizontal: Spacing.sm,
    maxHeight: 100,
    fontSize: 16,
    color: Palette.grey[900],
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Palette.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadow.sm,
  },
});