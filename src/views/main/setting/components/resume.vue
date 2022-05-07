<template>
  <div class="resume">
    <div class="top">
      <div class="title">简历管理</div>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <el-button type="primary" @click="upload">上传简历</el-button>
      </el-upload>
    </div>
    <div class="content">
      <div v-if="true">暂无简历</div>
      <div v-else></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { UploadRawFile } from 'element-plus'
export default defineComponent({
  setup() {
    const fileList = ref<UploadRawFile[]>()
    const upload = function () {
      console.log('upload')
    }
    return {
      upload,
      fileList
    }
  }
})
</script>

<style scoped lang="less">
.resume {
  padding: 10px 20px;
  height: 100%;
  .top {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e7e7e7;
    .title {
      font-size: 24px;
    }
  }
  .content {
    padding: 20px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
}
</style>
