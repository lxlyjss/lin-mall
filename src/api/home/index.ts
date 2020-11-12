import request from "../request";

/**
 * 接口路径
 * /mock 请求mock地址
 * /api 请求正常地址
 */
interface res<T> {
  status: number;
  data: T;
  msg: string;
}
interface result {
  list: any[];
}
export const getBannerList = async () => {
  return await request.get<res<result>>("/mock/home/getBannerList")
}
