<template>
  <div class="order">
    <el-table :data="tableData" style="width: 100%" max-height="250">
      <el-table-column fixed prop="date" label="购买时间" width="150" />
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="brochure" label="小册购买名称" width="220" />
      <el-table-column prop="price" label="小册价格" width="150" />
      <el-table-column fixed="right" label="Operations" width="120">
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
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const tableData = ref([
      {
        date: '2022-05-01',
        name: '560',
        price: 29.9,
        brochure: '设计模式原理与应用实践'
      },
      {
        date: '2022-05-02',
        name: '小王爱学习',
        price: 29.9,

        brochure: '设计模式原理与应用实践'
      },
      {
        date: '2022-05-03',
        name: '王足各',
        price: 29.9,

        brochure: '设计模式原理与应用实践'
      }
    ])
    return {
      tableData
    }
  }
})
</script>

<style scoped lang="less">
.order {
  padding: 30px;
}
</style>
