<template>
  <div class="article-detail">
    <div class="title">{{ essay.title }}</div>
    <div class="author">
      <div class="left">
        <el-avatar :size="50" :src="circleUrl" />
      </div>
      <div class="right">
        <div>{{ essay.authorName }}</div>
        <div>{{ essay.createTime }}</div>
      </div>
    </div>
    <div class="content">
      <v-md-preview :text="essay.content"></v-md-preview>
    </div>
    <div :class="{ active: isActive, like: true }" @click="like">
      <i class="iconfont icon-dianzan1"></i>
    </div>
  </div>

  <div class="comment">
    <h3>评论</h3>
    <el-input
      v-model="textarea"
      :rows="3"
      type="textarea"
      placeholder="请输入评论 . . ."
    />
    <el-button type="primary" @click="comment" class="publish"
      >发表评论</el-button
    >
  </div>
  <div class="comment">
    <h3>所有评论</h3>

    <div class="item" v-for="(item, index) in comments" :key="index">
      <div class="user">
        <span>{{ item.user.name }}</span>
        评论
      </div>
      <div class="content">
        {{ item.content }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import {
  getPaperInfoById,
  getComment,
  addComment,
  isLike,
  cancelLike,
  giveLike
} from '@/service/article/article'
import { formatUtcString } from '@/utils/date-format'

export default defineComponent({
  setup() {
    const route = useRoute()
    let essay = ref({})
    let comments = ref([])
    let firstComment: any = ref([])
    let reply: any = ref([])
    const store = useStore()
    let isActive = ref(false)
    let circleUrl = store.state.login.userInfo.portrait
    let essayId = route.params.id as string
    const textarea = ref('')
    const params = {
      userId: store.state.login.userInfo.id,
      articleId: route.params.id as string
    }
    // 获取文章详情
    const getEssayData = function () {
      getPaperInfoById(essayId).then((res) => {
        if (res.returnCode === '0000') {
          res.data.createTime = formatUtcString(res.data.createTime)

          essay.value = res.data
          console.log(essay, 'essay')
        }
      })
    }
    // 获取评论列表
    const getComments = function () {
      getComment(essayId).then((res) => {
        console.log(res, 'res')
        comments.value = res.data
        console.log(comments, '000')
      })
    }

    const comment = function () {
      console.log(textarea)
      const params = {
        articleId: essayId,
        content: textarea.value,
        count: comments.value.length + 1
      }
      addComment(params).then((res) => {
        console.log(res)
        ElMessage({
          message: '评论发表成功！',
          type: 'success'
        })
        getComments()
      })
    }
    const like = function () {
      console.log(isActive.value, 'value')

      if (!isActive.value) {
        giveLike(params).then((res) => {
          isActive.value = res.data
          console.log(res, '点赞')
        })
      } else {
        cancelLike(params).then((res) => {
          isActive.value = res.data

          console.log(res, '取消赞')
        })
      }
    }
    const getIsLike = function () {
      isLike(params).then((res) => {
        if (res.returnCode === '0000') {
          if (res.data.length) {
            isActive.value = true
          }
        }
      })
    }

    onMounted(() => {
      getEssayData()
      getComments()
      getIsLike()
    })
    return {
      comments,
      circleUrl,
      essay,
      firstComment,
      reply,
      isActive,
      textarea,
      comment,
      getIsLike,
      like,
      getEssayData,
      getComments
    }
  }
})
</script>

<style scoped lang="less">
.article-detail {
  background-color: #fff;
  margin-top: 10px;
  padding: 30px;
  .title {
    font-size: 28px;
    font-weight: 600;
    padding-bottom: 30px;
  }
  .author {
    align-items: center;
    display: flex;
    margin-top: 20px;
    height: 50px;
    .left {
      margin-right: 20px;
    }
    .right {
      height: 50px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  .like {
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
  }
  .active {
    color: #0099ff;
  }
}
.comment {
  margin-top: 10px;
  background-color: #fff;
  padding: 10px 30px 30px;

  .publish {
    margin-top: 30px;
  }
  .item {
    .user {
      padding: 10px 0;
      span {
        color: #4da6ff;
      }
    }
    .content {
      padding: 10px 0 30px 20px;
      // background-color: #f0f5f5;
    }
  }
}
</style>
