const positionDetail = () =>
  import(/* webpackChunkName: "positoin" */ "../views/position/detail.vue");
console.log(positionDetail);

export default [
  {
    path: "/positionDetail",
    name: "positionDetail",
    component: positionDetail
  },
];
