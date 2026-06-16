import * as Speech from "expo-speech";

export const speakText = async (text: string, language: string) => {
  let voiceLanguage = "en-IN";

  switch (language) {
    case "hi":
      voiceLanguage = "hi-IN";
      break;
    case "te":
      voiceLanguage = "te-IN";
      break;
    case "ta":
      voiceLanguage = "ta-IN";
      break;
    case "kn":
      voiceLanguage = "kn-IN";
      break;
    case "ml":
      voiceLanguage = "ml-IN";
      break;
    case "bn":
      voiceLanguage = "bn-IN";
      break;
    case "mr":
      voiceLanguage = "mr-IN";
      break;
    default:
      voiceLanguage = "en-IN";
  }

  Speech.speak(text, {
    language: voiceLanguage,
    pitch: 1,
    rate: 0.9,
  });
};
