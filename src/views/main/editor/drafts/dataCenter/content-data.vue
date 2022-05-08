<template>
  <div class="content">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="文章数据" name="article" class="article">
        <div class="item" v-for="(item, index) in articleData" :key="index">
          <div class="explain">{{ item.label }}</div>
          <div class="count">{{ item.count }}</div>
        </div>
        <!-- 数据趋势 -->
        <el-table :data="allArticle" style="width: 100%" max-height="250">
          <el-table-column prop="title" label="文章标题" width="250" />
          <el-table-column prop="createTime" label="发布时间" width="250" />
          <el-table-column prop="likes" label="点赞" width="80" />
          <el-table-column prop="comments" label="评论" width="80" />
          <el-table-column prop="collect" label="收藏" width="80" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="小册数据" name="brochure" class="brochure">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { formatUtcString } from '@/utils/date-format'

import { getArticleData, ArticleInfoByUserId } from '@/service/article/article'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const activeName = ref('article')
    const store = useStore()
    const userId = store.state.login.userInfo.id
    const handleClick = function () {
      console.log('111')
    }
    const allArticle: any = ref([])
    const articleData = reactive([
      { label: '总文章数', count: 0, value: 'articleSum' },
      { label: '文章点赞数', count: 0, value: 'likeSum' },
      { label: '文章评论数', count: 0, value: 'commentSum' },
      { label: '文章收藏数', count: 0, value: 'collectSum' }
    ])
    const brochureData = reactive([
      { label: '总小册数', count: 0, value: 'brochureSum' },
      { label: '小册点赞数', count: 0, value: 'brochureSum' },
      { label: '小册评论数', count: 0, value: 'brochureSum' },
      { label: '小册收藏数', count: 0, value: 'brochureSum' }
    ])

    const getData = function () {
      getArticleData(userId).then((res) => {
        console.log(res, 'res')
        if (res.returnCode === '0000') {
          articleData.forEach((item) => {
            item.count = res.data[item.value]
          })
        }
      })
      ArticleInfoByUserId(userId).then((res) => {
        console.log(res, 'res0000')
        if (res.returnCode === '0000') {
          res.data.forEach((item: any) => {
            if (item.isDraft === '0') {
              item.createTime = formatUtcString(item.createAt)
              allArticle.value.push(item)
            }
          })
        }
      })
    }
    onMounted(() => {
      getData()
    })
    return {
      articleData,
      brochureData,
      activeName,
      allArticle,
      handleClick,
      getData
    }
  }
})
</script>

<style scoped lang="less">
.content {
  margin: 20px 30px;
  .article {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .item {
      box-sizing: border-box;
      margin-bottom: 20px;
      height: 100px;
      width: 250px;
      background-color: #f8f8f7;
      padding: 20px;
      .explain {
        color: #4b5359;
      }
      .count {
        margin: 20px 0;
        font-size: 26px;
        font-weight: 600;
      }
    }
  }
}
</style>
