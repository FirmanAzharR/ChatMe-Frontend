import axios from 'axios'

export default {
  modules: {},
  state: {},
  mutations: {},
  actions: {
    register(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_PORT}/user/register`, payload)
          .then(result => {
            resolve(result)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    }
  },
  getters: {}
}
