import api from "../api/axios";

export const getHealthDashboard =
  async () => {

  const response =
    await api.get(
      "/dashboard/health-score"
    );

  return response.data;
};