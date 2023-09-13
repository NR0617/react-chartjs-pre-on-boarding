import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 10000,
});

const param = "/response";
const getData = async (param: any) => {
  const result = await axiosInstance.get(param);
  return result.data;
};

export { param, getData };
