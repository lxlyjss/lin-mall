const company = () =>
  import(/* webpackChunkName: "company" */ "../views/company/index.vue");
const companyPosition = () =>
  import(/* webpackChunkName: "company" */ "../views/company/position.vue");
const companyLocation = () =>
  import(/* webpackChunkName: "company" */ "../views/company/locationMap.vue");

export default [
  {
    path: "/company",
    name: "company",
    component: company,
    meta: {
      title: "公司主页"
    }
  },
  {
    path: "/company-position",
    name: "companyPosition",
    component: companyPosition,
    meta: {
      title: "公司招聘职位"
    }
  },
  {
    path: "/company-location",
    name: "companyLocation",
    component: companyLocation,
    meta: {
      title: "公司位置"
    }
  }
];
