const home = () =>
  import(/* webpackChunkName: "home" */ "../views/home/index.vue");

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
  }
];
