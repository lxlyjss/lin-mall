import request from "../request";
import * as TYPES from "./company.d";
import { RES, PAGE } from "@/api/base";

/**
 * 接口路径
 * /mock 请求mock地址
 * /api 请求正常地址
 */
export const getCompany = async (params: TYPES.getCompanyParams) => {
  return await request.get<RES<PAGE<TYPES.getCompanyRes>>>("/api/h5/company", {
    params,
  });
};
export const getCompanyDetail = async (id: number) => {
  return await request.get<RES<TYPES.getCompanyDetailRes>>(
    "/api/h5/company/" + id
  );
};
export const getCompanyPosition = async (id: number) => {
  return await request.get<RES<TYPES.getCompanyPositionRes>>(
    "/api/h5/job/company/" + id
  );
};
