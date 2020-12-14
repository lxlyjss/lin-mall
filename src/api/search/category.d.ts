/**
 * imgUrl: 图片地址
 * id：图片id
 * title：图片标题
 */
export interface getCategoryRes {
  categories: {
    name: string;
    id: number;
    parent_id: string;
    children: {
      name: string;
      id: number;
      parent_id: string;
    }[];
  }[];
  hot_tags: {
    name: string;
    id: number;
    parent_id: string;
    click_num: number;
    type: string;
  }[];
}
