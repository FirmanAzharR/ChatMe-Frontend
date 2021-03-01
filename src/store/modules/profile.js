import axios from 'axios'
export default {
  modules: {},
  state: {
    resultProfile: '',
    pageType: 'chatlist',
    resultProfileFriend: '',
    profileClick: 0
  },
  mutations: {
    clickProfile(state, payload) {
      state.profileClick = payload
    },
    getProfile(state, payload) {
      state.resultProfile = payload
    },
    setProfileFriend(state, payload) {
      state.resultProfileFriend = payload
    },
    changePage(state, payload) {
      state.pageType = payload
    }
  },
  actions: {
    updateLocation(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_PORT}/profile/update-profile/maps/location/${payload.user_id}`,
            payload.data
          )
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error.response.data.msg)
          })
      })
    },
    updateProfile(context, payload) {
      return new Promise((resolve, reject) => {
        const {
          user_name,
          user_fullname,
          user_phone,
          user_bio,
          user_photo
        } = context.state.resultProfile[0]
        const data = new FormData()
        data.append('user_name', user_name)
        data.append('user_fullname', user_fullname)
        data.append('user_phone', user_phone)
        data.append('user_bio', user_bio)
        data.append('user_photo', user_photo)
        // for (var pair of data.entries()) {
        //   console.log(pair[0] + ', ' + pair[1])
        // }

        axios
          .patch(
            `${process.env.VUE_APP_PORT}/profile/update-profile/${payload}`,
            data
          )
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error.response.data.msg)
          })
      })
    },
    changePassword(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_PORT}/profile/update-profile/pass/${payload.user_id}`,
            payload
          )
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error.response.data.msg)
          })
      })
    },
    deleteProfileImg(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`${process.env.VUE_APP_PORT}/profile/delete-img`, payload)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error.response.data.msg)
          })
      })
    },
    getProfile(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_PORT}/profile/${payload}`)
          .then(result => {
            context.commit('getProfile', result.data.data)
            resolve(result)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    getProfileFriend(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_PORT}/profile/${payload}`)
          .then(result => {
            context.commit('setProfileFriend', result.data.data)
            resolve(result)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    }
  },
  getters: {
    getProfiles(state) {
      return state.resultProfile
    },
    getProfilesFriend(state) {
      return state.resultProfileFriend
    },
    getClickProfile(state) {
      return state.profileClick
    }
  }
}
