import * as Notifications
from "expo-notifications";
import { Platform } from "react-native";

// expo-notifications functionality is limited in Expo Go.
// We wrap it to prevent crashes or major warnings where possible.
if (Platform.OS !== "web") {
  Notifications.setNotificationHandler({
    handleNotification:
      async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
}

export const scheduleNotification =
  async (
    title: string,
    body: string,
    seconds: number
  ) => {

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },

    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds,
    },
  });
};