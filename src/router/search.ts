const searchIndex = () =>
  import(/* webpackChunkName: "home" */ "../views/search/index.vue");
const searchResult = () =>
  import(/* webpackChunkName: "home" */ "../views/search/result.vue");
  const searchCategory = () =>
  import(/* webpackChunkName: "home" */ "../views/search/category.vue");

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
  {
    path: "/search-category",
    name: "searchCategory",
    component: searchCategory,
    meta: {
      title: "搜索职位",
    },
  },
];
