import request from "../request";
import * as TYPES from "./getEnum.d";
import { RES } from "@/api/base";

/**
 * 接口路径
 * /mock 请求mock地址
 * /api 请求正常地址
 */
/**
 * 搜索页面获取对人的要求
 */
export const getFilterPerson = async () => {
  return await request.get<RES<TYPES.getFilterPersonRes>>("/api/h5/requirements/people")
}
/**
 * 搜索页面获取对公司的要求
 */
export const getFilterCompany = async () => {
  return await request.get<RES<TYPES.getFilterCompanyRes>>("/api/h5/requirements/company")
}
