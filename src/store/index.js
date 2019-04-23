// 存储入口文件，统一将模块存储导入在此
import Vue from 'vue'
import Vuex from 'vuex'
import account from './modules/account'
import setting from './modules/setting'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    account,
    setting
  }
})
