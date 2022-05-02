import hyRequest from '../index'

import { IDataType, IPaper } from './types'

enum UserArticle {
  SavaPaper = 'article/savePaper',
  ArticleInfo = 'article/getArticleById/',
  ArticleInfoAll = 'article/getArticleAll',
  ArticleInfoByUserId = 'article/getArticleByUserId/',
  Apply = 'article/apply',
  GetBrochureAll = 'article/getBrochureAll',
  GetBrochureByUserId = 'article/getBrochureByUserId/',
  GetBrochureById = 'article/getBrochureById/'
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

/**
 * @desc 根据文章ID获取文章信息
 * @date 2022-04-29
 * @param {any} id:string
 * @returns {any}
 */
export function getPaperInfoById(id: string) {
  return hyRequest.get<IDataType>({
    url: UserArticle.ArticleInfo + id,
    showLoading: false
  })
}

/**
 * @desc 获取所有文章信息
 * @date 2022-04-29
 * @returns {any}
 */
export function getArticleAll() {
  return hyRequest.get<IDataType>({
    url: UserArticle.ArticleInfoAll,
    showLoading: false
  })
}

/**
 * @desc 获取当前用户的所有文章
 * @date 2022-04-29
 * @param {any} id:string
 * @returns {any}
 */
export function ArticleInfoByUserId(id: string) {
  return hyRequest.get<IDataType>({
    url: UserArticle.ArticleInfoByUserId + id,
    showLoading: false
  })
}

/**
 * @desc 小册提交申请
 * @date 2022-04-29
 * @param {any} id:string
 * @returns {any}
 */
export function brochureSubmit(params: any) {
  return hyRequest.post<IDataType>({
    url: UserArticle.Apply,
    data: params
  })
}

/**
 * @desc 获取所有小册
 * @date 2022-04-29
 * @param {any} id:string
 * @returns {any}
 */
export function getBrochureAll() {
  return hyRequest.get<IDataType>({
    url: UserArticle.GetBrochureAll,
    showLoading: false
  })
}
/**
 * @desc 获取当前用户所有小册
 * @date 2022-04-29
 * @param {any} id:string
 * @returns {any}
 */
export function getBrochureByUserId(id: string) {
  return hyRequest.get<IDataType>({
    url: UserArticle.GetBrochureByUserId + id,
    showLoading: false
  })
}

/**
 * @desc 根据小册Id获取文章信息
 * @date 2022-04-29
 * @param {any} id:string
 * @returns {any}
 */
export function getBrochureById(id: string) {
  return hyRequest.get<IDataType>({
    url: UserArticle.GetBrochureById + id,
    showLoading: false
  })
}
