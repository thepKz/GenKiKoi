import axios from "axios";

const getAccessToken = (): string | null => {
  return localStorage.getItem("access_token");
};

// Tạo một axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor cho request để thêm Authorization header
axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers["Content-Type"] = "application/json";
  return config;
});

// Interceptor cho response để xử lý phản hồi và lỗi
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error.response?.data || error.message),
);

export default axiosInstance;