<template>
  <div>
    <div class="header">
      <div class="input">
        <el-input v-model="title" placeholder="请输入文章标题" size="large" />
      </div>
      <div class="btn">
        <el-button type="primary" @click="save">保存到草稿箱</el-button>
        <el-button type="primary" @click="emit">发布文章</el-button>
      </div>
    </div>
    <div class="digest">
      <el-input
        v-model="digest"
        placeholder="请输入编辑摘要"
        size="large"
        type="textarea"
      />
    </div>
    <v-md-editor v-model="text" height="640px"></v-md-editor>
    <div class="show">
      <v-md-preview :text="showText"></v-md-preview>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { editPaper } from '@/service/article/article'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { getPaperInfoById, emitPaper } from '@/service/article/article'
export default defineComponent({
  setup() {
    const text = ref('')
    const showText = ref('')
    const title = ref('')
    const digest = ref('')
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const articleId = route.query.id

    const save = function () {
      ElMessageBox.confirm('是否保存到草稿箱?', '', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 保存到后端
          let params = {
            articleId: articleId,
            digest: digest.value,
            content: text.value,
            title: title.value
          }
          editPaper(params).then((res) => {
            console.log(res, 'res')
            ElMessage({
              type: 'success',
              message: '保存成功'
            })
          })

          // 直接跳转到草稿箱页面
          router.push({
            name: 'articleManage'
          })
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
          // 发布接口
          let userId = store.state.login.userInfo.id
          let params = {
            user_id: userId,
            articleId: articleId,
            digest: digest.value,
            content: text.value,
            title: title.value,
            isDraft: '0'
          }
          emitPaper(params)
            .then((res) => {
              console.log(res, 'res')

              if (res.returnCode === '0000') {
                showText.value = res.data[0].content
                ElMessage({
                  type: 'success',
                  message: '发布成功'
                })
                // 直接跳转到草稿箱页面
                router.push({
                  name: 'main'
                })
              }
            })
            .catch((e) => {
              ElMessage({
                type: 'error',
                message: '发布失败'
              })
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
    const getData = function () {
      getPaperInfoById(articleId as string).then((res) => {
        if (res.returnCode === '0000') {
          console.log(res, 'res222')
          nextTick(() => {
            title.value = res.data.title
            digest.value = res.data.digest
            text.value = res.data.content
          })
          console.log(title, digest, text, '000')
        }
      })
    }
    onMounted(() => {
      getData()
    })
    return {
      text,
      showText,
      title,
      digest,
      getData,
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
.digest {
  padding: 0 20px 20px 20px;
}
</style>
