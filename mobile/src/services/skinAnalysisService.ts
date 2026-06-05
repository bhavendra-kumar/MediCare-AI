import api from "./apiClient";

export const analyzeSkin =
  async (
    formData: FormData
  ) => {

  const response =
    await api.post(
      "/skin/analyze",
      formData
    );

  return response.data;
};