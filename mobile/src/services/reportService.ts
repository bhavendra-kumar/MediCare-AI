import api from "../api/axios";

export const uploadReport =
  async (
    formData: FormData
  ) => {

  const response =
    await api.post(
      "/reports/analyze",
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