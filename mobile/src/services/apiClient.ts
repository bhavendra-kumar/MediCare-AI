import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getNetworkStatus } from "../store/networkStore";

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000',
  timeout: 15000,
});

apiClient.interceptors.request.use(
  async (config) => {
    if (!getNetworkStatus()) {
      return Promise.reject({
        message: "No internet connection"
      });
    }

    const token = await AsyncStorage.getItem("medicare_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      await AsyncStorage.removeItem("medicare_token");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
