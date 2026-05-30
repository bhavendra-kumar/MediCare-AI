import api from "../api/axios";

export const analyzeSkin =
  async (
    formData: FormData
  ) => {

  const response =
    await api.post(
      "/skin/analyze",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

  return response.data;
};