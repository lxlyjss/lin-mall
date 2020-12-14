/**
 * 请求返回值类型
 * status： 0：正常，1：异常
 * msg：异常信息
 */
export interface RES<T> {
  code: number;
  data: T;
}
export interface PAGE<T> {
  current_page: number;
  data: T;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}