<template>
  <div class="order">
    <el-table :data="tableData" style="width: 100%" max-height="250">
      <el-table-column prop="name" label="用户" width="100" />
      <el-table-column prop="headline" label="小册名称" width="250" />
      <el-table-column prop="price" label="价格" width="80" />
      <el-table-column prop="createAt" label="购买时间" width="220" />

      <el-table-column label="Operations" width="120">
        <template #default="scope">
          <el-button
            type="text"
            size="small"
            @click.prevent="deleteRow(scope.$index)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { formatUtcString } from '@/utils/date-format'
import { getOrderList } from '@/service/article/article'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    let tableData: any = ref([])

    const store = useStore()
    const id = store.state.login.userInfo.id
    const getData = function () {
      getOrderList(id).then((res) => {
        console.log(res, 'res')
        if (res.returnCode === '0000') {
          res.data.forEach((item: any) => {
            item.createAt = formatUtcString(item.createAt)
          })
          tableData.value = res.data
        }
      })
    }
    onMounted(() => {
      getData()
    })
    return {
      tableData,
      getData
    }
  }
})
</script>

<style scoped lang="less">
.order {
  padding: 30px;
}
</style>
