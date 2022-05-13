<template>
  <!-- <div class="like">暂无点赞</div> -->
  <div class="like">
    <div
      v-for="item in articleData"
      :key="item.title"
      class="item"
      @click="routerToArticle(item.id)"
    >
      <div class="title">{{ item.title }}</div>
      <div class="content">{{ item.digest }}</div>
      <div class="detail">
        <div class="like">
          <i class="iconfont icon-dianzan"></i>{{ item.likes }}
        </div>
        <div class="comments">
          <i class="iconfont icon-pinglun"></i>{{ item.comments }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { likeList } from '@/service/article/article'
import { useStore } from 'vuex'
import router from '@/router'

export default defineComponent({
  setup() {
    const store = useStore()
    let articleData = ref([])

    const getEssay = function () {
      let userId = store.state.login.userInfo.id

      likeList(userId).then((res) => {
        if (res.returnCode === '0000') {
          let list: any = []
          res.data.forEach((item: any) => {
            if (item.isDraft === '0') {
              list.push(item)
            }
          })
          console.log(list, 'data')

          articleData.value = list
        }
      })
    }
    const routerToArticle = function (id: number) {
      router.push({
        name: 'articleDetail',
        params: {
          id: id
        }
      })
    }
    onMounted(() => {
      getEssay()
    })
    return {
      articleData,
      getEssay,
      routerToArticle
    }
  }
})
</script>

<style scoped lang="less">
.like {
  height: 100%;
  .item {
    padding: 20px;
    border-bottom: 1px solid #e6e6e6;
    cursor: pointer;

    .title {
      font-size: 16px;
      font-weight: 600;
      height: 35px;
      line-height: 35px;
    }
    .content {
      font-size: 14px;
      overflow: hidden;
      line-height: 35px;
      height: 35px;

      white-space: nowrap;
      text-overflow: ellipsis;
      color: #353535;
    }
    .detail {
      height: 30px;
      line-height: 30px;
      color: #353535;
      display: flex;
      font-size: 14px;
      .like {
        width: 30px;
        display: flex;
        justify-content: space-between;
        margin-right: 20px;
      }
      .comments {
        width: 40px;
        display: flex;
        justify-content: space-between;
      }
    }
  }
  .item:hover {
    background-color: #fcfbfc;
  }
}
</style>
