import api from "./axios";

import { getToken } from "../store/authStorage";

api.interceptors.request.use(
    async (config) => {
        const token = await getToken();

        if (token) {
            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

export default api;
