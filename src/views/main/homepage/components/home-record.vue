<template>
  <div class="bought">
    <div v-if="brochure.length">
      <div
        class="item"
        v-for="(item, index) in brochure"
        :key="index"
        @click="routerToBrochure(item)"
      >
        <div class="title">{{ item.headline }}</div>
        <div class="introduce">{{ item.introduce }}</div>
      </div>
    </div>
    <div v-else>暂无购买记录</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { brochureBought } from '@/service/article/article'
export default defineComponent({
  setup() {
    const store = useStore()
    const id = store.state.login.userInfo.id
    const brochure: any = ref([])
    const router = useRouter()
    const getData = function () {
      brochureBought(id).then((res) => {
        console.log(res.data, 'data44')
        if (res.data !== '暂无购买记录') {
          brochure.value = res.data
        }
      })
    }
    const routerToBrochure = function (item: any) {
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
      brochure,
      getData,
      routerToBrochure
    }
  }
})
</script>

<style scoped lang="less">
.bought {
  padding: 20px;
  .item {
    cursor: pointer;
    margin: 10px 0;
    border-bottom: 1px solid #e6e6e6;

    .title {
      font-weight: 600;
      padding: 10px 0;
    }
    .introduce {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 10px 0;
      margin-bottom: 20px;
    }
  }
}
</style>
