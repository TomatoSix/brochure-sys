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
        <el-button type="primary" class="purchase" @click="dialogVisible = true"
          >购买: {{ brochure.price }}</el-button
        >
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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { getBrochureById } from '@/service/article/article'
export default defineComponent({
  setup() {
    const bookUrl = require('@/assets/book.png')
    const avatarUrl = require('@/assets/portrait.png')
    const route = useRoute()
    let brochureId = route.query.id as string
    let brochure = ref({})
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
    const dialogVisible = ref(false)
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
        }
      })
    }
    const purchase = function () {
      dialogVisible.value = false
      let number = (brochure.value as any).purchaseNumber
      number += 1
      // 调用接口
      ElMessage({
        message: '购买成功！',
        type: 'success'
      })
      // 跳转到小册页面
    }
    onMounted(() => {
      getData()
    })
    return {
      bookUrl,
      avatarUrl,
      brochure,
      nav,
      dialogVisible,
      activeIndex,
      changeRoute,
      getData,
      purchase
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
