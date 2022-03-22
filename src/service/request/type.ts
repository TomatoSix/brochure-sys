import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 设置拦截器接口
export interface HYRequestInterceptors<T = AxiosResponse> {
  // 设置请求拦截器函数
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  // 设置请求的错误拦截
  requestInterceptorCatch?: (error: any) => any
  // 设置响应拦截器
  responseInterceptor?: (res: T) => T
  // 设置响应错误拦截器
  responseInterceptorCatch?: (config: any) => any
}

// 对原来的AxiosRequestConfig做了一个扩展, 可以有拦截器
export interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HYRequestInterceptors<T>
  showLoading?: boolean
}
