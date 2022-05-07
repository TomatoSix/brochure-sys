<template>
  <div class="brochure">
    <div class="item" v-for="(item, index) in brochure" :key="index">
      <div class="author">
        <div class="name">{{ item.authorName }}</div>
        <div class="partition">|</div>
        <div class="time">{{ item.createAt }}</div>
      </div>
      <div class="title">
        {{ item.headline }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { getBrochureByUserId } from '@/service/article/article'
import { useStore } from 'vuex'
import { formatUtcString } from '@/utils/date-format'
export default defineComponent({
  setup() {
    const store = useStore()

    const userId = store.state.login.userInfo.id
    const brochure: any = ref([])
    const getData = function () {
      getBrochureByUserId(userId).then((res) => {
        console.log(res, 'res')
        res.data.forEach((item: any) => {
          if (item.isPublish === '1') {
            item.createAt = formatUtcString(item.createAt)
            brochure.value.push(item)
          }
        })
      })
    }
    onMounted(() => {
      getData()
    })
    return {
      getData,
      brochure
    }
  }
})
</script>

<style scoped lang="less">
.brochure {
  padding: 20px;
  .item {
    border-bottom: 1px solid #eaf0ef;
    cursor: pointer;
    padding: 20px 0;
    .author {
      display: flex;
      .partition {
        margin: 0 10px;
      }
    }
    .title {
      margin: 20px 0;
    }
  }
  .item:hover {
    background-color: #fcfbfc;
  }
}
</style>
