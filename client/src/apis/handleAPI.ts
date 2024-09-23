import axiosInstance from "./axiosInstance";

export const handleAPI = async (
  url: string,
  data?: any,
  method?: "POST" | "PUT" | "GET" | "DELETE",
) => {
  return await axiosInstance(url, {
    method: method ?? "GET",
    data,
  });
};
