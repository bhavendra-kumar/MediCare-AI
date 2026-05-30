import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Send, Volume2, VolumeX } from "lucide-react-native";
import { Palette, Spacing, Typography, Shadow, BorderRadius } from "../../src/constants/theme";
import { sendMessageToAI } from "../../src/services/aiService";
import { voiceService } from "../../src/services/voice.service";
import { useTranslation } from "react-i18next";
import AIChatBubble from "../../src/components/chat/AIChatBubble";
import VoiceAssistantButton from "../../src/components/VoiceAssistantButton";
import socket from "../../src/services/socketService";

interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
  timestamp: string;
}

export default function AIChatScreen() {
  const { t, i18n } = useTranslation();
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
      
      // Auto-speak in voice mode
      if (isListening) {
        await voiceService.speak(aiMsg.text, i18n.language === 'en' ? 'en-US' : 'hi-IN');
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
        // Automatically send when user stops talking
        if (input) handleSend();
      },
      i18n.language === 'en' ? 'en-US' : 'hi-IN'
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
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
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

        {loading && <Loader text="MediCare AI is thinking..." />}

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