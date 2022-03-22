<template>
  <div class="outer">
    <el-form ref="formRef" label-width="60px" :model="account" :rules="rules">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" :show-password="true"></el-input>
      </el-form-item>
    </el-form>
    <!-- 登录重置 -->
    <el-button class="btn" type="primary" @click="handleLogin(isKeepPassword)"
      >立即登录</el-button
    >
    <!-- 记住密码-忘记密码 -->
    <div class="bottom">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary" :underline="false">忘记密码</el-link>
    </div>
  </div>
</template>

<script lang="ts">
import { ElMessage, ElForm } from 'element-plus'
import { useStore } from 'vuex'

import { defineComponent } from 'vue'
import { ref, reactive } from 'vue'
// 引入的对象直接return就可以了
import { rules } from '../config/account-config'
import localCache from '@/utils/cache'

export default defineComponent({
  props: {},
  setup() {
    // 获取store
    const store = useStore()

    // 保存账号, name: 账号,password:密码
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })

    // 给elform打标识
    const formRef = ref<InstanceType<typeof ElForm>>()

    // 是否记住密码
    const isKeepPassword = ref(true)

    /**
     * @desc 登录逻辑
     * @date 2022-03-14
     * @returns {any}
     */
    const handleLogin = (isKeepPassword: boolean) => {
      console.log('开始登录', formRef)
      // 账号和密码格式不正确
      formRef.value?.validate((valid) => {
        if (!valid) {
          ElMessage.error('账号或密码格式不正确，请重新输入')
          return false
        }

        // 1. 判断是否需要记住密码
        if (isKeepPassword) {
          // 进行本地缓存
          localCache.setCache('name', account.name)
          localCache.setCache('password', account.password)
        } else {
          localCache.deleteCache('password')
          localCache.deleteCache('password')
        }
        // 2. 开始登录验证
        store.dispatch('login/accountLoginAction', { ...account })
      })
    }

    return {
      account,
      rules,
      isKeepPassword,
      handleLogin,
      formRef
    }
  }
})
</script>

<style scoped lang="less">
.outer {
  .btn {
    display: flex;
    justify-content: center;
    margin: 30px 0 20px;
    width: 100%;
  }

  .bottom {
    display: flex;
    justify-content: space-between;
  }
}
</style>
