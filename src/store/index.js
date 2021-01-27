import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './modules/auth'
import Register from './modules/register'
import Search from './modules/searchFriend'
import Profile from './modules/profile'
import Chat from './modules/chat'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: { Auth, Register, Search, Profile, Chat },
  state: {},
  mutations: {},
  action: {},
  getters: {},
  plugins: [
    createPersistedState({
      path: ['Auth.user']
    })
  ]
})
