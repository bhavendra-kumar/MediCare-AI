import { 
  type ExpoSpeechRecognitionResultEvent 
} from "expo-speech-recognition";
// Use dynamic import for the module to avoid crash in Expo Go
let ExpoSpeechRecognitionModule: any;
try {
  ExpoSpeechRecognitionModule = require("expo-speech-recognition").ExpoSpeechRecognitionModule;
} catch (e) {
  console.warn("ExpoSpeechRecognitionModule not found");
}

let recognitionListener: any = null;

export const startVoiceRecognition = async (
  language: string,
  onResult: (text: string) => void
) => {
  if (!ExpoSpeechRecognitionModule) {
    console.warn("Speech recognition is not supported in this environment (likely Expo Go).");
    return;
  }
  let recognitionLanguage = "en-IN";

  switch (language) {
    case "hi":
      recognitionLanguage = "hi-IN";
      break;
    case "te":
      recognitionLanguage = "te-IN";
      break;
    case "ta":
      recognitionLanguage = "ta-IN";
      break;
    case "kn":
      recognitionLanguage = "kn-IN";
      break;
    case "ml":
      recognitionLanguage = "ml-IN";
      break;
    case "bn":
      recognitionLanguage = "bn-IN";
      break;
    case "mr":
      recognitionLanguage = "mr-IN";
      break;
  }

  const available = ExpoSpeechRecognitionModule.isRecognitionAvailable();

  if (!available) {
    console.warn("Speech recognition is not available on this device");
    return;
  }

  const { granted } = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
  if (!granted) {
    console.warn("Speech recognition permission not granted");
    return;
  }

  if (recognitionListener) {
    recognitionListener.remove();
  }

  recognitionListener = ExpoSpeechRecognitionModule.addListener("result", (event: ExpoSpeechRecognitionResultEvent) => {
    const text = event.results[0]?.transcript;
    if (text) {
      onResult(text);
    }
  });

  ExpoSpeechRecognitionModule.start({
    lang: recognitionLanguage,
    interimResults: true,
    maxAlternatives: 1,
    continuous: false,
  });
};

export const stopVoiceRecognition = () => {
  ExpoSpeechRecognitionModule.stop();
  if (recognitionListener) {
    recognitionListener.remove();
    recognitionListener = null;
  }
};
