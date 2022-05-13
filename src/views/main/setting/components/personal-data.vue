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
          action="http://127.0.0.1:8000/upload/avatar"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <el-avatar :size="50" :src="personalData.portrait" />
          <!-- <img :src="personalData.portrait" class="avatar" /> -->
        </el-upload>
        <div class="explain" @click="submit">我的头像</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// import axios from 'axios'
import { defineComponent, onMounted, ref } from 'vue'
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import { requestUserDataById, setPersonData } from '@/service/login/login'
import { avatar } from '@/service/article/article'
// import localCache from '@/utils/cache'

export default defineComponent({
  setup() {
    const imageUrl = ref('')
    const store = useStore()
    let personalData = ref({
      // user_id: store.state.login.userInfo.user_id,
      name: '',
      company: '',
      homepage: '',
      introduction: '',
      portrait: '',
      position: ''
    })

    // const uploadFile = function (params: any) {
    //   const formdata = new FormData()
    //   const file = params.file
    //   formdata.append('file', file)
    //   axios
    //     .post('http://127.0.0.1/upload/avatar', formdata, {
    //       headers: {
    //         //头部信息
    //         'Content-Type': 'multipart/form-data',
    //         Authorization: localCache.getCache('token')
    //       }
    //     })
    //     .then((res) => {
    //       console.log(res, 'res')
    //     })
    //     .catch((error) => {
    //       console.log(error, 'error')
    //     })
    // }
    // const submit = function () {
    //   uploadFile()
    // }
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
    const handleAvatarSuccess: UploadProps['onSuccess'] = (
      response,
      uploadFile
    ) => {
      console.log(response, uploadFile)
    }

    const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
      if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('Avatar picture must be JPG format!')
        return false
      } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
      }
      return true
    }

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
      avatar,
      imageUrl,
      saveData,
      getData,
      personalData,
      handleAvatarSuccess,
      beforeAvatarUpload
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
      width: 200px;
      height: 200px;
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
