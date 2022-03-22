// 引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import 'normalize.css'
import './assets/css/index.css'
import { createApp } from 'vue'
import { globalRegister } from './global'
import App from './App.vue'
import router from './router'
import store from './store'
import { setupStore } from './store'
// import hyRequest from './service'

// 注册
const app = createApp(App)
app.use(globalRegister)
app.use(router)
app.use(store)
app.use(ElementPlus)
// createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
setupStore()

app.mount('#app')
// console.log(process.env.VUE_APP_BASE_URL, 'baseurl') // dev

// hyRequest.request()
