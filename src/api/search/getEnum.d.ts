export interface getFilterPersonRes {
  requirements: {
    money: {
      id: number;
      name: string;
    }[];
    work_time: {
      name: string;
      id: number;
    }[];
    school_level: {
      id: number;
      name: string;
    }[];
    work_nature: {
      id: number;
      name: string;
    }[];
  };
  tags: {
    id: number;
    name: string;
  }[];
}

export interface getFilterCompanyRes {
  office_worker_num: {
    name: string;
    id: number;
  }[];
  financing_level: {
    id: number;
    name: string;
  }[];
  industry_attribute: {
    id: number;
    name: string;
  }[];
}