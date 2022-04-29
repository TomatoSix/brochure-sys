import hyRequest from '../index'

import { IDataType, IPaper } from './types'

enum UserArticle {
  SavaPaper = 'article/savePaper',
  ArticleInfo = 'article/getArticleById/'
}
enum LoginAPI {
  // 用户注册
  UserRegister = '/users/register',
  // 用户登录
  AccountLogin = '/login',
  // 获取用户信息 users/1
  LoginUserInfo = '/users/',
  // 获取用户菜单 role/1/menu
  UserMenus = '/role/',

  SavaPaper = 'article/savePaper'
}

/**
 * @desc 上传文章
 * @date 2022-04-26
 * @param {any} paper:IPaper
 * @returns {any}
 */
export function userSavePaper(paper: IPaper) {
  return hyRequest.post<IDataType>({
    url: UserArticle.SavaPaper,
    data: paper
  })
}

export function getPaperInfoById(id: number) {
  return hyRequest.get<IDataType>({
    url: UserArticle.ArticleInfo + id
  })
}

/**
 * @desc 根据Id获取用户信息
 * @date 2022-03-15
 * @param {any} id:number
 * id: 用户Id
 * @returns {any}
 */
export function requestUserInfoById(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

/**
 * @desc 根据用户角色请求用户菜单
 * @date 2022-03-15
 * @param {any} id:number
 * id: 用户的用户角色Id
 * @returns {any}
 */
export function requestUserMenuByRoleId(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
