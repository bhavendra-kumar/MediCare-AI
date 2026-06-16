import api from "./apiClient";

export const getDoctors =
  async () => {

  const response =
    await api.get(
      "/appointments/doctors"
    );

  return response.data;
};

export const bookAppointment =
  async (data: any) => {

  const response =
    await api.post(
      "/appointments/book",
      data
    );

  return response.data;
};

export const getAppointments =
  async () => {

  const response =
    await api.get(
      "/appointments"
    );

  return response.data;
};