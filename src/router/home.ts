const home = () =>
  import(/* webpackChunkName: "home" */ "../views/home/index.vue");
const search = () =>
  import(/* webpackChunkName: "home" */ "../views/home/search.vue");

export default [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "home",
    component: home,
    meta: {
      title: "首页"
    }
  },
  {
    path: "/search",
    name: "search",
    component: search,
    meta: {
      title: "搜索职位"
    }
  },
];
