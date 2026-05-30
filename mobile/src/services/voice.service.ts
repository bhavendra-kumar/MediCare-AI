import * as Speech from 'expo-speech';
import { ExpoSpeechRecognitionModule, type ExpoSpeechRecognitionResultEvent } from 'expo-speech-recognition';
import * as Haptics from 'expo-haptics';

class VoiceService {
  private isSpeaking = false;
  private recognitionActive = false;

  async speak(text: string, language: string = 'en-US') {
    try {
      if (this.isSpeaking) {
        await this.stopSpeaking();
      }
      
      this.isSpeaking = true;
      
      // Use shorter chunks for long text to allow interruption
      return new Promise((resolve) => {
        Speech.speak(text, {
          language,
          pitch: 1.0,
          rate: 0.9,
          onDone: () => {
            this.isSpeaking = false;
            resolve(true);
          },
          onStopped: () => {
            this.isSpeaking = false;
            resolve(false);
          },
          onError: () => {
            this.isSpeaking = false;
            resolve(false);
          }
        });
      });
    } catch (e) {
      console.error("Speech Synthesis Error:", e);
      return false;
    }
  }

  async stopSpeaking() {
    await Speech.stop();
    this.isSpeaking = false;
  }

  async startListening(onResult: (text: string) => void, onEnd: () => void, language: string = 'en-IN') {
    try {
      if (!ExpoSpeechRecognitionModule) return false;

      const { granted } = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!granted) return false;

      this.recognitionActive = true;
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      ExpoSpeechRecognitionModule.start({
        lang: language,
        interimResults: true,
        continuous: false,
        requiresOnDeviceRecognition: false,
        addsPunctuation: true,
      });

      const resultListener = ExpoSpeechRecognitionModule.addListener('result', (event: ExpoSpeechRecognitionResultEvent) => {
        if (event.results[0]?.transcript) {
          onResult(event.results[0].transcript);
        }
      });

      const endListener = ExpoSpeechRecognitionModule.addListener('end', () => {
        this.recognitionActive = false;
        onEnd();
        resultListener.remove();
        endListener.remove();
      });

      return true;
    } catch (error) {
      this.recognitionActive = false;
      console.error('Speech recognition error:', error);
      return false;
    }
  }

  stopListening() {
    if (this.recognitionActive) {
      ExpoSpeechRecognitionModule?.stop();
      this.recognitionActive = false;
    }
  }
}

export const voiceService = new VoiceService();


