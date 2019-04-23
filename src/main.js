import Vue from 'vue'
import Antd from 'ant-design-vue' // 导入所有组件
import App from './App.vue'
import router from './routes'
import store from './store'
import axios from './utils/axios'

import 'ant-design-vue/dist/antd.less' // 导入所有组件样式
// import './assets/css/theme.less' // 导入主题
import './mock'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$form = Antd.Form
Vue.use(Antd)

// 导入部分组件
// import { Button } from 'ant-design-vue'
// Vue.component(Button.name, Button)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
