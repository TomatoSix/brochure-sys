<template>
  <div class="homepage">
    <div class="top">
      <div class="avatar"><el-avatar :size="100" :src="avatarUrl" /></div>
      <div class="middle">
        <div class="name">番茄炒小六</div>
        <div class="explain">
          <div class="detail" @click="editInformation">+你从事什么职业</div>
          <div class="detail" @click="editInformation">+你的公众号</div>
        </div>
      </div>
      <div class="edit">
        <el-button type="primary" plain @click="editInformation"
          >编辑个人资料</el-button
        >
      </div>
    </div>
    <div class="content">
      <div class="nav">
        <span
          :class="{ activeStyle: activeIndex === index }"
          v-for="(item, index) in nav"
          :key="item.label"
          @click="changeRouter(item.name, index)"
          >{{ item.label }}</span
        >
      </div>
      <div class="detail">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  setup() {
    const avatarUrl = require('@/assets/portrait.png')
    let activeIndex = ref(0)
    const nav = reactive([
      {
        name: 'homeDynamic',
        label: '动态'
      },
      {
        name: 'homeArticle',
        label: '文章'
      },
      {
        name: 'homeBrochure',
        label: '小册'
      },
      {
        name: 'homeCollection',
        label: '收藏集'
      },
      {
        name: 'homeLike',
        label: '赞过的'
      },
      {
        name: 'homeAttention',
        label: '关注'
      }
    ])

    // const dialogVisible = ref(false)
    const editInformation = function () {
      router.push({
        name: 'setting'
      })
    }

    const changeRouter = function (routerName: string, index: number) {
      router.push({
        name: routerName
      })
      activeIndex.value = index
    }
    return {
      nav,
      avatarUrl,
      activeIndex,
      editInformation,
      changeRouter
    }
  }
})
</script>

<style scoped lang="less">
.homepage {
  height: 100%;
  margin-top: 10px;
  background-color: white;
  .top {
    height: 200px;
    display: flex;
    align-items: center;
    .avatar {
      padding: 0 20px;
    }
    .middle {
      width: 65%;
      .name {
        height: 50px;
        font-size: 24px;
      }
      .explain {
        cursor: pointer;
        color: #3e78af;
        .detail {
          height: 25px;
        }
      }
    }
    .edit {
    }
  }
  .content {
    border-top: 10px solid rgb(240, 240, 240);
    height: calc(100% - 200px);

    .nav {
      height: 50px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgb(240, 240, 240);
      span {
        padding: 0 30px;
      }

      span:hover {
        cursor: pointer;
        color: #58acfa;
      }
      .activeStyle {
        color: #58acfa;
      }
    }
    .detail {
    }
  }
}
</style>
