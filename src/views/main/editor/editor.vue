<template>
  <div>
    <div class="header">
      <div class="input">
        <el-input v-model="title" placeholder="输入文章标题" size="large" />
      </div>
      <div class="btn">
        <el-button type="primary" @click="save">保存到草稿箱</el-button>
        <el-button type="primary" @click="emit">发布</el-button>
      </div>
    </div>
    <v-md-editor v-model="text" height="640px"></v-md-editor>
    <!-- <div class="show">
      <v-md-preview :text="text"></v-md-preview>
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
export default defineComponent({
  setup() {
    const text = ref('')
    const title = ref('')
    const save = function () {
      console.log(text)
      ElMessageBox.confirm('是否保存到草稿箱?', '', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 保存到后端
          ElMessage({
            type: 'success',
            message: '保存成功'
          })
          // 直接跳转到草稿箱页面
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消保存'
          })
        })
    }
    const emit = function () {
      console.log(text, title)
      ElMessageBox.confirm('是否确认发布?', '', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          ElMessage({
            type: 'success',
            message: '发布成功'
          })
          // 直接跳转到主页吧
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消发布'
          })
        })
    }
    return {
      text,
      title,
      save,
      emit
    }
  }
})
</script>

<style scoped lang="less">
.header {
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
  .input {
    width: 60%;
  }
  .btn {
    display: flex;
  }
}
</style>
