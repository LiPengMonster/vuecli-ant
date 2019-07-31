import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token'),
    userinfo: localStorage.getItem('userinfo'),
    menu: undefined,
    menuselectkeys: localStorage.getItem('menuselectkeys')
  },
  mutations: {
    // 修改token，并将token存入localStorage
    addtoken(state, token) { // 这里的state对应上面状态state
      state.token = token
      localStorage.setItem('token', token)
    },
    // 修改token，并将token存入localStorage
    removetoken(state) { // 这里的state对应上面状态state
      state.token = undefined
      localStorage.removeItem('token')
      state.userinfo = undefined
      localStorage.removeItem('userinfo')
      state.menu = undefined
      localStorage.removeItem('menuselectkeys')
      state.menuselectkeys = undefined
    },
    adduserinfo(state, userinfo) {
      const {
        id,
        nickname,
        avatar
      } = userinfo
      state.userinfo = JSON.stringify({
        id,
        nickname,
        avatar
      })
      localStorage.setItem('userinfo', JSON.stringify({
        id,
        nickname,
        avatar
      }))
    },
    // 修改token，并将token存入localStorage
    removeuserinfo(state) { // 这里的state对应上面状态state
      state.userinfo = undefined
      localStorage.removeItem('userinfo')
    },
    addmenu(state, menu) {
      state.menu = menu
    },
    removemenu(state) {
      state.menu = undefined
    },
    addmenuselectkeys(state, menuselectkeys) {
      state.menuselectkeys = menuselectkeys
      localStorage.setItem('menuselectkeys', menuselectkeys)
    },
    removemenuselectkeys(state) {
      state.menuselectkeys = undefined
      localStorage.removeItem('menuselectkeys')
    }
  },
  getters: {
    token: state => state.token,
    userinfo: state => state.userinfo,
    menu: state => state.menu,
    menuselectkeys: state => state.menuselectkeys
  },
  actions: {
    commitaddtoken: ({
      commit
    }, token) => commit('addtoken', token),
    commitremovetoken: ({
      commit
    }) => commit('removetoken'),
    commitadduserinfo: ({
      commit
    }, userinfo) => commit('adduserinfo', userinfo),
    commitremoveuserinfo: ({
      commit
    }) => commit('removeuserinfo'),
    commitaddmenu: ({
      commit
    }, menu) => commit('addmenu', menu),
    commitremovemenu: ({
      commit
    }) => commit('removemenu'),
    commitaddmenuselectkeys: ({
      commit
    }, menuselectkeys) => commit('addmenuselectkeys', menuselectkeys),
    commitremovemenuselectkeys: ({
      commit
    }) => commit('removemenuselectkeys')


  }
})
