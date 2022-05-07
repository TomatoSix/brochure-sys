<template>
  <div class="content">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="文章数据" name="article" class="article">
        <div class="item" v-for="(item, index) in data" :key="index">
          <div class="explain">{{ item.label }}</div>
          <div class="count">{{ item.count }}</div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="小册数据" name="brochure" class="brochure">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  setup() {
    const activeName = ref('article')
    const handleClick = function () {
      console.log('111')
    }
    const data = reactive([
      { label: '总文章数', count: 2 },
      { label: '文章展现数', count: 166 },
      { label: '文章阅读数', count: 294 },
      { label: '文章点赞数', count: 0 },
      { label: '文章评论数', count: 0 },
      { label: '文章收藏数', count: 0 }
    ])
    return { data, activeName, handleClick }
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
      height: 130px;
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
