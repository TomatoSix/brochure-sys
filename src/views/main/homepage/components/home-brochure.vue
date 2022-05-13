<template>
  <div class="brochure">
    <div v-if="brochure.length !== 0">
      <div
        class="item"
        v-for="(item, index) in brochure"
        :key="index"
        @click="pushRouter(item)"
      >
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

    <div v-else>暂无小册</div>
  </div>
</template>

<script lang="ts">
import router from '@/router'
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
        res.data.forEach((item: any) => {
          if (item.isPublish === '1') {
            item.createAt = formatUtcString(item.createAt)
            brochure.value.push(item)
          }
        })
      })
    }
    const pushRouter = function (item: any) {
      console.log(item, 'item')

      router.push({
        name: 'brochureShow',
        query: {
          id: item.brochureId,
          title: item.headline
        }
      })
    }
    onMounted(() => {
      getData()
    })
    return {
      getData,
      brochure,
      pushRouter
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
