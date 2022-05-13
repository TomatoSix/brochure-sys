<template>
  <div class="nav">
    <div class="title">创作管理</div>
    <div class="avatar" @click="routerChange">
      <el-avatar :size="50" :src="circleUrl" />
    </div>
  </div>
  <div class="drafts">
    <div class="left">
      <div class="author">{{ store.state.login.userInfo.name }}</div>
      <el-button type="primary" class="btn" @click="routerToArticle"
        >写文章</el-button
      >
      <div class="manage">
        <el-menu default-active="articleManage" @select="select">
          <el-sub-menu index="1">
            <template #title>
              <i class="iconfont icon-neirong"> </i>
              <span> 内容管理</span>
            </template>
            <el-menu-item index="articleManage">文章管理</el-menu-item>
            <el-menu-item index="brochureManage">小册管理</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <i class="iconfont icon-shuju"> </i>
              <span> 数据中心</span>
            </template>
            <el-menu-item index="contentData">内容数据</el-menu-item>
            <el-menu-item index="orderData">订单数据</el-menu-item>
            <el-menu-item index="followData">关注者数据</el-menu-item>
          </el-sub-menu>
          <!-- <el-menu-item index="3">
            <i class="iconfont icon-shouye"> </i>

            <span>活动中心</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="iconfont icon-bangzhu"> </i>

            <span>帮助中心</span>
          </el-menu-item> -->
        </el-menu>
      </div>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import router from '@/router'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const circleUrl = require('@/assets/portrait.png')
    const store = useStore()
    const routerToArticle = function () {
      router.push({
        name: 'editor'
      })
    }
    const routerChange = function () {
      router.push({
        name: 'discover'
      })
    }
    const select = function (name: string) {
      router.push({
        name: name
      })
    }
    return {
      circleUrl,
      select,
      routerToArticle,
      routerChange,
      store
    }
  }
})
</script>

<style scoped lang="less">
.nav {
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  .title {
    font-size: 20px;
  }
  .avatar {
    cursor: pointer;
  }
}
.drafts {
  height: calc(100% - 160px);
  // margin: 30px 200px;
  padding: 30px 200px;
  display: flex;
  background-color: #f7f7f7;
  .left {
    box-sizing: border-box;
    height: 100%;
    flex: 1;
    background-color: white;
    border-right: 20px solid #f7f7f7;
    padding: 20px;
    .author {
    }
    .btn {
      width: 100%;
      margin: 20px 0;
    }
  }
  .right {
    box-sizing: border-box;

    height: 100%;
    background-color: white;

    flex: 4;
  }
}
</style>
