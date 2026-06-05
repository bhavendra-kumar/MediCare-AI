import api from "./apiClient";

export const uploadReport =
  async (
    formData: FormData
  ) => {

  const response =
    await api.post(
      "/reports/analyze",
      formData
    );

  return response.data;
};