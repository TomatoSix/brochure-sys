<template>
  <div class="personal-data">
    <div class="left">
      <div class="detail">
        <span>用户名</span>
        <el-input
          v-model="personalData.name"
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
      <el-button type="primary" class="btn" @click="saveData"
        >保存修改</el-button
      >
    </div>
    <div class="right">
      <div class="portrait">
        <el-upload
          class="uplaod"
          action="setPersonData"
          :show-file-list="false"
          default="defaultUrl"
          :on-success="handleAvatarSuccess"
        >
          <el-avatar shape="circle" :size="100" :src="personalData.portrait" />
        </el-upload>
        <div class="explain">我的头像</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import { requestUserDataById, setPersonData } from '@/service/login/login'
export default defineComponent({
  setup() {
    const defaultUrl = require('@/assets/portrait.png')
    const imgUrl = ref('')
    const store = useStore()
    let personalData = ref({
      user_id: store.state.login.userInfo.user_id,
      id: '',
      name: '',
      company: '',
      homepage: '',
      introduction: '',
      portrait: '',
      position: ''
    })
    // 图片上传
    const handleAvatarSuccess: UploadProps['onSuccess'] = (
      response,
      uploadFile
    ) => {
      personalData.value.portrait = URL.createObjectURL(uploadFile.raw)
    }
    // 获取图片数据
    const getData = function () {
      const id = store.state.login.userInfo.id
      requestUserDataById(id).then((res) => {
        console.log(res, ' res')
        personalData.value = res as any
      })
    }
    onMounted(() => {
      getData()
    })

    // 保存修改
    const saveData = function () {
      setPersonData(personalData.value).then((res) => {
        if (res.code === 0) {
          ElMessage({
            message: '修改成功',
            type: 'success'
          })
          getData()
        }
      })
    }
    return {
      defaultUrl,
      imgUrl,
      saveData,
      getData,
      personalData,
      handleAvatarSuccess
    }
  }
})
</script>

<style scoped lang="less">
.personal-data {
  padding-left: 20px;
  display: flex;
  justify-content: space-between;
  .left {
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
  .right {
    padding-top: 50px;
    .portrait {
      display: flex;
      flex-direction: column;
      align-items: center;
      .upload {
        cursor: pointer;
      }
      .explain {
        padding-top: 20px;
        font-size: 16px;
      }
    }
  }
}
</style>
