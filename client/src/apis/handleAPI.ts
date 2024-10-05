import axiosInstance from "./axiosInstance";

export const handleAPI = async (
  url: string,
  data?: any,
  method?: "POST" | "PUT" | "GET" | "DELETE" | "PATCH",
) => {
  return await axiosInstance(url, {
    method: method ?? "GET",
    data,
  });
};
