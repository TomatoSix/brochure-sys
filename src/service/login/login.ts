import hyRequest from '../index'

import { IAccount, IDataType, ILoginResult } from './types'

enum LoginAPI {
  // 用户注册
  UserRegister = '/users/register',
  // 用户登录
  AccountLogin = '/login',
  // 获取用户信息 users/1
  // LoginUserInfo = '/users/getUserInfo/',
  UserData = '/users/getPersonData/',
  setPersonData = '/users/setPersonData'
}
/**
 * @desc 用户注册接口
 * @date 2022-03-16
 * @param {any} account:IAccount
 * @returns {any}
 */
export function userRegisterRequest(account: IAccount) {
  return hyRequest.post<IDataType>({
    url: LoginAPI.UserRegister,
    data: account
  })
}

/**
 * @desc 登录请求
 * @date 2022-03-15
 * @param account
 * name:账号, password: 密码
 * @returns {any}
 */
export function accountLoginRequest(account: IAccount) {
  // <IDataType<ILoginResult>>就是返回的数据类型，也可以不写<ILoginResult>
  // 因为某些数据返回实在过于复杂, 已设置T默认为any类型
  return hyRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

/**
 * @desc 根据Id获取用户信息
 * @date 2022-03-15
 * @param {any} id:number
 * id: 用户Id
 * @returns {any}
 */
// export function requestUserInfoById(id: number) {
//   return hyRequest.get<IDataType>({
//     url: LoginAPI.UserData + id,
//     showLoading: false
//   })
// }

/**
 * @desc 根据用户Id请求用户个人资料
 * @date 2022-03-15
 * @param {any} id:number
 * id: 用户的用户角色Id
 * @returns {any}
 */
export function requestUserDataById(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.UserData + id,
    showLoading: false
  })
}

// 设置个人资料
export function setPersonData(data: any) {
  return hyRequest.post<IDataType>({
    url: LoginAPI.setPersonData,
    data: data
  })
}
