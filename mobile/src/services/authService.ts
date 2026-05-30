import api from "./apiClient";

import { ENDPOINTS }
from "../api/endpoints";

export const signupUser = async (
  data: any
) => {

  const response = await api.post(
    ENDPOINTS.AUTH.SIGNUP,
    data
  );

  return response.data;
};

export const loginUser = async (
  data: any
) => {

  const response = await api.post(
    ENDPOINTS.AUTH.LOGIN,
    data
  );

  return response.data;
};