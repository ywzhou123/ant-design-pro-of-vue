import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: Login,
      invisible: true
    }
  ]
})
