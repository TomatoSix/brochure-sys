import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

// 注册 路由
const routes: Array<RouteRecordRaw> = [
  {
    // 默认会跳转到home
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

// 使用 history模式，并导出routes
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
