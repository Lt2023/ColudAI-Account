import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import router from './router/index'
import './router/permission'
import pinia from './pinia/index'
import { Modal, Spin } from 'ant-design-vue'
// import 'ant-design-vue/es/message/style/css';
// import 'ant-design-vue/es/modal/style/css';

// 将用户信息存pinia
import { useUserInfoStore } from './pinia/modules/user'
const userInfoStore = useUserInfoStore(pinia)
let userInfo = sessionStorage.getItem('uinfo')
if (userInfo) {
  let data = JSON.parse(userInfo)
  userInfoStore.login(data)
}

const app = createApp(App)

// app.use(Antd)
app.use(Spin)
app.use(Modal)
app.use(router)
app.use(pinia)

app.mount('#app')