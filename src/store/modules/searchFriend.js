import axios from 'axios'

export default {
  modules: {},
  state: {
    resultSearch: '',
    resultReq: '',
    resultList: ''
  },
  mutations: {
    searchFriend(state, payload) {
      state.resultSearch = payload
    },
    getReq(state, payload) {
      state.resultReq = payload
    },
    getList(state, payload) {
      state.resultList = payload
    }
  },
  actions: {
    getList(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_PORT}/friend/list/${payload}`)
          .then(result => {
            context.commit('getList', result.data.data)
            resolve(result)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    friendSearch(context, payload) {
      console.log(payload)
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_PORT}/friend/5`, payload)
          .then(result => {
            context.commit('searchFriend', result.data.data)
            resolve(result)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    addFriend(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_PORT}/friend/add/5`, payload)
          .then(result => {
            resolve(result)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    getReqFriend(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_PORT}/friend/list/req/${payload}`)
          .then(result => {
            context.commit('getReq', result.data.data)
            resolve(result)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    accFriend(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_PORT}/friend/acc/${payload.id_user2}`,
            payload
          )
          .then(result => {
            resolve(result)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    }
  },
  getters: {
    getSearchFriend(state) {
      return state.resultSearch
    },
    getReqFriends(state) {
      return state.resultReq
    },
    getListFriend(state) {
      return state.resultList
    }
  }
}
