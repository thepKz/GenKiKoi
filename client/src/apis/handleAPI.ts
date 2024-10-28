import axiosInstance from "./axiosInstance";

export const handleAPI = async (
  url: string,
  data?: any,
  method?: "POST" | "PUT" | "GET" | "DELETE" | "PATCH",
  params?: any,
) => {
  return await axiosInstance(url, {
    method: method ?? "GET",
    data,
    params,
  });
};
