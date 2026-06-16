import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message';

const api = axios.create({
  baseURL: "https://medicare-ai-sb6p.onrender.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("medicare_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const { response, message } = error;
    
    // Handle Network Errors
    if (!response) {
      Toast.show({
        type: 'error',
        text1: 'Network Error',
        text2: 'Please check your internet connection.',
      });
      return Promise.reject(error);
    }

    // Handle Unauthenticated
    if (response.status === 401) {
      await AsyncStorage.removeItem("medicare_token");
      // Ideally redirect to login or trigger refresh token
    }

    // Global Error Reporting
    const errorMsg = (response.data as any)?.detail || message || 'Something went wrong';
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: errorMsg,
    });

    return Promise.reject(error);
  }
);

export default api;
