import axios from "axios";

export const api = axios.create({ baseURL: "/api/heliosai" });

const wait = (ms: number) =>
  new Promise<void>((resolve) => window.setTimeout(resolve, ms));

export const mockRequest = async <T>(data: T, delay = 500): Promise<T> => {
  const response = await api.request<T>({
    url: "/mock",
    method: "GET",
    adapter: async (config) => {
      await wait(delay);
      return { data, status: 200, statusText: "OK", headers: {}, config };
    },
  });
  return response.data;
};
