import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import home from './home';
import company from "./company"
import position from "./position"
import search from "./search"

const routes: Array<RouteRecordRaw> = [
  ...home,
  ...company,
  ...position,
  ...search
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  document.title = to.meta.title || "默认title"
})

export default router
