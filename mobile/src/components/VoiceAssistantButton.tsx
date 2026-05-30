import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Animated, Easing } from 'react-native';
import { Mic, MicOff } from 'lucide-react-native';
import { Palette, Shadow } from '../constants/theme';
import * as Haptics from 'expo-haptics';

interface VoiceAssistantButtonProps {
  onSpeechStart?: () => void;
  onSpeechEnd?: (result: string) => void;
  isListening: boolean;
  size?: number;
}

const VoiceAssistantButton: React.FC<VoiceAssistantButtonProps> = ({
  onSpeechStart,
  onSpeechEnd,
  isListening,
  size = 64
}) => {
  const pulseAnim = new Animated.Value(1);

  useEffect(() => {
    if (isListening) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isListening]);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (isListening) {
      // Logic for stopping speech recognition would go here or be handled by parent
    } else {
      onSpeechStart?.();
    }
  };

  return (
    <View style={styles.container}>
      {isListening && (
        <Animated.View
          style={[
            styles.pulse,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              transform: [{ scale: pulseAnim }],
            },
          ]}
        />
      )}
      <TouchableOpacity
        onPress={handlePress}
        style={[
          styles.button,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: isListening ? Palette.error.main : Palette.primary.main,
          },
          Shadow.lg,
        ]}
        activeOpacity={0.8}
      >
        {isListening ? (
          <MicOff color="#FFFFFF" size={size * 0.4} />
        ) : (
          <Mic color="#FFFFFF" size={size * 0.4} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulse: {
    position: 'absolute',
    backgroundColor: Palette.primary.main,
    opacity: 0.3,
  },
});

export default VoiceAssistantButton;
