const positionDetail = () =>
  import(/* webpackChunkName: "positoin" */ "../views/position/detail.vue");
console.log(positionDetail);

export default [
  {
    path: "/position-detail",
    name: "positionDetail",
    component: positionDetail,
    meta: {
      title: "职位详情"
    }
  },
];
