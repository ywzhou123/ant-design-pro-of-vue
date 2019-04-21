import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
      name: '暂未登录'
    }
  },
  getters: {
    userInfo: state => {
      return state.userInfo
    }
  },
  mutations: {
    setUserInfo (state, data) {
      state.userInfo = data
    }
  },
  actions: {
    async getUserInfo (context) {
      let result = await new Promise((resolve) => {
        setTimeout(() => {
          context.commit('setUserInfo', { name: 'Abiel' })
          resolve({ name: 'Abiel' })
        }, 1000)
      })
      return result
    }
  }
})
