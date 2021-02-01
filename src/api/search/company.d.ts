import { PAGE } from "../base";

export interface getCompanyRes {
  id: number;
  simple_name: string;
  name: string;
  logo: string;
  content: string;
  financing_level: string;
  home_url: string;
  tags: string[];
  office_worker_num: number;
  city_name: string;
  regiter_money: string;
  location: string;
  build_date: string;
  law_people: string;
  job_num: number;
}
export interface getCompanyParams {
  page: number;
  per_page: number;
  work_city: string;
  keyword: string;
  work_province: string;
  work_space: string;
  industry_attribute: string;
  financing_level: string;
  office_worker_num: string;
}
export interface getCompanyDetailRes {}
export interface getCompanyPositionRes {}