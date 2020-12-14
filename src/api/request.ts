import axios from "axios";
import { Toast } from "vant";

console.log(process.env.VUE_APP_BASE_API_URL, process.env.VUE_APP_MOCK_API_URL);
const instance = axios.create({
  baseURL:
    process.env.VUE_APP_ENV === "dev" ? "" : process.env.VUE_APP_BASE_API_URL,
  timeout: 20000,
});
instance.interceptors.request.use(
  (config) => {
    console.log(config);
    // 如果接口地址包含mock字段，则走mock地址
    if (config.url && config.url.indexOf("mock") > -1) {
      instance.defaults.baseURL = `${process.env.VUE_APP_MOCK_API_URL}/api`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => {
    console.log(response);
    const res = response.data;
    if (response.status === 200 || response.status === 302 || response.status === 304) {
      return response;
    } else {
      Toast("请求失败，请重试~");
      return Promise.reject(response);
    }
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
// axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8"

export default instance;
