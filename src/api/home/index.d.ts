/**
 * imgUrl: 图片地址
 * id：图片id
 * title：图片标题
 */
export interface getBannerListRes {
  list: {
    imgUrl: string;
    id: number;
    title: string;
  }[];
}
export interface getPositionListRes {
  list: any[];
}