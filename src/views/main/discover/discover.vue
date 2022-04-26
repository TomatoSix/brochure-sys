<template>
  <div class="discover">
    <div
      v-for="item in articleData"
      :key="item.title"
      class="article"
      @click="routerToDetail(item.articleId)"
    >
      <div class="author">{{ item.authorName }}</div>
      <div class="title">{{ item.title }}</div>
      <div class="content">{{ item.content }}</div>
      <div class="detail">
        <div class="like">
          <el-icon :size="18"> <component :is="View"></component> </el-icon>
          <span>{{ item.likes }}</span>
        </div>
        <div class="comments">
          <el-icon :size="18">
            <component :is="ChatDotRound"></component>
          </el-icon>
          <span>{{ item.comments }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { ChatDotRound, View } from '@element-plus/icons-vue'
import router from '@/router'

export default defineComponent({
  setup() {
    const articleData = reactive([
      {
        articleId: 1,
        authorName: '苏苏同学',
        title: '彻底弄懂前端缓存',
        content:
          '前端缓存，这是一个老生常谈的话题.前端缓存，这是一个老生常谈的话题，也常被作为前端面试的一个知识点。今天我们再来总结一下。前端缓存，这是一个老生常谈的话题，也常被作为前端面试的一个知识点。今天我们再来总结一下。前端缓存，这是一个老生常谈的话题，也常被作为前端面试的一个知识点。今天我们再来总结一下。',
        likes: 40,
        comments: 32
      },
      {
        articleId: 1,
        authorName: '我就是胖虎',
        title: '实现一个逐步递增的数字动画',
        content: '可视化大屏项目最多的组件就是数字组件',
        likes: 40,
        comments: 32
      },
      {
        articleId: 1,
        authorName: '苏苏同学',
        title: '彻底弄懂前端缓存',
        content: '前端缓存，这是一个老生常谈的话题',
        likes: 198,
        comments: 20
      }
    ])

    const routerToDetail = function (id: number) {
      router.push({
        name: 'articleDetail',
        params: {
          id: id
        }
      })
    }
    return {
      articleData,
      routerToDetail,
      ChatDotRound,
      View
    }
  }
})
</script>

<style scoped lang="less">
.discover {
  background-color: white;
  height: 100%;
  margin-top: 10px;

  .article {
    cursor: pointer;
    border-bottom: 1px solid #e2e2e2;
    padding: 20px 30px;
    .author {
      font-size: 12px;
    }
    .title {
      font-size: 17px;
      font-weight: 600;
      height: 40px;
      line-height: 40px;
      color: #494949;
    }
    .content {
      color: #636363;
      font-size: 14px;
      height: 40px;
      line-height: 40px;
      /*实现该元素隐藏自身溢出的效果*/
      overflow: hidden;
      /*文本不会换行*/
      white-space: nowrap;
      /*当文本溢出包含元素时，以省略号表示超出的文本，该属性依赖于overflow: hidden*/
      text-overflow: ellipsis; /* ellipsis表示省略号 */
    }
    .detail {
      display: flex;
      align-items: center;
      color: #636363;
      font-size: 12px;
      .like {
        display: flex;
        align-items: center;
        margin-right: 20px;
      }
      .comments {
        display: flex;
        align-items: center;
        margin-right: 20px;
      }
      span {
        margin-left: 3px;
      }
    }
  }
  .article:hover {
    background-color: #f6f6f6;
  }
}
</style>
