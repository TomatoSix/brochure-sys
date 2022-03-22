<template>
  <div class="login-panel">
    <h2 class="title">前端小册知识服务管理平台</h2>
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTab">
      <!-- 登录界面 -->
      <el-tab-pane label="登录" name="account">
        <login-account></login-account>
      </el-tab-pane>
      <!-- 注册界面 -->
      <el-tab-pane label="注册" name="register">
        <register></register>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import Register from './register.vue'
export default defineComponent({
  components: {
    LoginAccount,
    Register
  },
  setup() {
    // 默认绑定登录页面, 与el-tab-pane的name对应
    const currentTab = ref<string>('account')
    return {
      currentTab
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  width: 350px;
  .title {
    text-align: center;
    padding-bottom: 10px;
  }
}
</style>
