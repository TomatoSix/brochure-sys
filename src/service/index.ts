// 当前service文件夹的统一出口
import HYRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'

// 每一个axios实例可以对应不同的baseURL
const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 传入的hooks对应的是一个个拦截器, 不同的拦截器对应不同的作用
  // 对应的实例的拦截器
  interceptors: {
    requestInterceptor: (config: any) => {
      // console.log('实例请求成功的拦截')

      // 设置token, 从localStorage中获取
      const token = localCache.getCache('token')
      // 一般token就是放到请求头里的authorization
      if (token) {
        // eslint-disable-next-line
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      // console.log('请求失败的拦截')

      return err
    },
    responseInterceptor: (res) => {
      console.log('响应成功的拦截')

      return res
    },
    responseInterceptorCatch: (err) => {
      console.log('响应失败的拦截')

      return err
    }
  }
})
/**
 * 使用时就可以
 * hyRequest.request({
 *  method: 'GET',
 *  url: ''
 * })
 */
// const hyRequest2 = new HYRequest({
//   baseURL: ''
// })

export default hyRequest
