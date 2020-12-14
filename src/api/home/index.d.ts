/**
 * imgUrl: 图片地址
 * id：图片id
 * title：图片标题
 */
export interface company {
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
}
export interface banners {
  image_url: string;
  id: number;
  connect_url: string;
  image_url: string;
  sort: string;
}
export interface getHomeDataInfoRes {
  jobs: {
    id: number;
    name: string;
    tags: string[];
    work_year_tag: string;
    work_city: string[];
    work_space: string;
    school_level: string;
    job_content: string;
    company_id: number;
    money_start: number;
    money_end: number;
    is_recommend: number;
    company: company;
  }[];
  banners: banners[];
}
