import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import home from './home';

const routes: Array<RouteRecordRaw> = [
  ...home
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  document.title = to.meta.title || "默认title"
})

export default router
