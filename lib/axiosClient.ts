import axios from "axios";
const axiosClient = axios.create({
    baseURL: process.env.backend,
    withCredentials: true
});

axiosClient.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosClient