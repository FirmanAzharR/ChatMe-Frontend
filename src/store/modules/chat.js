import axios from 'axios'

export default {
  modules: {},
  state: {
    resultChatList: '',
    resultChats: ''
  },
  mutations: {
    getChatRoom(state, payload) {
      state.resultChats = payload
    }
  },
  actions: {
    getChatList(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_PORT}/chat/${payload}`)
          .then(result => {
            context.commit('getList', result.data.data)
            resolve(result)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    getChat(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `${process.env.VUE_APP_PORT}/chat/${payload.user_id}/room/${payload.key_room}`
          )
          .then(result => {
            context.commit('getChatRoom', result.data.data)
            console.log(result)
            resolve(result)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    sendChat(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(
            `${process.env.VUE_APP_PORT}/chat/${payload.user_id}/send`,
            payload
          )
          .then(result => {
            resolve(result)
            console.log(result)
          })
          .catch(error => {
            console.log(error)
            reject(error.response)
          })
      })
    }
  },
  getters: {
    getChatLists(state) {
      return state.resultChatList
    },
    getResultChat(state) {
      return state.resultChats
    }
  }
}
