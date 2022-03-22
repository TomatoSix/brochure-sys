// 设置各种配置文件

// 规则设置
export const rules = {
  // 关于id的各种规则, 用数组[规则1，规则2], 对应el-form-item的prop
  name: [
    {
      required: true,
      message: '请输入账号',
      trigger: 'blur'
    },
    {
      // 5-10个字母或数字
      pattern: /^[a-zA-Z0-9]{5,10}$/,
      message: '用户名必须是5-10个字母或数字',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      // 5-10个字母或数字
      pattern: /^[a-zA-Z0-9]{6,}$/,
      message: '密码必须六位以上的字母或数字',
      trigger: 'blur'
    }
  ]
}
