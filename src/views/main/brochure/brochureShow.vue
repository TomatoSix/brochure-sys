<template>
  <div class="show">
    <div class="nav">
      <div class="title">{{ title }}</div>
      <div class="avatar" @click="routerChange">
        <el-avatar :size="50" :src="circleUrl" />
      </div>
    </div>
    <div class="brochure">
      <div class="cata">
        <el-menu
          default-active="chapter[0].chapterId"
          @select="select"
          class="menu"
        >
          <div v-for="(item, index) in chapter" :key="index">
            <el-menu-item :index="item.chapterId">
              <div class="explain">
                <span class="index">{{ index + 1 }} </span>
                <span class="title">{{ item.title }}</span>
              </div>
            </el-menu-item>
          </div>
        </el-menu>
      </div>
      <div class="article">
        <v-md-preview :text="text"></v-md-preview>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { getChapterAllByBrochureId } from '@/service/article/article'
import router from '@/router'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const route = useRoute()
    const text = ref('')
    const store = useStore()
    const brochureId = route.query.id
    const title = route.query.title

    const circleUrl = store.state.login.userInfo.portrait
    const chapter: any = ref([])

    const routerChange = function () {
      router.push({
        name: 'discover'
      })
    }
    const select = async function (chapterId: string) {
      console.log(chapter, 'chapterId')
      const item = chapter.value.find(
        (item: any) => item.chapterId === chapterId
      )
      text.value = item.content
    }
    // 获取当前小册的所有文章
    const getChaptersAll = async function () {
      getChapterAllByBrochureId(brochureId as string).then((res) => {
        if (res.returnCode === '0000') {
          chapter.value = res.data
          console.log(chapter.value, 'value')
        }
      })
    }
    onMounted(() => {
      getChaptersAll()
    })
    return {
      chapter,
      circleUrl,
      title,
      routerChange,
      select,
      text,
      getChaptersAll
    }
  }
})
</script>

<style scoped lang="less">
.show {
  height: 100%;
  width: 100%;
  .nav {
    position: fixed;
    top: 0;
    height: 80px;
    background-color: white;
    width: 95%;
    z-index: 999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    border-bottom: 1px solid #eaf0ef;
    .title {
      box-sizing: border-box;
      padding: 10px 20px;
      background-color: #eaf0ef;
      font-size: 20px;
      font-weight: 500;
    }
    .avatar {
      cursor: pointer;
    }
  }
  .brochure {
    position: absolute;
    top: 80px;
    height: 100%;
    display: flex;
    .cata {
      position: fixed;
      top: 80px;
      width: 250px;
      height: 100%;
      .menu {
        height: 100%;
        .index {
          font-size: 16px;
          font-weight: 600;
          padding: 0 10px;
        }
        .title {
          font-size: 16px;
        }
      }
    }
    .article {
      margin-left: 250px;
      width: calc(100% - 250px);
    }
  }
}
</style>
