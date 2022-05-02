<template>
  <div class="booklet">
    <div class="nav">
      <div class="title">小册写作</div>
      <div class="right">
        <el-button type="primary">保存到草稿箱</el-button>
        <el-button type="primary">点击发布</el-button>

        <div class="avatar" @click="routerChange">
          <el-avatar :size="50" :src="circleUrl" />
        </div>
      </div>
    </div>
    <div class="edit">
      <div class="section">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <div v-for="item in chapter" :key="item.id">
            <el-menu-item :index="chapter.index">
              <span>小册介绍</span>
              来一个图标
            </el-menu-item>
          </div>
        </el-menu>
        <el-button type="primary"> 点击添加章节</el-button>
      </div>
      <div class="editor">
        <v-md-editor v-model="text" height="630px"></v-md-editor>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.booklet {
  height: 100%;
  .nav {
    background-color: #f7f7f7;

    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 50px;
    .title {
      font-size: 20px;
    }
    .right {
      display: flex;
      align-items: center;
      .avatar {
        margin-left: 30px;
        cursor: pointer;
      }
    }
  }
  .edit {
    height: calc((100% - 80px));
    display: flex;
    .section {
      flex: 1;
      height: 100%;
    }
    .editor {
      height: 100%;

      flex: 4;
    }
  }
}
</style>
