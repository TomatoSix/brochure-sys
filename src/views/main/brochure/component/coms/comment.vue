<template>
  <div class="comment">
    <img :src="imgUrl" alt="" />
    <div class="message">暂无评论</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const imgUrl = require('@/assets/img/nocomment.png')
    return {
      imgUrl
    }
  }
})
</script>

<style scoped lang="less">
.comment {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  img {
    width: 200px;
    height: 200px;
  }
}
</style>
