<template>
  <div class="brochure">
    <div
      class="section"
      v-for="item in brochure"
      :key="item.brochureId"
      @click="pushDetail(item.brochureId)"
    >
      <div class="img">
        <img :src="img" alt="" />
      </div>
      <div class="right">
        <div class="title">{{ item.headline }}</div>
        <div class="explain">{{ item.theme }}</div>
        <div class="author">
          <el-avatar :size="25" :src="avatar" />
          <span>
            {{ item.authorName }}
          </span>
        </div>
        <div class="detail">
          <div class="price">¥{{ item.price }}</div>
          <span class="other"> {{ item.purchaseNumber }}人已购买</span>
        </div>
      </div>
    </div>
    <!-- <router-view></router-view> -->
    <div class="right2">
      <div class="top" @click="routerChange()">已购小册</div>
      <div class="top" @click="routerChange('apply')">成为作者</div>
      <div class="top" @click="routerChange()">建议反馈</div>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import { useRoute } from 'vue-router'
import { defineComponent, onMounted, reactive, ref, useAttrs } from 'vue'
import { getBrochureAll } from '@/service/article/article'
export default defineComponent({
  setup() {
    const img = require('@/assets/nodejs.png')
    const avatar = require('@/assets/portrait.png')
    const brochure = ref([])
    const getBrochureData = function () {
      getBrochureAll().then((res) => {
        if (res.returnCode === '0000') {
          brochure.value = res.data
        }
      })
    }
    onMounted(() => {
      getBrochureData()
    })
    const pushDetail = function (id: number) {
      router.push({
        name: 'brochureDetail',
        query: {
          id: id
        }
      })
      console.log(id, '111')
    }
    return {
      img,
      avatar,
      brochure,
      pushDetail,
      getBrochureData
    }
  }
})
</script>

<style scoped lang="less">
.brochure {
  display: flex;
  background-color: white;
  height: 100%;
  margin-top: 10px;
  .section {
    width: 70%;
    display: flex;
    height: 200px;
    box-sizing: border-box;
    padding: 20px;
    .img {
      width: 130px;
      height: 150px;

      img {
        width: 100%;
        height: 100%;
      }
    }
    .right {
      padding-left: 20px;
      .title {
        height: 50px;
        line-height: 50px;
        font-size: 22px;
      }
      .explain {
        color: gray;
        font-size: 14px;
      }
      .author {
        display: flex;
        align-items: center;
        height: 40px;

        span {
          padding-left: 10px;
        }
      }
      .detail {
        display: flex;
        align-items: center;
        .price {
          font-size: 18px;
          color: tomato;
          margin-right: 15px;
        }
        .other {
          font-size: 12px;
          color: rgb(186, 184, 184);
        }
      }
    }
  }
  .section:hover {
    cursor: pointer;
    background: rgb(240, 240, 240);
  }
  .right2 {
    font-size: 20px;
    flex: 1;
    border-left: 20px solid rgb(240, 240, 240);
    .top {
      cursor: pointer;
      border-bottom: 10px solid rgb(240, 240, 240);
      padding: 30px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
