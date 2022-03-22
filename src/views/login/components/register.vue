<template>
  <div class="register">
    <el-form
      ref="formRef2"
      label-width="80px"
      :model="account"
      :rules="registerRules"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="psw1">
        <el-input v-model="account.psw1" :show-password="true"></el-input>
      </el-form-item>
      <el-form-item label="密码验证" prop="psw2">
        <el-input v-model="account.psw2" :show-password="true"></el-input>
      </el-form-item>
    </el-form>
    <el-button class="btn" type="primary" @click="register()">注册</el-button>
  </div>
</template>

<script lang="ts">
import { ElForm, ElMessage } from 'element-plus'
import { defineComponent, ref, reactive } from 'vue'
import { userRegisterRequest } from '@/service/login/login'
export default defineComponent({
  setup() {
    // 给elForm打标识
    const formRef2 = ref<InstanceType<typeof ElForm>>()

    const account = reactive({
      name: '',
      psw1: '',
      psw2: ''
    })
    // 注册验证
    const validatePass = (rules: any, value: any, callback: any) => {
      if (value !== account.psw1) {
        callback(new Error('两次密码输入不一致，请重新输入'))
      }
    }

    const registerRules = {
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
      psw1: [
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
      ],
      psw2: [
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
        },
        {
          validator: validatePass,
          trigger: 'blur'
        }
      ]
    }

    /**
     * @desc 注册逻辑
     * @date 2022-03-14
     * @returns {any}
     */
    const register = () => {
      console.log(formRef2.value, '1111')

      formRef2.value?.validate((valid) => {
        if (!valid) {
          ElMessage.error('账号或密码不正确，请重新输入')
          return false
        }
      })
      // 2. 开始注册
      const params = {
        name: account.name,
        password: account.psw2
      }
      console.log(params, 'params')

      userRegisterRequest(params)
        .then(() => {
          ElMessage.success('注册成功，请登录')
        })
        .catch((e) => {
          ElMessage.error('注册失败，请重新注册')
        })
    }

    return {
      formRef2,
      account,
      registerRules,
      register
    }
  }
})
</script>

<style scoped lang="less">
.register {
  .btn {
    width: 100%;
    margin: 5px 0;
  }
}
</style>
