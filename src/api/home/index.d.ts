import { getPositionList } from ".";

export interface getHomeDataInfoParams {
  keyword: number;
  page?: number;
  page_num?: number;
}
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
    total: number;
    next_page_url: string;
    data: {
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
    }[]
  };
  banners: banners[];
}

export interface gerPositionListParams {
  /**
   * 岗位名称。
   */
  name?: string;

  /**
   * 每页个数。默认10
   */
  per_page: number;
  /**
   * 页数
   */
  page: number;
  /**
   * 工作城市.
   */
  work_city?: string;
  /**
   * 工作省份.
   */
  work_province?: string;
  /**
   * 工作区县.
   */
  work_space?: string;

  /**
   * 标签id，五险一金。 多个id，英文逗号分隔。
   */
  tag_id?: string;

  /**
   * 岗位工资
   */
  money?: string;

  /**
   * 工作经验。
   */
  work_time?: string;

  /**
   * 学历。
   */
  school_level?: string;

  /**
   * 工作性质。
   */
  work_nature?: string;

  /**
   * 公司规模。
   */
  office_worker_num?: string;

  /**
   * 融资轮。eg:A轮
   */
  financing_level?: string;
  industry_attribute?: string;
}
export interface getPositionListRes {
  data: {
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
  };
}
export interface getPositionRes {
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
  courses: {
    totalCount: number;
    result: {
      list: any[];
    }
  }
}

export interface getWechatConfigRes {
  appId: string;
  nonceStr: string;
  timestamp: number;
  signature: string;
}