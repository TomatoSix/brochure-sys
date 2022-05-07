<template>
  <div class="booklet">
    <div class="nav">
      <div class="title">小册写作</div>
      <div class="right">
        <el-button type="primary" @click="save">保存到草稿箱</el-button>
        <el-button type="primary" @click="emit">发布小册</el-button>

        <div class="avatar" @click="routerChange">
          <el-avatar :size="50" :src="circleUrl" />
        </div>
      </div>
    </div>
    <div class="edit">
      <div class="section">
        <el-menu default-active="chapter[0].chapterId" @select="select">
          <div v-for="(item, index) in chapter" :key="index">
            <el-menu-item :index="item.chapterId" class="menu">
              <div class="explain">
                <span class="index">{{ index + 1 }} </span>
                <span class="title">{{ item.title }}</span>
              </div>

              <i class="iconfont icon-xiazai48" @click.stop="iconEdit"> </i>
            </el-menu-item>
          </div>
        </el-menu>
        <el-dialog v-model="dialogVisible" width="30%" title="添加章节">
          <el-input v-model="title" placeholder="请输入章节标题" />
          <el-select
            v-model="value"
            placeholder="请选择对应的章节"
            class="select"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <template #footer>
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="confirm">确定</el-button>
          </template>
        </el-dialog>
        <el-button type="primary" class="btn" @click="dialogVisible = true"
          >点击添加章节</el-button
        >
      </div>
      <div class="editor">
        <v-md-editor v-model="text" height="630px"></v-md-editor>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { defineComponent, nextTick, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import {
  getChapterAllByBrochureId,
  addChapter,
  ArticleInfoByUserId,
  reviseChapterContent,
  brochureEmit
} from '@/service/article/article'
export default defineComponent({
  setup() {
    const circleUrl = require('@/assets/portrait.png')
    const text = ref('')
    const dialogVisible = ref(false)
    const route = useRoute()
    const router = useRouter()
    const chapter = ref([])
    const value = ref('')
    const options = ref([])
    const store = useStore()
    const title = ref('')
    // 获取当前选中的chapter
    const nowChapter = ref({
      articleId: 1,
      brochureId: 1,
      chapterId: 1,
      content: '',
      createAt: '',
      sort: 1,
      title: '',
      updateAt: '',
      user_id: 1
    })
    const nowIndex = ref(0)
    const brochureId = route.query.brochureId

    const userId = store.state.login.userInfo.id
    const confirm = function () {
      dialogVisible.value = false
      addChapters().then(() => {
        ElMessage({
          type: 'success',
          message: `章节添加成功`
        })
      })
    }
    // 获取小册所有文章
    const getChaptersAll = function () {
      getChapterAllByBrochureId(brochureId as string).then((res) => {
        if (res.returnCode === '0000') {
          chapter.value = res.data
        }
      })
    }
    // 获取当前用户的所有文章
    const getArticles = async function () {
      ArticleInfoByUserId(userId).then((res) => {
        if (res.returnCode === '0000') {
          console.log(res.data, ' 000')
          res.data.forEach((item: any) => {
            if (item.isDraft === '1') {
              const obj = { label: item.title, value: item.id }
              ;(options.value as any).push(obj)
            }
          })
        }
      })
    }
    onMounted(() => {
      getChaptersAll()
      getArticles()
    })

    const select = async function (chapterId: string) {
      console.log(chapterId, 'chapterId')

      saveChapter()

      // 获取文章ID
      const item: any = chapter.value.find(
        (item: any) => item.chapterId === chapterId
      )
      nowIndex.value = chapter.value.findIndex(
        (item: any) => item.chapterId === chapterId
      )
      nowChapter.value = item

      // 每进行一次切换就要保存一次
      nextTick(() => {
        text.value = item?.content
      })
    }
    // 添加文章接口
    const addChapters = async function () {
      const params = {
        user_id: userId,
        brochureId: brochureId,
        articleId: value.value,
        title: title.value,
        sort: chapter.value.length + 1
      }
      addChapter(params).then((res) => {
        console.log(res, 'res')
        getChaptersAll()
      })
    }
    // 保存当前章节
    const saveChapter = async function () {
      console.log(nowChapter, 'now')

      const params = {
        chapterId: nowChapter.value.chapterId,
        content: text.value,
        title: nowChapter.value.title,
        sort: nowIndex.value
      }
      reviseChapterContent(params).then(() => {
        getChaptersAll()
      })
    }
    // 点击保存到草稿箱
    const save = function () {
      saveChapter().then(() => {
        ElMessage({
          type: 'success',
          message: `保存成功`
        })
        router.push({
          name: 'main'
        })
      })
    }
    // 点击发布
    const emit = function () {
      const params = {
        brochureId: brochureId
      }
      brochureEmit(params).then((res) => {
        console.log(res)
        ElMessage({
          type: 'success',
          message: `发布成功`
        })
        router.push({
          name: 'brochure'
        })
      })
    }
    const iconEdit = function () {
      alert(111)
    }
    return {
      chapter,
      dialogVisible,
      text,
      circleUrl,
      value,
      title,
      nowIndex,
      save,
      saveChapter,
      confirm,
      getArticles,
      addChapters,
      emit,
      options,
      getChaptersAll,
      iconEdit,
      select
    }
  }
})
</script>

<style scoped lang="less">
.booklet {
  height: 100%;
  .nav {
    background-color: #f7f7f7;

    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 50px;
    .title {
      font-size: 20px;
    }
    .right {
      display: flex;
      align-items: center;
      .avatar {
        margin-left: 30px;
        cursor: pointer;
      }
    }
  }
  .edit {
    height: calc((100% - 80px));
    display: flex;
    .section {
      flex: 1;
      height: 100%;
      .menu {
        display: flex;
        justify-content: space-between;
      }

      .index {
        font-size: 16px;
        font-weight: 600;
        padding: 0 10px;
      }
      .title {
        font-size: 16px;
      }
      .btn {
        margin: 10px 0 0 30px;
      }
      .select {
        margin-top: 30px;
        width: 100%;
      }
    }
    .editor {
      height: 100%;

      flex: 4;
    }
  }
}
</style>
