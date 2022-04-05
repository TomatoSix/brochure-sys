<template>
  <div class="setting">
    <div class="return" @click="returnBack">
      <el-icon :size="18">
        <component :is="ArrowLeftBold"></component>
      </el-icon>
      个人主页
    </div>
    <div class="content">
      <div class="router">
        <div
          v-for="(item, index) in routers"
          :key="item.label"
          :class="[{ item: true }, { activeColor: index === activeIndex }]"
          @click="routerPush(item.name, index)"
        >
          <el-icon :size="18">
            <component :is="item.icon"></component>
          </el-icon>
          {{ item.label }}
        </div>
      </div>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import { ArrowLeftBold, List, SetUp, Postcard } from '@element-plus/icons-vue'

import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  setup() {
    let activeIndex = ref(0)
    const routers = reactive([
      { name: 'personalData', label: '个人资料', icon: 'List' },
      { name: 'resume', label: '简历管理', icon: 'Postcard' },
      { name: 'accountSetting', label: '账号设置', icon: 'SetUp' }
    ])

    const routerPush = function (routerName: string, index: number) {
      activeIndex.value = index
      router.push({
        name: routerName
      })
    }

    const returnBack = function () {
      router.push({
        name: 'homepage'
      })
    }
    return {
      routers,
      activeIndex,
      routerPush,
      returnBack,
      ArrowLeftBold,
      SetUp,
      List,
      Postcard
    }
  }
})
</script>

<style scoped lang="less">
.setting {
  height: 100%;
  .return {
    display: flex;
    cursor: pointer;
    align-items: center;
    background-color: #fff;
    margin-top: 20px;
    padding-left: 10px;
    height: 50px;
  }
  .content {
    display: flex;
    border-top: 10px solid rgb(240, 240, 240);
    height: calc(100% - 60px);
    background-color: #fff;

    .router {
      width: 25%;
      border-right: 20px solid rgb(240, 240, 240);

      .item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        margin: 5px;
        cursor: pointer;
      }
      .item:hover {
        background-color: #eef7ff;
        color: #468ac8;
      }
      .activeColor {
        color: #468ac8;
        background-color: #eef7ff;
      }
    }
    .right {
      background-color: #fff;
    }
  }
}
</style>
