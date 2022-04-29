export interface IDataType<T = any> {
  returnCode: string
  data: T
}

// 文章参数
export interface IPaper {
  user_id: number // 用户Id
  content: string // 文章内容
  title: string // 文章标题
}
