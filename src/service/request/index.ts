import axios from 'axios'
// 引入axios的实例类型 AxiosInstance, config的类型AxiosRequestConfig
import type { AxiosInstance } from 'axios'
import type { HYRequestInterceptors, HYRequestConfig } from './type'
// 引入loading组件
import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

const DEAFULT_LOADING = true

class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors
  showLoading: boolean
  loading?: LoadingInstance

  constructor(config: HYRequestConfig) {
    // 创建实例，config中可以设置不同的baseURL
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEAFULT_LOADING
    // 1. 从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 2. 添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有的实例都有的请求拦截器')
        // 增添全局loading
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '加载中...',
            background: 'rgba(0,0,0,0.3)'
          })
        }

        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有的实例都有的响应拦截器')

        // 将loading移除
        this.loading?.close()

        const data = res.data
        // 后端会返回一个returnCode
        if (data.returnCode === '-1001') {
          console.log('请求失败， 错误信息')
        } else {
          return data
        }
      },
      (err) => {
        // 将loading移除
        this.loading?.close()

        // 对响应失败的拦截
        if (err.response.status === 404) {
          console.log('报404错误')
        }
        return err
      }
    )
  }

  /**
   * @des 封装request函数， 3. 某个请求添加单独的拦截
   * @date 2022-03-10
   * @param {any} config:AxiosRequestConfig
   * @returns {any}
   */
  request<T>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 如果该request函数传递的config有interceptors, 处理完拦截器的结果直接返回给config
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 2.将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING

          // 3.将结果resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          // 将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING
          reject(err)
          return err
        })
    })
  }

  get<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
  // 如何使用
  // interface DataType {
  //   data: any
  //   returnCode: string
  //   success: boolean
  // }
  // hyRequest.request<DataType>({
  //   url: '/home/multidata',
  //   method: 'GET',
  //   interceptors： {
  //     requestInterceptor: (config) => {
  //       console.log("单独请求的config");
  //       return config
  //     },
  //     responseInterceptor: (res) => {
  //       console.log(
  //         "单独响应的response"
  //       );
  //       return res

  //     }
  //   }
  // }).then((res) => {
  //      console.log(res.data);
  //   })
}

export default HYRequest
