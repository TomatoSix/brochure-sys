import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import Home from '../views/Home.vue'
import localCache from '@/utils/cache'

// 注册 路由
const routes: Array<RouteRecordRaw> = [
  {
    // localhost:8000默认会跳转到main,
    // 如果没有登录则会跳转到login页面，登录则直接跳转到首页
    // 可以使用导航守卫
    path: '/',
    redirect: './main'
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/main/main.vue')
  }
]

// 使用 history模式，并导出routes
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 使用路由导航守卫
router.beforeEach((to) => {
  // 如果不是去登录页, 都要先判断有没有token，token可以从localStorage中获取
  // 如果没有token,要去登录页面, 有token则允许放行
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
})

export default router
