// 引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import 'normalize.css'
import './assets/css/index.css'
import './assets/iconfont/iconfont.css'
import { createApp } from 'vue'

// 引入markdown编辑器
import VMdEditor from '@kangc/v-md-editor'
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import '@kangc/v-md-editor/lib/style/preview.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

// Prism
import Prism from 'prismjs'
// highlight code
import 'prismjs/components/prism-json'

VMdEditor.use(vuepressTheme, {
  Prism
})
VMdPreview.use(vuepressTheme, {
  Prism
})

import { globalRegister } from './global'
import App from './App.vue'
import router from './router'
import store from './store'
import { setupStore } from './store'
// import hyRequest from './service'

// 注册
const app = createApp(App)
app.use(VMdEditor)
app.use(VMdPreview)

app.use(globalRegister)
app.use(router)
app.use(store)
app.use(ElementPlus)
app.use(VMdEditor)
// createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
setupStore()

app.mount('#app')
// console.log(process.env.VUE_APP_BASE_URL, 'baseurl') // dev

// hyRequest.request()
