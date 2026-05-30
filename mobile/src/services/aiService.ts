import api from "./apiClient";

export const sendMessageToAI = async (
  user_id: string,
  message: string,
  language: string = "en"
) => {
  const response = await api.post(
    "/ai/chat",
    {
      user_id,
      message,
      language
    }
  );

  return response.data;
};