<template>
  <div class="brochure-manage">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="已发布" name="emit" class="content">
        <div
          v-for="item in brochureData"
          :key="item.id"
          class="item"
          @click="routerToDetail(item)"
        >
          <div>
            {{ item.headline }}
          </div>
          <div class="time">{{ item.createTime }}</div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="编辑中" name="edit" class="content">
        <div
          v-for="item in editData"
          :key="item.id"
          class="item"
          @click="routerToEdit(item)"
        >
          <div>
            {{ item.headline }}
          </div>
          <div class="time">{{ item.createTime }}</div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { getBrochureByUserId } from '@/service/article/article'
import { useStore } from 'vuex'
import router from '@/router'
import { formatUtcString } from '@/utils/date-format'

export default defineComponent({
  setup() {
    const activeName = ref('emit')
    const brochureData = ref([])
    const editData = ref([])
    const store = useStore()
    const userId = store.state.login.userInfo.id
    const handleClick = () => {
      console.log('111')
    }
    const getBrochureData = function () {
      getBrochureByUserId(userId).then((res) => {
        console.log(res, 'res')
        res.data.forEach((item: any) => {
          item.createTime = formatUtcString(item.createTime)
        })
        brochureData.value = res.data.filter((item: any) => {
          return item.isPublish === '1'
        })
        editData.value = res.data.filter((item: any) => {
          return item.isPublish === '0'
        })
      })
    }
    const routerToEdit = function (item: any) {
      console.log(item, 'item')

      router.push({
        name: 'booklet',
        query: {
          brochureId: item.brochureId
        }
      })
    }
    const routerToDetail = function (item: any) {
      router.push({
        name: 'brochureDetail',
        query: {
          brochureId: item.brochureId
        }
      })
    }
    onMounted(() => {
      getBrochureData()
    })
    return {
      brochureData,
      activeName,
      editData,
      handleClick,
      getBrochureData,
      routerToEdit,
      routerToDetail
    }
  }
})
</script>

<style scoped lang="less">
.brochure-manage {
  margin: 20px 30px;
  .content {
    .item {
      color: #191919;
      box-sizing: border-box;
      padding: 15px 0;
      border-bottom: 1px solid #f5f8f8;
      cursor: pointer;

      .time {
        margin: 15px 0;
        color: #808080;
        font-size: 14px;
      }
    }
    .item:hover {
      background-color: #f7fafa;
    }
  }
}
</style>
