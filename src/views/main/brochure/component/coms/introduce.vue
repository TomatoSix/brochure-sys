<template>
  <div class="introduce">
    <div v-for="(item, index) in data" :key="index">
      <div class="title">{{ item.title }}</div>
      <div class="content">{{ item.content }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const data = reactive([
      { title: '你将获得', content: '' },
      {
        title: '作者介绍',
        content:
          '目前深耕前端工程化构建领域，拥有大量的 Vite 工程化实战和性能优化经验，曾将 Vite 落地到抖音直播 PC 端等公司大型业务中，也是 Vite Contributor。'
      },
      {
        title: '小册介绍',
        content:
          '在本课程中，我会给大家系统梳理 Vite 知识，并解决如上种种问题，带大家了解到前端工程的构建中究竟具备哪些知识和技能，不光是 Vite 本身的知识，也包括 Vite 底层所使用的 Esbuild、Rollup 双引擎、Babel 编译工具链、模块规范标准等一系列构建生态，从此掌握前端构建领域的第一性原理，完成从构建小白到高手的蜕变。'
      }
    ])
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
