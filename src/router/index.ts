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
    redirect: '/main/discover',
    name: 'main',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/main/main.vue'),
    children: [
      {
        path: 'discover',
        name: 'discover',
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../views/discover/discover.vue'
          )
      },
      {
        path: 'brochure',
        name: 'brochure',
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../views/brochure/brochure.vue'
          ),
        children: []
      },
      {
        path: 'brochureDetail/:id',
        name: 'brochureDetail',
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../views/brochure/component/brochure-detail.vue'
          )
      },
      {
        path: 'activity',
        name: 'activity',
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../views/activity/activity.vue'
          )
      },
      {
        path: 'homepage',
        name: 'homepage',
        redirect: '/main/homepage/homeDynamic',

        component: () =>
          import(
            /* webpackChunkName: "about" */ '../views/homepage/homepage.vue'
          ),
        children: [
          {
            path: 'homeDynamic',
            name: 'homeDynamic',
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/homepage/components/home-dynamic.vue'
              )
          },
          {
            path: 'homeArticle',
            name: 'homeArticle',
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/homepage/components/home-article.vue'
              )
          },
          {
            path: 'homeBrochure',
            name: 'homeBrochure',
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/homepage/components/home-brochure.vue'
              )
          }
        ]
      },
      {
        path: 'setting',
        name: 'setting',
        redirect: '/main/setting/personalData',
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../views/setting/setting.vue'
          ),
        children: [
          {
            path: 'personalData',
            name: 'personalData',
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/setting/components/personal-data.vue'
              )
          },
          {
            path: 'resume',
            name: 'resume',
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/setting/components/resume.vue'
              )
          },
          {
            path: 'accountSetting',
            name: 'accountSetting',
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/setting/components/account-setting.vue'
              )
          }
        ]
      },
      {
        path: 'articleDetail/:id',
        name: 'articleDetail',
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../views/discover/article-detail.vue'
          )
      }
    ]
  },
  {
    path: '/editor',
    name: 'editor',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/editor/editor.vue')
  },
  {
    path: '/show',
    name: 'show',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/editor/show.vue')
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
