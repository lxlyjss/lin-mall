import request from "../request";
import * as TYPES from "./index.d";
import { RES } from "@/api/base";

/**
 * 接口路径
 * /mock 请求mock地址
 * /api 请求正常地址
 */
export const getBannerList = async () => {
  return await request.get<RES<TYPES.getBannerListRes>>("/mock/home/getBannerList")
}
export const getPositionList = async () => {
  return await request.get<RES<TYPES.getPositionListRes>>("/mock/home/getPositionList")
}