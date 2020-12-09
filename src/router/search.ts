const searchIndex = () =>
  import(/* webpackChunkName: "home" */ "../views/search/index.vue");
const searchResult = () =>
  import(/* webpackChunkName: "home" */ "../views/search/result.vue");

export default [
  {
    path: "/search-index",
    name: "searchIndex",
    component: searchIndex,
    meta: {
      title: "搜索职位",
    },
  },
  {
    path: "/search-result",
    name: "searchResult",
    component: searchResult,
    meta: {
      title: "搜索职位",
    },
  },
];
