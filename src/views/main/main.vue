<template>
  <el-container class="box">
    <el-header class="header">
      <div class="left">
        <div class="title">前端小册</div>
        <div class="router">
          <div
            v-for="(item, index) in module"
            :key="index"
            @click="btnClick(index)"
          >
            <div :class="[item, { activeItem: isActive === index }]">
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <!-- 搜索框 -->
        <div class="search">
          <el-input v-model="input" placeholder="搜索文章/小册/用户" />
          <el-button type="primary" class="btn">搜索</el-button>
          <el-button type="primary" class="btn" plain @click="routerToArticle"
            >写文章</el-button
          >
          <el-button type="primary" class="btn" plain @click="routerToBrochure"
            >写小册</el-button
          >
        </div>
        <!-- 头像 -->
        <div class="portrait">
          <el-avatar :size="50" :src="circleUrl" @click="routerToHomepage" />
        </div>
      </div>
    </el-header>
    <el-main class="main">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import router from '@/router'

import { defineComponent, reactive, ref } from 'vue'
export default defineComponent({
  setup() {
    const isActive = ref(0)
    const input = ref('')
    const module = reactive([
      {
        name: '发现',
        route: 'discover'
      },
      {
        name: '小册',
        route: 'brochure'
      },
      {
        name: '活动',
        route: 'activity'
      }
    ])
    const circleUrl = require('@/assets/portrait.png')

    const btnClick = function (index: number) {
      isActive.value = index
      router.push({
        name: module[index].route
      })
    }

    const routerToHomepage = function () {
      router.push({
        name: 'homepage'
      })
    }

    const routerToArticle = function () {
      router.push({
        name: 'editor'
      })
    }
    const routerToBrochure = function () {
      router.push({
        name: 'editor'
      })
    }
    return {
      module,
      isActive,
      input,
      circleUrl,
      btnClick,
      routerToHomepage,
      routerToArticle,
      routerToBrochure
    }
  }
})
</script>

<style scoped lang="less">
.box {
  height: 100%;
  .header {
    background: white;
    padding: 0 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .title {
        margin-right: 30px;
        font-size: 24px;
        font-weight: 500;
      }
      .router {
        width: 200px;
        display: flex;
        justify-content: space-around;
        cursor: pointer;
        .item {
          color: black;
        }
        .activeItem {
          color: #58aefe;
        }
      }
    }
    .right {
      display: flex;
      align-items: center;

      .search {
        margin-right: 50px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .btn {
          margin-left: 20px;
        }
      }
      .portrait {
        cursor: pointer;
      }
    }
  }
  .main {
    background: rgb(240, 240, 240);
    padding: 0 20%;
  }
}
</style>
