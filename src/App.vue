<template>
  <div class="nav">
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App'
})
</script>

<style lang="less" scoped>
.nav {
  height: 100%;
  // background-color: tomato;
}
</style>
