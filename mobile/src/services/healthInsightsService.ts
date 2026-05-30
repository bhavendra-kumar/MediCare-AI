import api from "../api/axios";

export const getHealthInsights =
  async () => {

  const response =
    await api.get(
      "/health-insights"
    );

  return response.data;
};