<template>
  <div class="introduce">
    <div v-for="(item, index) in data" :key="index">
      <div class="title">{{ item.title }}</div>
      <div class="content">{{ item.content }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { getBrochureById } from '@/service/article/article'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()

    const data = ref([
      { title: '你将获得', content: '' },
      {
        title: '作者介绍',
        content: ''
      },
      {
        title: '小册介绍',
        content: ''
      }
    ])
    const getData = function () {
      let brochureId = route.query.id as string

      getBrochureById(brochureId).then((res) => {
        console.log(res, 'res')
        if (res.returnCode === '0000') {
          data.value[0].content = res.data.theme
          data.value[1].content = res.data.authorIntroduction
          data.value[2].content = res.data.introduce
        }
      })
    }
    onMounted(() => {
      getData()
    })
    return {
      data
    }
  }
})
</script>

<style scoped lang="less">
.introduce {
  padding: 30px;

  .title {
    font-size: 18px;
    font-weight: 600;
    height: 80px;
    line-height: 80px;
  }
  .content {
    color: #42434a;
  }
}
</style>
