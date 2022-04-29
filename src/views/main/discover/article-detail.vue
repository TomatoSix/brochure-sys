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
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getPaperInfoById } from '@/service/article/article'
import { formatUtcString } from '@/utils/date-format'

export default defineComponent({
  setup() {
    const route = useRoute()
    let essay = ref({})

    const textarea = ref('')
    const getEssayData = function () {
      console.log(route.params, 'params')

      let essayId = route.params.id as string

      getPaperInfoById(essayId).then((res) => {
        if (res.returnCode === '0000') {
          res.data.createTime = formatUtcString(res.data.createTime)

          essay.value = res.data
          console.log(essay, 'essay')
        }
      })
    }
    onMounted(() => {
      getEssayData()
    })

    const comment = function () {
      console.log(textarea)
    }
    return { essay, textarea, comment, getEssayData }
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
  }
  .author {
    align-items: center;
    display: flex;
    margin-top: 20px;
    height: 50px;
    .left {
      margin-right: 10px;
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
}
.comment {
  margin-top: 10px;
  background-color: #fff;
  padding: 10px 30px;

  .publish {
    margin-top: 30px;
  }
}
</style>
