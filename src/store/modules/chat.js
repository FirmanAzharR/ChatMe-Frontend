import axios from 'axios'

export default {
  modules: {},
  state: {
    resultChatList: '',
    resultChats: '',
    rooms: ''
  },
  mutations: {
    getChatRoom(state, payload) {
      state.resultChats = payload
    },
    pushMessage(state, payload) {
      state.resultChats.push(payload)
    },
    setRooms(state, payload) {
      state.rooms = payload
    },
    setChatList(state, payload) {
      state.resultChatList = payload
    }
  },
  actions: {
    getChatList(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_PORT}/chat/${payload}`)
          .then(result => {
            context.commit('setChatList', result.data.data)
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
            resolve(result)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    getRoom(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `${process.env.VUE_APP_PORT}/chat/${payload.key_room}/${payload.user_id}`
          )
          .then(result => {
            context.commit('setRooms', result.data.data)
            resolve(result)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    createRoom(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_PORT}/chat/create/room`, payload)
          .then(result => {
            resolve(result)
          })
          .catch(error => {
            reject(error)
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
          })
          .catch(error => {
            reject(error.response)
          })
      })
    }
  },
  getters: {
    getChatLists(state) {
      return state.resultChatList
    },
    getRooms(state) {
      return state.rooms
    },
    getResultChat(state) {
      return state.resultChats
    }
  }
}
