const company = () =>
  import(/* webpackChunkName: "home" */ "../views/company/index.vue");

export default [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/company",
    name: "company",
    component: company,
    meta: {
      title: "公司主页"
    }
  }
];
