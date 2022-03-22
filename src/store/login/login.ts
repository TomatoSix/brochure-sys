// 关于个人账户模块

import { Module } from 'vuex'
import { ElMessage } from 'element-plus'

import localCache from '@/utils/cache'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenuByRoleId
} from '@/service/login/login'
import router from '@/router'
import { IAccount } from '@/service/login/types'
import { IRootState } from '../types'
import { ILoginState } from './types'

// Module要求有模块中state类型和根模块state类型
const loginModule: Module<ILoginState, IRootState> = {
  // 命名空间一定要加，不加会报错
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  getters: {},
  // 修改state
  mutations: {
    // 修改token
    changeToken(state, token: string) {
      state.token = token
    },
    changeUerInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
    }
  },
  // 一般用于实现各种异步代码，比如根据vuex中存储的id发送请求获取数据
  actions: {
    /**
     * @desc 登录功能
     * @date 2022-03-14
     * @param {any} {commit}
     * @param {any} payload:any
     * @returns {any}
     */
    async accountLoginAction({ commit }, payload: IAccount) {
      console.log('执行action', commit, payload)

      try {
        // 1. 实现登录逻辑

        const loginResult = await accountLoginRequest(payload)
        console.log(loginResult, '111')

        // 将token放入vuex中
        const { id, token } = loginResult.data
        commit('changeToken', token)
        // 将token放入axios实例中
        localCache.setCache('token', token)

        // 2. 请求用户信息数据
        // const userInfoResult = await requestUserInfoById(id)
        // const userInfo = userInfoResult.data
        // commit('changeUerInfo', userInfo)
        // localCache.setCache('userInfo', userInfo)

        // 3. 请求用户菜单
        // const userMenusResult = await requestUserMenuByRoleId(userInfo.role.id)
        // const userMenus = userMenusResult.data
        // commit('changeUserMenus', userMenus)
        // localCache.setCache('userMenus', userMenus)

        // 4. 跳转到首页
        router.push('/main')
      } catch (e) {
        console.log(e, 'e')

        // 如果登录不成功
        ElMessage.error('账号或密码错误，请重新输入')
      }
    },
    /**
     * @desc 注册功能
     * @date 2022-03-14
     * @param {any} {commit}
     * @param {any} payload:any
     * @returns {any}
     */
    registerAction({ commit }, payload: any) {
      console.log('注册action')
    },
    /**
     * @desc 刷新时存储vue中的数据
     * @date 2022-03-15
     * @param {any} {commit}
     * @returns {any}
     */
    loadLocalLogin({ commit }) {
      // 存储token
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      // 存储用户信息
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      // 存储用户菜单信息
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
