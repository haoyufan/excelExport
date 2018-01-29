import { requestGET, requestPOST } from '@/lib/request'

function createAnonymousUser () {
  return {
    userId: null,
    username: null,
    nickname: '匿名用户',
    avatar: 'http://s.lxiaobao.com/@/monitor-web/static/res/efbbbbdb.png',
    position: '管理员',
    roleList: []
  }
}

export default {
  namespaced: true,
  state: {
    currentUserInfo: createAnonymousUser()
  },
  mutations: {
    update (state, userInfo) {
      Object.assign(state.currentUserInfo, userInfo)
    },
    destroy (state) {
      Object.assign(state.currentUserInfo, createAnonymousUser())
    }
  },
  actions: {
    async login ({ commit }, data) {
      commit('update', await requestPOST('/api/user/login', data))
    },
    async getUserInfo ({ commit }, data) {
      commit('update', await requestGET('/api/user/info', data))
    },
    async logout ({ commit }) {
      commit('update', await requestGET('/api/user/logout'))
    }
  }
}
