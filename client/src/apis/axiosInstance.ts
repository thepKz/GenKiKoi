import axios from "axios";

const getAccessToken = () => {
  const res = localStorage.getItem("customer_GenKiKoi");
  try {
    if (res) {
      const auth = JSON.parse(res);
      return auth && auth.token ? auth.token : "";
    }
    return "";
  } catch (error) {
    console.error("Error parsing localStorage token:", error);
    return "";
  }
};

// Tạo một axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Interceptor cho request để thêm Authorization header
axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers["Content-Type"] = "application/json";
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor cho response để xử lý phản hồi và lỗi
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      return Promise.reject(error.response.data);
    } else if (error.request) {
      console.error("Error request:", error.request);
      return Promise.reject("No response from server.");
    } else {
      console.error("Error during request setup:", error.message);
      return Promise.reject(error.message);
    }
  }
);

export default axiosInstance;
