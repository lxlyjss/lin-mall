import request from "../request";
import * as TYPES from "./category.d";
import { RES } from "@/api/base";

/**
 * 接口路径
 * /mock 请求mock地址
 * /api 请求正常地址
 */
export const getCategory = async () => {
  return await request.get<RES<TYPES.getCategoryRes>>("/api/h5/categories")
}