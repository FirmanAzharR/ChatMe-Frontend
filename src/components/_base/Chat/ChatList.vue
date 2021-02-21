<template>
  <div class="chat-list">
    <b-card>
      <Menu />
      <div class="search-msg">
        <b-form-input
          type="text"
          autocomplete="off"
          class="input"
          placeholder="Type your message ..."
        ></b-form-input>
        <b-icon icon="plus" class="icons2"></b-icon>
      </div>
      <div class="nav">
        <div>Chats</div>
        <div>|</div>
        <div>Group</div>
      </div>
      <div class="list-msg" v-for="(item, index) in getChatLists" :key="index">
        <!-- box message -->
        <div class="box-msg" @click="getChats(item.key_room)">
          <img
            :src="
              item.user_photo !== ''
                ? `http://localhost:5000/profileImages/` + item.user_photo
                : require('../../../assets/img/default.jpg')
            "
            alt="avatar"
            class="image-profile"
          />
          <div class="main-msg">
            <h5 class="text1">{{ item.user_fullname }}</h5>
            <div class="text2">
              {{ item.message }}
            </div>
          </div>
          <div class="date-time">
            <div class="time">15:20</div>
            <div class="unread">
              <div class="round">
                2
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import vueNotif from '../../../mixins/vueNotif'
import Menu from '../Menu/menu'
export default {
  name: 'ChatList',
  mixins: [vueNotif],
  components: {
    Menu
  },
  data() {
    return {}
  },
  created() {
    this.getChatList(this.setUser.user_id)
      .then(result => {
        console.log(result)
      })
      .catch(error => console.log(error))
  },
  computed: {
    ...mapGetters(['setUser', 'getChatLists', 'getResultChat'])
  },
  methods: {
    ...mapActions(['getChatList', 'getChat']),
    getChats(key) {
      const data = {
        key_room: key,
        user_id: this.setUser.user_id
      }
      this.getChat(data)
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
