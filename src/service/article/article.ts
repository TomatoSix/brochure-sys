import hyRequest from '../index'
import hyRequest2 from '../upload'
import { IDataType, IPaper } from './types'

enum UserArticle {
  SavaPaper = 'article/savePaper',
  EditPaper = 'article/editPaper',
  EmitPaper = 'article/emitPaper',
  ArticleInfo = 'article/getArticleById/',
  ArticleInfoAll = 'article/getArticleAll',
  ArticleInfoByUserId = 'article/getArticleByUserId/',
  Apply = 'article/apply',
  GetBrochureAll = 'article/getBrochureAll',
  GetBrochureByUserId = 'article/getBrochureByUserId/',
  GetBrochureById = 'article/getBrochureById/',

  GetChapterAllByBrochureId = 'article/getChapterAllByBrochureId/',
  AddChapter = 'article/addChapter',
  ReviseChapterContent = 'article/reviseChapterContent',
  BrochureEmit = 'article/brochureEmit',
  PurchaseBrochure = 'article/purchaseBrochure', // 购买小册
  IsPurchase = 'article/isPurchase', // 购买小册
  GetArticleData = 'article/getArticleData/', // 获取文章的各种数据
  GetOrderList = 'article/getOrderList/', // 获取订单列表
  BrochureBought = 'article/brochureBought/', // 获取购买记录
  Avatar = 'upload/avatar', // 上传头像

  giveLike = 'article/giveLike', // 点赞
  cancelLike = 'article/cancelLike', // 取消赞
  isLike = 'article/isLike', // 是否赞
  likeList = 'article/likeList/'
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
 * @desc 修改文章
 * @date 2022-04-26
 * @param {any} paper:IPaper
 * @returns {any}
 */
export function editPaper(data: any) {
  return hyRequest.post<IDataType>({
    url: UserArticle.EditPaper,
    data: data
  })
}
/**
 * @desc 修改文章
 * @date 2022-04-26
 * @param {any} paper:IPaper
 * @returns {any}
 */
export function emitPaper(data: any) {
  return hyRequest.post<IDataType>({
    url: UserArticle.EmitPaper,
    data: data
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

/**
 * @desc 获取小册的所有章节
 * @date 2022-04-29
 * @param {any} id:string
 * @returns {any}
 */
export function getChapterAllByBrochureId(id: string) {
  return hyRequest.get<IDataType>({
    url: UserArticle.GetChapterAllByBrochureId + id,
    showLoading: false
  })
}

/**
 * @desc 添加章节
 * @date 2022-04-29
 * @param {any} id:string
 * @returns {any}
 */
export function addChapter(params: any) {
  return hyRequest.post<IDataType>({
    url: UserArticle.AddChapter,
    data: params,
    showLoading: false
  })
}

/**
 * @desc 修改章节内容
 * @date 2022-04-29
 * @param {any} id:string
 * @returns {any}
 */
export function reviseChapterContent(params: any) {
  return hyRequest.post<IDataType>({
    url: UserArticle.ReviseChapterContent,
    data: params,
    showLoading: false
  })
}

/**
 * @desc 小册发布
 * @date 2022-04-29
 * @param {any} id:string
 * @returns {any}
 */
export function brochureEmit(params: any) {
  return hyRequest.post<IDataType>({
    url: UserArticle.BrochureEmit,
    data: params,
    showLoading: false
  })
}

/**
 * @desc 购买小册
 * @date 2022-05-05
 * @param {any} params:any
 * @returns {any}
 */
export function purchaseBrochure(params: any) {
  return hyRequest.post<IDataType>({
    url: UserArticle.PurchaseBrochure,
    data: params,
    showLoading: false
  })
}

/**
 * @desc 寻找订单
 * @date 2022-05-05
 * @param {any} params:any
 * @returns {any}
 */
export function hasPurchase(params: any) {
  return hyRequest.post<IDataType>({
    url: UserArticle.IsPurchase,
    data: params,
    showLoading: false
  })
}

/**
 * @desc 获取文章的各种数据
 * @date 2022-05-05
 * @param {any} params:any
 * @returns {any}
 */
export function getArticleData(id: any) {
  return hyRequest.get<IDataType>({
    url: UserArticle.GetArticleData + id,
    showLoading: false
  })
}

/**
 * @desc 获取订单列表
 * @date 2022-05-05
 * @param {any} params:any
 * @returns {any}
 */
export function getOrderList(id: any) {
  return hyRequest.get<IDataType>({
    url: UserArticle.GetOrderList + id,
    showLoading: false
  })
}

/**
 * @desc 获取已购小册记录
 * @date 2022-05-05
 * @param {any} params:any
 * @returns {any}
 */
export function brochureBought(id: any) {
  return hyRequest.get<IDataType>({
    url: UserArticle.BrochureBought + id,
    showLoading: false
  })
}

/**
 * @desc 上传头像
 * @date 2022-05-05
 * @param {any} params:any
 * @returns {any}
 */
export function avatar(file: any) {
  return hyRequest2.post<IDataType>({
    url: UserArticle.Avatar,
    data: file,
    showLoading: false
  })
}

/**
 * @desc 新增评论
 * @date 2022-05-05
 * @param {any} params:any
 * @returns {any}
 */
export function addComment(data: any) {
  return hyRequest.post<IDataType>({
    url: '/comment',
    data: data,
    showLoading: false
  })
}

/**
 * @desc 回复评论
 * @date 2022-05-05
 * @param {any} params:any
 * @returns {any}
 */
export function replyComment(commentId: any, data: any) {
  return hyRequest.post<IDataType>({
    url: '/comment/' + commentId + '/reply',
    data: data,
    showLoading: false
  })

  /*
  {
    "articleId": "49",
    "content": "正在学习nodejs",
    "commentId": "1"
  } */
}

/**
 * @desc 获取评论列表
 * @date 2022-05-05
 * @param {any} params:any
 * @returns {any}
 */
export function getComment(articleId: any) {
  return hyRequest.get<IDataType>({
    url: '/comment/' + articleId,
    showLoading: false
  })
}

/**
 * @desc 点赞
 * @date 2022-05-05
 * @param {any} params:any
 * @returns {any}
 */
export function giveLike(data: any) {
  return hyRequest.post<IDataType>({
    url: UserArticle.giveLike,
    data: data,
    showLoading: false
  })
}
/**
 * @desc 取消赞
 * @date 2022-05-05
 * @param {any} params:any
 * @returns {any}
 */
export function cancelLike(data: any) {
  return hyRequest.post<IDataType>({
    url: UserArticle.cancelLike,
    data: data,
    showLoading: false
  })
}

/**
 * @desc 是否有赞
 * @date 2022-05-05
 * @param {any} params:any
 * @returns {any}
 */
export function isLike(data: any) {
  return hyRequest.post<IDataType>({
    url: UserArticle.isLike,
    data: data,
    showLoading: false
  })
}

/**
 * @desc 获取点赞的文章列表
 * @date 2022-05-05
 * @param {any} params:any
 * @returns {any}
 */
export function likeList(userId: any) {
  return hyRequest.get<IDataType>({
    url: UserArticle.likeList + userId,
    showLoading: false
  })
}
