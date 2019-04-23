// 认证信息

export default {
  namespaced: true,
  state: {
    user: {
      name: '暂未登录'
    }
  },
  getters: {
    user: state => {
      return state.user
    }
  },
  mutations: {
    setUser (state, data) {
      state.user = data
    }
  },
  actions: {
    async getUserInfo (context) {
      let result = await new Promise((resolve) => {
        setTimeout(() => {
          context.commit('setUser', { name: 'Abiel' })
          resolve({ name: 'Abiel' })
        }, 1000)
      })
      return result
    }
  }
}
