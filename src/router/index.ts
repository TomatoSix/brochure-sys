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
            /* webpackChunkName: "about" */ '../views/main/discover/discover.vue'
          )
      },
      {
        path: 'brochure',
        name: 'brochure',
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../views/main/brochure/brochure.vue'
          ),
        children: []
      },
      {
        path: 'brochureDetail',
        name: 'brochureDetail',
        redirect: '/main/brochureDetail/introduce',

        component: () =>
          import(
            /* webpackChunkName: "about" */ '../views/main/brochure/component/brochure-detail.vue'
          ),
        children: [
          {
            path: 'introduce',
            name: 'introduce',
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/main/brochure/component/coms/introduce.vue'
              ),
            children: []
          },
          {
            path: 'catalogue',
            name: 'catalogue',
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/main/brochure/component/coms/catalogue.vue'
              ),
            children: []
          },
          {
            path: 'comment',
            name: 'comment',
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/main/brochure/component/coms/comment.vue'
              ),
            children: []
          }
        ]
      },
      {
        path: 'activity',
        name: 'activity',
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../views/main/activity/activity.vue'
          )
      },
      {
        path: 'homepage',
        name: 'homepage',
        redirect: '/main/homepage/homeDynamic',

        component: () =>
          import(
            /* webpackChunkName: "about" */ '../views/main/homepage/homepage.vue'
          ),
        children: [
          {
            path: 'homeDynamic',
            name: 'homeDynamic',
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/main/homepage/components/home-dynamic.vue'
              )
          },
          {
            path: 'homeArticle',
            name: 'homeArticle',
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/main/homepage/components/home-article.vue'
              )
          },
          {
            path: 'homeBrochure',
            name: 'homeBrochure',
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/main/homepage/components/home-brochure.vue'
              )
          },
          {
            path: 'homeRecord',
            name: 'homeRecord',
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/main/homepage/components/home-record.vue'
              )
          },
          {
            path: 'homeCollection',
            name: 'homeCollection',
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/main/homepage/components/home-collection.vue'
              )
          },
          {
            path: 'homeLike',
            name: 'homeLike',
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/main/homepage/components/home-like.vue'
              )
          },
          {
            path: 'homeAttention',
            name: 'homeAttention',
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/main/homepage/components/home-attention.vue'
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
            /* webpackChunkName: "about" */ '../views/main/setting/setting.vue'
          ),
        children: [
          {
            path: 'personalData',
            name: 'personalData',
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/main/setting/components/personal-data.vue'
              )
          },
          {
            path: 'resume',
            name: 'resume',
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/main/setting/components/resume.vue'
              )
          },
          {
            path: 'accountSetting',
            name: 'accountSetting',
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/main/setting/components/account-setting.vue'
              )
          }
        ]
      },
      {
        path: 'articleDetail/:id',
        name: 'articleDetail',
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../views/main/discover/article-detail.vue'
          )
      }
    ]
  },
  {
    path: '/editor',
    name: 'editor',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/main/editor/editor.vue')
  },
  {
    path: '/reEditor',
    name: 'reEditor',
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../views/main/editor/reEditor.vue'
      )
  },

  {
    path: '/booklet',
    name: 'booklet',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/main/editor/booklet.vue')
  },
  {
    path: '/brochureShow',
    name: 'brochureShow',
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../views/main/brochure/brochureShow.vue'
      )
  },
  {
    path: '/apply',
    name: 'apply',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/main/editor/apply.vue')
  },
  {
    path: '/drafts',
    name: 'drafts',
    // redirect: '/drafts/articleManage',
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../views/main/editor/drafts/drafts.vue'
      ),
    children: [
      {
        path: '/articleManage',
        name: 'articleManage',
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../views/main/editor/drafts/article-manage.vue'
          )
      },
      {
        path: '/brochureManage',
        name: 'brochureManage',
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../views/main/editor/drafts/brochure-manage.vue'
          )
      },
      {
        path: '/contentData',
        name: 'contentData',
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../views/main/editor/drafts/dataCenter/content-data.vue'
          )
      },
      {
        path: '/orderData',
        name: 'orderData',
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../views/main/editor/drafts/dataCenter/order-data.vue'
          )
      }
    ]
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
