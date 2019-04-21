import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  Button,
  LocaleProvider
} from 'ant-design-vue'
Vue.config.productionTip = false

Vue.component(LocaleProvider.name, LocaleProvider)
Vue.component(Button.name, Button)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
