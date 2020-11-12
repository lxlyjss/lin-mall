/**
 * 请求返回值类型
 * status： 0：正常，1：异常
 * msg：异常信息
 */
export interface RES<T> {
  status: number;
  data: T;
  msg: string;
}