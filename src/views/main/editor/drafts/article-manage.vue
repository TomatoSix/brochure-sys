<template>
  <div class="article-manage">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="文章" name="article" class="content">
        <div v-for="item in articleData" :key="item.id" class="item">
          <div>
            {{ item.title }}
          </div>
          <div class="time">{{ item.createTime }}</div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="草稿箱" name="drafts" class="content">
        <div
          v-for="item in dratsData"
          :key="item.id"
          class="item"
          @click="routerToEdit(item)"
        >
          <div>
            {{ item.title }}
          </div>
          <div class="time">{{ item.createTime }}</div>
        </div></el-tab-pane
      >
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'

import { formatUtcString } from '@/utils/date-format'
import { ArticleInfoByUserId } from '@/service/article/article'
export default defineComponent({
  setup() {
    const store = useStore()
    const activeName = ref('article')
    const userId = store.state.login.userInfo.id
    const articleData = ref([])
    const dratsData = ref([])
    const handleClick = (tab: any, event: Event) => {
      console.log(tab, event)
    }
    const getArticleData = function () {
      ArticleInfoByUserId(userId).then((res) => {
        console.log(res, 'res')
        if (res.returnCode === '0000') {
          res.data.forEach((item: any) => {
            item.createTime = formatUtcString(item.createTime)
          })
          articleData.value = res.data.filter((item: any) => {
            return item.isDraft === '0'
          })
          dratsData.value = res.data.filter((item: any) => {
            return item.isDraft === '1'
          })
        }
      })
    }
    const routerToEdit = function (item: any) {
      console.log(item, '2222')
      router.push({
        name: 'reEditor',
        query: {
          id: item.id
        }
      })
    }
    onMounted(() => {
      getArticleData()
    })
    return {
      dratsData,
      articleData,
      activeName,
      handleClick,
      getArticleData,
      routerToEdit
    }
  }
})
</script>

<style scoped lang="less">
.article-manage {
  margin: 20px 30px;
  .content {
    .item {
      color: #191919;
      box-sizing: border-box;
      padding: 15px 0;
      border-bottom: 1px solid #f5f8f8;
      cursor: pointer;

      .time {
        margin: 15px 0;
        color: #808080;
        font-size: 14px;
      }
    }
    .item:hover {
      background-color: #f7fafa;
    }
  }
}
</style>
