<template>
  <div v-for="item in articleData" :key="item.title">
    <div class="author">
      <div>{{ item.authorName }}</div>
      <div>{{ item.createTime }}</div>
    </div>

    <div class="title">{{ item.title }}</div>
    <div class="content">{{ item.digest }}</div>
    <div class="detail">
      <div class="like">{{ item.likes }}</div>
      <div class="comments">{{ item.comments }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { ArticleInfoByUserId } from '@/service/article/article'
import { useStore } from 'vuex'
import { formatUtcString } from '@/utils/date-format'
export default defineComponent({
  setup() {
    const store = useStore()
    let articleData = ref([])
    const getEssay = function () {
      let userId = store.state.login.userInfo.id

      ArticleInfoByUserId(userId).then((res) => {
        if (res.returnCode === '0000') {
          console.log(res, 'res')
          res.data = res.data.map((item: any) => {
            console.log(item.createTime)

            item.createTime = formatUtcString(item.createTime)
          })
          articleData.value = res.data
          console.log(articleData)
        }
      })
    }
    onMounted(() => {
      getEssay()
    })
    return {
      articleData,
      getEssay
    }
  }
})
</script>

<style scoped lang="less"></style>
