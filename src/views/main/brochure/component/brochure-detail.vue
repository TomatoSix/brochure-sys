<template>
  <div class="brochure-detail">
    <div class="top">
      <div class="left"><img :src="bookUrl" alt="" /></div>
      <div class="right">
        <div class="title">{{ brochure.headline }}</div>
        <div class="explain">{{ brochure.outline }}</div>
        <div class="author">
          <div class="portrait"><el-avatar :size="30" :src="avatarUrl" /></div>
          <div class="name">{{ brochure.authorName }}</div>
          <div class="figure"></div>
        </div>
        <div class="btn">
          <div class="button" v-if="isPurchase === 0">
            <el-button
              type="primary"
              class="purchase"
              @click="dialogVisible = true"
              >购买: {{ brochure.price }}</el-button
            >
          </div>

          <div class="button" v-if="isPurchase === 1">
            <el-button type="primary" class="purchase" @click="routerToStudy"
              >学习</el-button
            >
          </div>
        </div>

        <el-dialog v-model="dialogVisible" width="30%">
          <span>是否确认购买?</span>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="purchase">确认</el-button>
            </span>
          </template>
        </el-dialog>
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
        <div class="tomato">
          <div v-for="(item, index) in recommend" :key="index" class="img">
            <img :src="item.img" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import {
  getBrochureById,
  purchaseBrochure,
  hasPurchase
} from '@/service/article/article'
export default defineComponent({
  setup() {
    const bookUrl = require('@/assets/book.png')
    const avatarUrl = require('@/assets/portrait.png')
    const route = useRoute()
    let activeIndex = ref(0)
    let isPurchase = ref(0)
    const dialogVisible = ref(false)
    const store = useStore()
    let brochureId = route.query.id as string
    let buyer = store.state.login.userInfo.id
    let brochure: any = ref({})
    const recommend = reactive([
      {
        img: require('@/assets/img/recommend1.png')
      },
      {
        img: require('@/assets/img/recommend2.png')
      }
    ])
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

    const changeRoute = function (item: any, index: number) {
      activeIndex.value = index
      router.push({
        name: item.name,
        query: {
          id: brochureId
        }
      })
    }

    const getData = function () {
      getBrochureById(brochureId).then((res) => {
        if (res.returnCode === '0000') {
          brochure.value = res.data
          console.log(brochure.value, 'value')
        }
      })
    }
    // 是否购买
    const getPurchase = function () {
      const params = {
        brochureId: brochureId,
        buyer: buyer
      }
      console.log(params, 'params')

      hasPurchase(params).then((res) => {
        if (res.returnCode === '0000') {
          console.log(res, '已经购买')
          isPurchase.value = res.data.isPurchase
        }
      })
    }
    // 点击购买
    const purchase = function () {
      dialogVisible.value = false
      // 获取当前小册的用户Id

      // 调用接口 关于订单的
      const params: any = {
        brochureId: brochureId,
        buyer: buyer,
        seller: brochure.value.user_id
      }

      purchaseBrochure(params)
        .then((res) => {
          if (res.returnCode === '0000') {
            console.log(res.data, 'data2')
            ElMessage({
              message: '购买成功！',
              type: 'success'
            })
            isPurchase.value = res.data.isPurchase
            // 跳转到小册页面
            routerToStudy()
          }
        })
        .catch(() => {
          ElMessage({
            message: '购买失败',
            type: 'error'
          })
        })
    }
    const routerToStudy = function () {
      router.push({
        name: 'brochureShow',
        query: {
          id: brochureId,
          title: brochure.value.headline
        }
      })
    }
    onMounted(() => {
      getData()
      getPurchase()
    })
    return {
      bookUrl,
      avatarUrl,
      recommend,
      brochure,
      nav,
      dialogVisible,
      activeIndex,
      isPurchase,
      changeRoute,
      getData,
      purchase,
      routerToStudy,
      getPurchase
    }
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
      flex: 1;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .right {
      flex: 4;
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
      .tomato {
        padding-top: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .img {
          margin-bottom: 20px;
          width: 120px;
          height: 140px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
