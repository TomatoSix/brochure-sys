<template>
  <div class="cat">
    <div class="content">小册内容</div>

    <div class="item" v-for="(item, index) in data" :key="index">
      <div class="index">{{ index + 1 }}</div>
      <div class="title">{{ item.title }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import { getChapterAllByBrochureId } from '@/service/article/article'
export default defineComponent({
  setup() {
    const route = useRoute()
    const data: any = ref([])
    const getData = function () {
      let brochureId = route.query.id as string

      getChapterAllByBrochureId(brochureId).then((res) => {
        if (res.returnCode === '0000') {
          console.log(res, 'res')
          data.value = res.data
        }
      })
    }
    onMounted(() => {
      getData()
    })

    return {
      data,
      getData
    }
  }
})
</script>

<style scoped lang="less">
.cat {
  padding: 20px 30px;
  .content {
    padding: 20px 0;
    font-size: 20px;
  }
  .item {
    height: 50px;
    cursor: pointer;
    display: flex;
    align-items: center;
    .index {
      padding-right: 30px;
    }
    .title {
    }
  }
  .item:hover {
    background-color: #eaf0ef;
  }
}
</style>
