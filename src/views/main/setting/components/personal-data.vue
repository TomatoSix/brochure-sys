<template>
  <div class="personal-data">
    <div class="detail">
      <span>用户名</span>
      <el-input
        v-model="personalData.username"
        placeholder="填写你的用户名"
        maxlength="50"
        show-word-limit
      />
    </div>
    <div class="detail">
      <span>职位</span>

      <el-input
        v-model="personalData.position"
        placeholder="填写你的职位"
        maxlength="50"
        show-word-limit
      />
    </div>
    <div class="detail">
      <span>公司</span>

      <el-input
        v-model="personalData.company"
        placeholder="填写你的公司"
        maxlength="50"
        show-word-limit
      />
    </div>
    <div class="detail">
      <span>个人主页</span>

      <el-input
        v-model="personalData.homepage"
        placeholder="填写你的个人主页"
        maxlength="50"
        show-word-limit
      />
    </div>
    <div class="detail">
      <span>个人介绍</span>

      <el-input
        v-model="personalData.introduction"
        placeholder="填写你的个人介绍"
        maxlength="200"
        type="textarea"
        show-word-limit
        rows="5"
      />
    </div>
    <el-button type="primary" class="btn" @click="saveData">保存修改</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const personalData = reactive({
      username: '番茄炒小六',
      position: '',
      company: '',
      homepage: '',
      introduction: ''
    })
    const saveData = function () {
      console.log('保存修改')
      console.log(personalData, '111')
    }
    return {
      saveData,
      personalData
    }
  }
})
</script>

<style scoped lang="less">
.personal-data {
  display: flex;
  flex-direction: column;
  .detail {
    width: 100%;
    display: flex;
    align-items: center;
    margin: 0 20px;
    padding: 20px 0;
    border-bottom: 1px solid rgb(240, 240, 240);
    span {
      width: 150px;
    }
  }
  .btn {
    width: 100px;
    margin: 30px 0 0 130px;
  }
}
</style>
