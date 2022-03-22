<template>
  <div class="login">
    <login-panel></login-panel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginPanel from './components/login-panel.vue'
export default defineComponent({
  components: {
    LoginPanel
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.login {
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
