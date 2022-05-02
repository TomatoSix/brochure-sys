export interface IAccount {
  name: string
  password: string
}

export interface ILoginResult {
  id: number
  name: string
  token: string
}

export interface IDataType<T = any> {
  code: number
  data: T
}

// 文章参数
export interface IPaper {
  user_id: number // 用户Id
  content: string // 文章内容
  title: string // 文章标题
}

export interface IUserData {
  user_id: string
  id: string
  name: string
  company: string
  homepage: string
  introduction: string
  portrait: string
  position: string
}
