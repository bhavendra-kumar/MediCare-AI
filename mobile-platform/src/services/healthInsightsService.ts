import api from "./apiClient";

export const getHealthInsights =
  async () => {

  const response =
    await api.get(
      "/health-insights"
    );

  return response.data;
};