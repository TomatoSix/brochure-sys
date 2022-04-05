<template>
  <div class="brochure-detail">
    <div class="top">页面介绍</div>
    <div class="content">
      <div class="left">left</div>
      <div class="right">right</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.brochure-detail {
  height: 100%;
  .top {
    height: 200px;
    background-color: white;
    margin: 10px 0;
    padding: 20px;
  }
  .content {
    background-color: white;
    height: calc(100% - 200px);
    display: flex;

    .left {
      margin-right: 10px;
      width: 70%;
      border-right: 10px solid rgb(240, 240, 240);
    }
    .right {
      width: 30%;
    }
  }
}
</style>
