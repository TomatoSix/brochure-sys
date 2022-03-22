import { createStore } from 'vuex'
import { IRootState } from './types'
// 模块注册
import login from './login/login'

// state类型就是IRootState
// createStore要求有一个根类型
const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'tomatoSix',
      age: 18
    }
  },
  mutations: {},
  actions: {},
  // 模块注册
  modules: {
    login
  }
})

// vuex中的变量是放在内存中的，浏览器一刷新就会没有
// 设置函数防止浏览器刷新vuex中的变量失效
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export default store
