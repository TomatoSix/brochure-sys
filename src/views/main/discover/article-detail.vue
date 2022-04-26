<template>
  <div class="article-detail">
    <div class="title">{{ essay.title }}</div>
    <div class="author">{{ essay.author.authorName }}</div>
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
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  setup() {
    const essay = reactive({
      title: '实现一个逐步递增的数字动画',
      author: {
        authorUrl: '',
        authorName: '苏苏同学'
      },
      content: '#123',
      comments: '111111'
    })

    const textarea = ref('')

    const comment = function () {
      console.log(textarea)
    }
    return { essay, textarea, comment }
  }
})
</script>

<style scoped lang="less">
.article-detail {
  background-color: #fff;
  margin-top: 10px;
  padding: 30px;
  .title {
    font-size: 24px;
  }
  .author {
    height: 50px;
    background-color: tomato;
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
