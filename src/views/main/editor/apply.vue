<template>
  <div class="booklet">
    <div class="box">
      <div class="title">小册申请</div>
      <el-form
        class="form"
        label-position="top"
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
      >
        <el-form-item label="小册名称" prop="headline">
          <el-input v-model="ruleForm.headline" />
        </el-form-item>
        <el-form-item label="作者姓名" prop="authorName">
          <el-input v-model="ruleForm.authorName" />
        </el-form-item>
        <el-form-item
          label="作者简介: 公司+职位+项目经历+技术栈+工作年限"
          prop="authorIntroduction"
        >
          <el-input v-model="ruleForm.authorIntroduction" />
        </el-form-item>
        <el-form-item label="小册主题" prop="theme">
          <el-input v-model="ruleForm.theme" />
        </el-form-item>
        <el-form-item label="小册介绍" prop="introduce">
          <el-input v-model="ruleForm.introduce" />
        </el-form-item>
        <el-form-item label="小册大纲" prop="outline">
          <el-input v-model="ruleForm.outline" />
        </el-form-item>
        <el-form-item label="小册价格" prop="outline">
          <el-input v-model="ruleForm.price" />
        </el-form-item>
        <el-form-item>
          <el-button @click="submit(ruleFormRef)" class="btn" type="primary"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import { ElForm, ElMessage, ElMessageBox } from 'element-plus'
import { useStore } from 'vuex'
import { defineComponent, reactive, ref } from 'vue'
import { brochureSubmit } from '@/service/article/article'
export default defineComponent({
  setup() {
    const ruleFormRef = ref<InstanceType<typeof ElForm>>()
    const ruleForm = reactive({
      headline: '', // 小册名称
      author: '', // 作者介绍
      theme: '', // 小册主题
      introduce: '', // 小册介绍
      outline: '', // 小册大纲
      price: ''
    })
    const rules = reactive({
      headline: [
        {
          required: true,
          message: '请输入小册名称',
          trigger: 'blur'
        }
      ],
      authorName: [
        {
          required: true,
          message: '请输入作者名称',
          trigger: 'blur'
        }
      ],
      authorIntroduction: [
        {
          required: true,
          message: '请输入作者简介',
          trigger: 'blur'
        }
      ],
      theme: [
        {
          required: true,
          message: '请输入小册主题',
          trigger: 'blur'
        }
      ],
      introduce: [
        {
          required: true,
          message: '请输入小册介绍',
          trigger: 'blur'
        }
      ],
      outline: [
        {
          required: true,
          message: '请输入小册大纲',
          trigger: 'blur'
        }
      ]
    })
    const store = useStore()
    const submit = (formEl: any) => {
      console.log(formEl)

      formEl.validate((valid: boolean) => {
        if (valid) {
          const id = store.state.login.userInfo.id
          const params = { id, ...ruleForm, isPublish: '0' }
          ElMessageBox.confirm('是否提交小册申请?', 'Warning', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              brochureSubmit(params).then((res) => {
                console.log(res, 'res')
                ElMessage({
                  type: 'success',
                  message: '提交成功'
                })
                router.push({
                  name: 'booklet',
                  query: {
                    brochureId: res.data.brochureId
                  }
                })
              })
            })
            .catch(() => {
              ElMessage({
                type: 'info',
                message: '取消提交'
              })
            })
        } else {
          ElMessage({
            message: '请填写完整',
            type: 'error'
          })
        }
      })
    }
    return { ruleFormRef, ruleForm, rules, submit }
  }
})
</script>

<style scoped lang="less">
.booklet {
  overflow: auto;
  display: flex;
  justify-content: center;
  background-color: rgb(240, 240, 240);

  height: 100%;
  .box {
    width: 800px;
    height: 100%;
    background-color: white;
    .title {
      margin-top: 30px;
      font-weight: 600;
      text-align: center;
      font-size: 24px;
    }
    .form {
      padding: 20px 50px;

      .btn {
        margin-top: 10px;
        width: 800px;
      }
    }
  }
}
</style>
