<template>
  <div class="activity">
    <div class="item" v-for="item in activityData" :key="item.id">
      <img :src="item.img" alt="" />
      <div class="title">
        {{ item.title }}
      </div>
      <div class="time">
        <i class="iconfont icon-rili"></i>
        {{ item.time }}
      </div>
      <div class="btn">
        <el-button type="primary" size="small">报名参加</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const img = require('@/assets/img/img1.png')
    const activityData = reactive([
      {
        id: '1',
        img: require('@/assets/img/img1.png'),
        title: '移动互联网精细化运营增长方法与实践',
        time: '05-14'
      },
      {
        id: '2',
        img: require('@/assets/img/img2.png'),
        title: '字节跳动flutter开发者大赛',
        time: '05-18'
      },
      {
        id: '3',
        img: require('@/assets/img/img3.png'),
        title: '前端性能优化训练营',
        time: '05-20'
      },
      {
        id: '4',
        img: require('@/assets/img/img4.png'),
        title: '可视化查询',
        time: '05-20'
      },
      {
        id: '5',
        img: require('@/assets/img/img5.png'),
        title: '大前端时代的挑战与机遇',
        time: '05-20'
      }
    ])
    return { img, activityData }
  }
})
</script>

<style scoped lang="less">
.activity {
  margin-top: 10px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 20px 0 0 20px;

  .item {
    cursor: pointer;
    box-sizing: border-box;
    background-color: white;
    position: relative;
    top: 0;
    width: 200px;
    height: 280px;
    padding: 10px;
    align-content: space-between;
    margin-right: 20px;
    img {
      width: 100%;
      height: 50%;
    }
    .title {
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      padding: 20px 10px;
      font-weight: 600;
    }
    .time {
      padding: 10px;
      font-size: 12px;
    }
    .btn {
      display: flex;
      justify-content: flex-end;
    }
  }
  .item:hover {
    transition: top 1s;
    top: -5px;
  }
}
</style>
