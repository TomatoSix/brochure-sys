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
      <div class="content">{{ item.digest }}</div>
      <div class="detail">
        <div class="like">
          <i class="iconfont icon-dianzan"></i>
          <span>{{ item.likes }}</span>
        </div>
        <div class="comments">
          <!-- <el-icon :size="18">
            <component :is="ChatDotRound"></component>
          </el-icon> -->
          <i class="iconfont icon-pinglun"></i>
          <span>{{ item.comments }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { ChatDotRound, View } from '@element-plus/icons-vue'
import router from '@/router'
import { getArticleAll } from '@/service/article/article'
export default defineComponent({
  setup() {
    let articleData = ref([])
    const getArticleData = function () {
      getArticleAll().then((res) => {
        if (res.returnCode === '0000') {
          console.log(res.data, 'data')

          articleData.value = res.data.filter((item: any) => {
            return item.isDraft === '0'
          })
        }
      })
    }
    const routerToDetail = function (id: number) {
      router.push({
        name: 'articleDetail',
        params: {
          id: id
        }
      })
    }
    onMounted(() => {
      getArticleData()
    })

    return {
      articleData,
      routerToDetail,
      getArticleData,
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
