<template>
  <div class="brochure">
    <div
      class="section"
      v-for="item in brochure"
      :key="item.title"
      @click="pushDetail(item.id)"
    >
      <div class="img">
        <img :src="item.img" alt="" />
      </div>
      <div class="right">
        <div class="title">{{ item.title }}</div>
        <div class="explain">{{ item.explain }}</div>
        <div class="author">
          <el-avatar :size="25" :src="item.author.authorAvatar" />
          <span>
            {{ item.author.authorName }}
          </span>
        </div>
        <div class="detail">
          <div class="price">¥{{ item.price }}</div>
          <span class="other"
            >{{ item.section }}小节 {{ item.purchase }}人已购买</span
          >
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const brochure = reactive([
      {
        id: 1,
        title: '初探前端工程化',
        img: require('@/assets/nodejs.png'),
        explain: '将工程化和前端开发结合,让开发事半功倍',
        price: '29.9',
        section: '18',
        purchase: '1181',
        author: {
          authorAvatar: require('@/assets/portrait.png'),
          authorName: 'zxg_神说',
          authorDetail: '公众号[神光的编程秘籍]'
        }
      },
      {
        id: 2,
        title: '初探前端工程化',
        img: require('@/assets/nodejs.png'),
        explain: '将工程化和前端开发结合,让开发事半功倍',
        price: '29.9',
        section: '18',
        purchase: '9317',
        author: {
          authorAvatar: require('@/assets/portrait.png'),
          authorName: '我不是外星人',
          authorDetail: '前端工程师 @ 某大型电商'
        }
      }
    ])

    const pushDetail = function (id: number) {
      router.push({
        name: 'brochureDetail',
        params: {
          id: id
        }
      })
      console.log(id, '111')
    }
    return {
      brochure,
      pushDetail
    }
  }
})
</script>

<style scoped lang="less">
.brochure {
  background-color: white;
  height: 100%;
  margin-top: 10px;
  .section {
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
}
</style>
