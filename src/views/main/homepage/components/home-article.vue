<template>
  <div v-for="item in articleData" :key="item.title">
    <div class="author">{{ item.articleData }}</div>
    <div class="title">{{ item.title }}</div>
    <div class="content">{{ item.content }}</div>
    <div class="detail">
      <div class="like">{{ item.likes }}</div>
      <div class="comments">{{ item.comments }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const articleData = reactive([
      {
        authorName: '苏苏同学',
        title: '彻底弄懂前端缓存',
        content: '前端缓存，这是一个老生常谈的话题',
        likes: 40,
        comments: 32
      },
      {
        authorName: '我就是胖虎',
        title: '实现一个逐步递增的数字动画',
        content: '可视化大屏项目最多的组件就是数字组件',
        likes: 40,
        comments: 32
      },
      {
        authorName: '苏苏同学',
        title: '彻底弄懂前端缓存',
        content: '前端缓存，这是一个老生常谈的话题',
        likes: 198,
        comments: 20
      }
    ])
    return {
      articleData
    }
  }
})
</script>

<style scoped lang="less"></style>
