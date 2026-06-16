import * as Speech from "expo-speech";
import { type ExpoSpeechRecognitionResultEvent } from "expo-speech-recognition";

let ExpoSpeechRecognitionModule: any;
try {
  ExpoSpeechRecognitionModule = require("expo-speech-recognition").ExpoSpeechRecognitionModule;
} catch (e) {
  console.warn("ExpoSpeechRecognitionModule not found in this environment");
}

let isConversationActive = false;
let recognitionListener: any = null;
let endListener: any = null;

export const startContinuousVoiceMode = async (
  language: string,
  onUserSpeech: (text: string) => Promise<void>
) => {
  if (!ExpoSpeechRecognitionModule) {
    console.warn("Speech recognition is not supported in this environment (likely Expo Go).");
    return;
  }
  isConversationActive = true;

  let recognitionLanguage = "en-IN";
  switch (language) {
    case "hi": recognitionLanguage = "hi-IN"; break;
    case "te": recognitionLanguage = "te-IN"; break;
    case "ta": recognitionLanguage = "ta-IN"; break;
    case "kn": recognitionLanguage = "kn-IN"; break;
    case "ml": recognitionLanguage = "ml-IN"; break;
    case "bn": recognitionLanguage = "bn-IN"; break;
    case "mr": recognitionLanguage = "mr-IN"; break;
  }

  const startListening = async () => {
    if (!isConversationActive) return;

    const available = ExpoSpeechRecognitionModule.isRecognitionAvailable();
    if (!available) return;

    const { granted } = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!granted) return;

    ExpoSpeechRecognitionModule.start({
      lang: recognitionLanguage,
      interimResults: true,
      continuous: false,
      maxAlternatives: 1,
    });
  };

  // Clean up old listeners
  if (recognitionListener) recognitionListener.remove();
  if (endListener) endListener.remove();

  recognitionListener = ExpoSpeechRecognitionModule.addListener("result", async (event: ExpoSpeechRecognitionResultEvent) => {
    if (event.isFinal) {
      const text = event.results[0]?.transcript;
      if (!text) return;

      // Stop AI speaking if user interrupts
      Speech.stop();

      // Temporarily stop listening while user is speaking/processing
      ExpoSpeechRecognitionModule.stop();

      await onUserSpeech(text);
    }
  });

  endListener = ExpoSpeechRecognitionModule.addListener("end", () => {
    if (isConversationActive) {
      // Auto-restart listening if it ended (e.g. timeout or silence)
      // but only if we are not currently speaking an AI response
      Speech.isSpeakingAsync().then((speaking) => {
        if (!speaking && isConversationActive) {
          startListening();
        }
      });
    }
  });

  startListening();
};

export const speakAIResponse = async (text: string, language: string) => {
  if (!isConversationActive) return;

  let voiceLanguage = "en-IN";
  switch (language) {
    case "hi": voiceLanguage = "hi-IN"; break;
    case "te": voiceLanguage = "te-IN"; break;
    case "ta": voiceLanguage = "ta-IN"; break;
    case "kn": voiceLanguage = "kn-IN"; break;
    case "ml": voiceLanguage = "ml-IN"; break;
    case "bn": voiceLanguage = "bn-IN"; break;
    case "mr": voiceLanguage = "mr-IN"; break;
  }

  Speech.speak(text, {
    language: voiceLanguage,
    pitch: 1,
    rate: 0.9,
    onDone: () => {
      if (isConversationActive) {
        // Restart speech recognition after AI finishes speaking
        ExpoSpeechRecognitionModule.start({
          lang: voiceLanguage, // Using the same voice/recognition lang
          interimResults: true,
          continuous: false,
        });
      }
    },
  });
};

export const stopContinuousVoiceMode = () => {
  isConversationActive = false;
  Speech.stop();
  ExpoSpeechRecognitionModule.stop();
  if (recognitionListener) {
    recognitionListener.remove();
    recognitionListener = null;
  }
  if (endListener) {
    endListener.remove();
    endListener = null;
  }
};
