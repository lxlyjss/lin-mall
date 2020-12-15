import request from "../request";
import * as TYPES from "./company.d";
import { RES, PAGE } from "@/api/base";

/**
 * 接口路径
 * /mock 请求mock地址
 * /api 请求正常地址
 */
export const getCompany = async (params: TYPES.getCompanyParams) => {
  return await request.get<RES<PAGE<TYPES.getCompanyRes>>>("/api/h5/company")
}