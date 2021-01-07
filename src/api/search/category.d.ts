/**
 * imgUrl: 图片地址
 * id：图片id
 * title：图片标题
 */
export interface getCategoryRes {
  categories: {
    name: string;
    id: number;
    children: {
      name: string;
      id: number;
    }[];
  }[];
  hot_jobs: string[];
  hot_companies: string[];
}
