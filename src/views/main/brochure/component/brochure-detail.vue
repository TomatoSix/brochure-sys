<template>
  <div class="brochure-detail">
    <div class="top">
      <div class="left"><img :src="bookUrl" alt="" /></div>
      <div class="right">
        <div class="title">Mysql性能调优必知必会</div>
        <div class="explain">摄入解读底层原理, 搞懂Mysql性能优化内幕</div>
        <div class="author">
          <div class="portrait"><el-avatar :size="30" :src="avatarUrl" /></div>
          <div class="name">小杨爱技术</div>
          <div class="figure">公众号 「三元同学」</div>
        </div>
        <el-button type="primary" class="purchase">购买: 49.9</el-button>
      </div>
    </div>
    <div class="content">
      <div class="left-content">
        <div class="nav">
          <div
            v-for="(item, index) in nav"
            :key="index"
            :class="{ item: true, activeItem: index === activeIndex }"
            @click="changeRoute(item, index)"
          >
            {{ item.label }}
          </div>
        </div>
        <div class="bottom"><router-view></router-view></div>
      </div>
      <div class="right-content">
        <div class="recommend">推荐小册</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  setup() {
    const bookUrl = require('@/assets/book.png')
    const avatarUrl = require('@/assets/portrait.png')
    let nav = reactive([
      {
        name: 'introduce',
        label: '介绍'
      },
      {
        name: 'catalogue',
        label: '目录'
      },
      {
        name: 'comment',
        label: '评论'
      }
    ])
    let activeIndex = ref(0)
    const changeRoute = function (item: any, index: number) {
      activeIndex.value = index
      router.push({
        name: item.name
      })
    }
    return { bookUrl, avatarUrl, nav, activeIndex, changeRoute }
  }
})
</script>

<style scoped lang="less">
.brochure-detail {
  height: 100%;
  .top {
    display: flex;
    height: 200px;
    background-color: white;
    margin: 10px 0;
    padding: 20px;
    .left {
      background-color: tomato;
      width: 160px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .right {
      padding: 0 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        font-size: 24px;
        font-weight: 600;
        height: 50px;
        line-height: 50px;
      }
      .expalin {
        color: #c9cbbf;
      }
      .author {
        display: flex;
        align-items: center;
        .portrait {
          margin-right: 10px;
        }
        .name {
          margin-right: 20px;
        }
        .figure {
          color: #68696e;
        }
      }
      .purchase {
        width: 100px;
      }
    }
  }
  .content {
    background-color: white;
    height: calc(100% - 200px);
    display: flex;

    .left-content {
      margin-right: 10px;
      width: 70%;
      border-right: 10px solid rgb(240, 240, 240);
      .nav {
        padding: 20px;
        display: flex;
        border-bottom: 1px solid #ececed;
        .item {
          margin: 0 30px;
          cursor: pointer;
        }
        .activeItem {
          color: #3e78af;
        }
      }
    }
    .right-content {
      width: 30%;

      .recommend {
        font-weight: 600;
        padding: 20px;
        border-bottom: 1px solid #ececed;
      }
    }
  }
}
</style>
