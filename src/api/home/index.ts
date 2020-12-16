import request from "../request";
import * as TYPES from "./index.d";
import { RES, PAGE } from "@/api/base";

/**
 * 接口路径
 * /mock 请求mock地址
 * /api 请求正常地址
 */
export const getHomeDataInfo = async () => {
  return await request.get<RES<TYPES.getHomeDataInfoRes>>("/api/h5/home")
}

export const getPositionList = async (params: TYPES.gerPositionListParams) => {
  return await request.get<RES<PAGE<TYPES.getPositionListRes>>>("/api/h5/job")
}