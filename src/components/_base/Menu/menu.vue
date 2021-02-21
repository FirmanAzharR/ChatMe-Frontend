<template>
  <div>
    <!-- start modal -->
    <b-modal scrollable ref="my-modal" hide-footer title="Friend List">
      <b-card v-if="modalType === 'listfriend'">
        <div
          class="box-msg"
          v-for="(item, index) in getListFriend"
          :key="index"
        >
          <img
            :src="
              item.user_photo !== ''
                ? `http://localhost:5000/profileImages/` + item.user_photo
                : require('../../../assets/img/default.jpg')
            "
            alt="avatar"
            class="image-profile"
          />
          <div
            @click="ProfileFriend(item.user_id)"
            class="main-msg"
            type="button"
          >
            <h5 class="text1">{{ item.user_fullname }}</h5>
            <div class="text2">
              Online
            </div>
          </div>
          <div class="date-time">
            <b-icon icon="chat-dots-fill" class="icons-msg"></b-icon>
          </div>
        </div>
      </b-card>
      <b-card v-if="modalType === 'addfriend'">
        <b-form-input
          class="search-input"
          type="text"
          placeholder="Search friend by email . . ."
          v-model="form.user_email"
          @keyup.enter="search"
        ></b-form-input>
        <hr />
        <div
          class="box-msg"
          v-for="(item, index) in getSearchFriend"
          :key="index"
        >
          <img src="../../../assets/img/default.jpg" alt="" />
          <div class="main-msg">
            <h5 class="text1">{{ item.user_displayname }}</h5>
            <div class="text2">
              Online
            </div>
          </div>
          <div class="date-time">
            <b-icon
              icon="plus"
              class="icons-msg"
              v-if="getSearchFriend[0].user_email !== setUser.user_email"
              @click="addFriends(item.user_email)"
            ></b-icon>
          </div>
        </div>
      </b-card>
      <b-card v-if="modalType === 'reqFriend'">
        <div v-for="(item, index) in getReqFriends" :key="index">
          <div class="box-msg">
            <img src="../../../assets/img/img-msg2.jpg" alt="" />
            <div class="main-msg">
              <h5 class="text1">{{ item.user_fullname }}</h5>
              <div class="text2">
                Online
              </div>
            </div>
            <div class="date-time">
              <b-icon
                icon="check"
                class="icons-msg"
                @click="accReqFriend(item.id_user2)"
              ></b-icon>
            </div>
          </div>
        </div>
      </b-card>
      <b-button class="mt-2" variant="danger" block @click="hideModal"
        >Close</b-button
      >
    </b-modal>
    <!-- end modal -->
    <!-- sidebar -->
    <div>
      <b-sidebar
        id="sidebar-right"
        right
        backdrop-variant="dark"
        backdrop
        width="430px"
      >
        <div class="px-3 py-2">
          <ProfileFriend />
        </div>
      </b-sidebar>
    </div>
    <div>
      <b-sidebar id="sidebar-1" backdrop-variant="dark" backdrop width="430px">
        <div class="px-3 py-2">
          <Profile />
        </div>
      </b-sidebar>
    </div>
    <!-- end sidebar -->
    <div class="app-name">
      <h3>Telegram</h3>
      <b-dropdown id="dropdown-left" text="Menu" variant="primary" class="m-2">
        <b-dropdown-item type="button" v-b-toggle.sidebar-1
          >Setting</b-dropdown-item
        >
        <b-dropdown-item @click="showModal('listfriend')"
          >Contact</b-dropdown-item
        >
        <b-dropdown-item @click="showModal('addfriend')"
          >Invite Friend</b-dropdown-item
        >
        <b-dropdown-item @click="showModal('reqFriend')"
          >Friend Request</b-dropdown-item
        >
        <b-dropdown-item href="#">Create Group</b-dropdown-item>
        <b-dropdown-item @click="logout">Logout</b-dropdown-item>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Profile from '../Profile/Profile'
import ProfileFriend from '../Profile/ProfileFriend'
import vueNotif from '../../../mixins/vueNotif'
export default {
  components: { Profile, ProfileFriend },
  name: 'Menu',
  mixins: [vueNotif],
  data() {
    return {
      sideRight: 0,
      navClick: 1,
      modalType: 'listfriend',
      form: {
        user_email: ''
      }
    }
  },
  created() {
    const id = this.setUser.user_id
    this.getReqFriend(id)
    this.getList(id)
    this.getChatList(id)
  },
  computed: {
    ...mapGetters([
      'getSearchFriend',
      'setUser',
      'getReqFriends',
      'getListFriend',
      'getChatLists',
      'getResultChat'
    ])
  },
  methods: {
    ...mapMutations(['searchFriend']),
    ...mapActions([
      'getProfile',
      'friendSearch',
      'addFriend',
      'getReqFriend',
      'accFriend',
      'getList',
      'getChatList',
      'getChat',
      'logout',
      'getProfileFriend'
    ]),
    ProfileFriend(id) {
      this.sideRight = 1
      this.getProfileFriend(id)
        .then(result => {
          this.hideModal()
          this.$root.$emit('bv::toggle::collapse', 'sidebar-right')
          console.log(result)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getChats(key) {
      const data = {
        key_room: key,
        user_id: this.setUser.user_id
      }
      this.getChat(data)
    },
    accReqFriend(friend_id) {
      //alert(friend_id)
      delete this.form.user_email
      this.form = {
        user1: this.setUser.user_id,
        user2: friend_id
      }
      this.accFriend(this.form)
        .then(result => {
          this.vueToastSuccess(`${result.data.msg}`)
          this.getReqFriend(this.setUser.user_id)
          this.getList(this.setUser.user_id)
        })
        .catch(error => {
          console.log(error)
          this.vueToastFailed('Failed acc friend')
        })
    },
    addFriends(email) {
      this.form = {
        user_email: email,
        user_id: this.setUser.user_id
      }
      this.addFriend(this.form)
        .then(result => {
          this.vueToastSuccess(`${result.data.msg}`)
          this.hideModal()
        })
        .catch(error => {
          console.log(error)
          this.vueToastFailed('Failed add friend')
        })
    },
    search() {
      this.friendSearch(this.form)
        .then(result => {
          console.log(result)
        })
        .catch(error => {
          this.vueToastFailed('Friend not found')
          console.log(error)
        })
    },
    showModal(type) {
      this.modalType = type
      this.$refs['my-modal'].show()
    },
    hideModal() {
      this.$refs['my-modal'].hide()
      this.sideRight = 0
      this.searchFriend('')
      this.form = {
        user_email: ''
      }
    }
  }
}
</script>

<style scoped>
.search-input {
  margin-bottom: 20px;
  height: 45px;
  border-radius: 20px;
}
.search-input:focus {
  box-shadow: 0 0 0 0.2rem rgba(115, 53, 231, 0.301);
  border: 1px solid #7e98df;
}
.nav {
  text-align: center;
  margin-bottom: 20px;
  justify-content: center;
}
.nav div {
  padding: 5px;
  margin-right: 20px;
  border-radius: 10px;
  color: #7e98df;
  font-weight: 500;
  cursor: pointer;
}
.input {
  height: 60px;
  border-radius: 15px;
  margin-right: 5px;
}
.icons {
  font-size: 30px;
  color: #7e98df;
  cursor: pointer;
}
.icons2 {
  font-size: 55px;
  color: #7e98df;
  cursor: pointer;
}
.icons-msg {
  font-size: 35px;
  color: #7e98df;
  cursor: pointer;
}
.app-name h3 {
  font-size: 29px;
  color: #7e98df;
  font-weight: 500px;
}
.card {
  border-radius: 0px;
  border: none;
}
.card .card-body {
  padding-top: 30px;
  padding-left: 30px;
}
.app-name {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}
.search-msg {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.box-msg {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.box-msg:hover {
  cursor: pointer;
}
.box-msg img {
  width: 64px;
  height: 64px;
  border-radius: 20px;
  object-fit: cover;
}
.text1 {
  width: 250px;
  font-size: 18px;
  font-weight: 500;
}
.text2 {
  width: 250px;
  font-size: 14px;
  font-weight: 400;
  color: #7e98df;
}
.time {
  color: #848484;
  font-size: 14px;
}
.round {
  width: 20px;
  height: 20px;
  border-radius: 50px;
  color: white;
  background-color: #7e98df;
  float: right;
  text-align: center;
  font-size: 14px;
}

@media only screen and (max-width: 600px) {
  .text1 {
    width: 190px;
    font-size: 16.5px;
    font-weight: 500;
  }
  .text2 {
    width: 190px;
    font-size: 12px;
    font-weight: 400;
    color: #7e98df;
  }
}

/* @media only screen and (min-width: 768px) {
  .text1 {
    width: 160px;
    font-size: 16px;
    font-weight: 500;
  }
  .text2 {
    width: 160px;
    font-size: 12px;
    font-weight: 400;
    color: #7e98df;
  }
  .input {
    height: 40px;
    border-radius: 15px;
    margin-right: 5px;
  }
  .box-msg img {
    width: 56px;
    height: 56px;
  }
} */
</style>
