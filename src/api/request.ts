import axios from "axios";
import { Toast } from "vant";

console.log(process.env.VUE_APP_BASE_API_LQ_URL, process.env.VUE_APP_MOCK_API_URL);
const instance = axios.create({
  baseURL:
    process.env.VUE_APP_ENV === "dev" ? "" : process.env.VUE_APP_BASE_API_LQ_URL,
  timeout: 20000,
});
instance.interceptors.request.use(
  (config: any) => {
    console.log(config);
    // 如果接口地址包含mock字段，则走mock地址
    if (config.url && config.url.indexOf("mock") > -1) {
      instance.defaults.baseURL = `${process.env.VUE_APP_MOCK_API_URL}/api`;
    }
    Toast.loading({
      message: "请求中...",
      loadingType: "spinner"
    })
    return config;
  },
  (error: any) => {
    console.log(error);
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response: any) => {
    console.log(response);
    const res = response.data;
    Toast.clear()
    if (response.status === 200 || response.status === 302 || response.status === 304) {
      return response;
    } else {
      Toast("请求失败，请重试~");
      return Promise.reject(response);
    }
  },
  (error: any) => {
    console.log(error);
    return Promise.reject(error);
  }
);
// axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8"

export default instance;
