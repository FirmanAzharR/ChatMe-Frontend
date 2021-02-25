<template>
  <div>
    <div class="header-name">
      <div class="box-msg">
        <img
          :src="
            getRooms[0].user_photo !== ''
              ? `http://localhost:5000/profileImages/` + getRooms[0].user_photo
              : require('../../../assets/img/default.jpg')
          "
          alt=""
        />
        <div class="main-msg">
          <h5 class="text1">{{ getRooms[0].user_fullname }}</h5>
          <div class="status">{{ getRooms[0].user_status }}</div>
        </div>
      </div>
    </div>
    <div class="chat-room-fill" v-if="getResultChat.length > 0">
      <div class="scrollspy">
        <div
          class="main-chat"
          v-for="(item, index) in getResultChat"
          :key="index"
        >
          <div class="conversation" v-if="setUser.user_id === item.id_sender">
            <div class="left-chat">
              <img
                :src="
                  getProfiles[0].user_photo !== ''
                    ? `http://localhost:5000/profileImages/` +
                      getProfiles[0].user_photo
                    : require('../../../assets/img/default.jpg')
                "
                alt="avatar"
                class="img"
              />
              <b-card class="card-left">
                {{ item.message }}
                <br />
                <div class="time-chat">{{ item.times }}</div>
              </b-card>
            </div>
          </div>
          <div v-else class="conversation">
            <div class="right-chat">
              <b-card class="card-right">
                {{ item.message }}
                <br />
                <div class="time-chat" style="color:#848484">
                  {{ item.times }}
                </div>
              </b-card>
              <img
                :src="
                  getRooms[0].user_photo !== ''
                    ? `http://localhost:5000/profileImages/` +
                      getRooms[0].user_photo
                    : require('../../../assets/img/default.jpg')
                "
                alt="avatar"
                class="img-right"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="forms">
        <div class="input-group">
          <b-form-input
            type="text"
            autocomplete="off"
            style="border-radius:20px;margin-left:20px;margin-right:10px;height:40px"
            placeholder="Write a messaage ..."
            v-model="message"
            @keyup.enter="
              sendMessage(
                setUser.user_id,
                getResultChat[0].user2,
                getResultChat[0].key_room
              )
            "
          ></b-form-input>
          <div
            style="font-size: 35px;cursor:pointer"
            @click="
              sendMessage(
                setUser.user_id,
                getResultChat[0].user2,
                getResultChat[0].key_room
              )
            "
          >
            <b-icon
              icon="cursor-fill"
              class="rounded-circle p-2"
              style="background-color:#7D97DD;margin-right:20px;"
              variant="light"
            ></b-icon>
          </div>
        </div>
      </div>
    </div>
    <div class="chat-room-empty" v-else>
      <div class="forms">
        <div class="input-group">
          <b-form-input
            type="text"
            autocomplete="off"
            style="border-radius:20px;margin-left:20px;margin-right:10px;height:40px"
            placeholder="Write a messaage ..."
            v-model="message"
            @keyup.enter="
              sendMessage(
                setUser.user_id,
                getRooms[0].user2,
                getRooms[0].key_room
              )
            "
          ></b-form-input>
          <div
            style="font-size: 35px;cursor:pointer"
            @click="
              sendMessage(
                setUser.user_id,
                getRooms[0].user2,
                getRooms[0].key_room
              )
            "
          >
            <b-icon
              icon="cursor-fill"
              class="rounded-circle p-2"
              style="background-color:#7D97DD;margin-right:20px;"
              variant="light"
            ></b-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { mapGetters, mapActions } from 'vuex'
import vueNotif from '../../../mixins/vueNotif.js'
export default {
  name: 'ChatRoom',
  mixins: [vueNotif],
  data() {
    return {
      results: '',
      socket: io('http://localhost:5000'),
      checkChat: 0,
      message: '',
      messages: [],
      form: {}
    }
  },
  created() {},
  computed: {
    ...mapGetters(['getResultChat', 'setUser', 'getProfiles', 'getRooms'])
  },
  methods: {
    ...mapActions(['sendChat', 'getChat']),
    sendMessage(myId, friendId, key) {
      let today = new Date()
      let time = today.getHours() + ':' + today.getMinutes()
      this.form = {
        my_id: myId,
        friend_id: friendId,
        key_room: key,
        message: this.message
      }
      const data = {
        id_sender: myId,
        key_room: key,
        times: time,
        message: this.message
      }
      const dataGetChat = {
        user_id: myId,
        key_room: key
      }
      const dataNotif = {
        friend_id: friendId,
        from: `@${this.getProfiles[0].user_name}`,
        key_room: key,
        message: this.message
      }
      this.socket.emit('sendMsgNotif', dataNotif)
      this.socket.emit('roomMsg', data)
      this.sendChat(this.form)
        .then(result => {
          this.message = ''
          this.results = result
          this.getChat(dataGetChat)
        })
        .catch(error => {
          this.vueToastFailed('Failed send message')
          this.results = error
        })
    }
  }
}
</script>

<style scoped>
.time-chat {
  font-size: 10px;
}
.conversation {
  padding: 0px;
  margin: 5px 0;
}
.conversation::after {
  content: '';
  clear: both;
  display: table;
}
.forms {
  position: absolute;
  bottom: 20px;
  width: 100%;
}
.input-group {
  display: flex;
  justify-content: center;
  align-items: center;
}
.left-chat {
  padding-top: 10px;
  padding-left: 40px;
  display: flex;
}
.right-chat {
  padding-top: 10px;
  padding-right: 30px;
  display: flex;
  float: right;
}
.img {
  width: 54px;
  height: 54px;
  border-radius: 20px;
  object-fit: cover;
  margin-right: 10px;
  align-self: flex-end;
}
.img-right {
  width: 54px;
  height: 54px;
  border-radius: 20px;
  object-fit: cover;
  margin-right: 10px;
  align-self: flex-start;
}
.card.card-left {
  border-radius: 35px 35px 35px 10px;
  max-width: 400px;
  background-color: #7e98df;
  color: white;
  border: none;
}
.card.card-right {
  border-radius: 35px 10px 35px 35px;
  max-width: 400px;
  margin-right: 10px;
  border: 1px solid #7e98df;
  border: none;
}
.status {
  color: #7e98df;
}
.header-name {
  background-color: white;
  padding-left: 40px;
  padding-top: 20px;
  padding-bottom: 10px;
}
.box-msg {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
}
.box-msg img {
  width: 64px;
  height: 64px;
  border-radius: 20px;
  object-fit: cover;
  margin-right: 20px;
}
.text1 {
  width: 250px;
  font-size: 18px;
  font-weight: 500;
}
.chat-room-empty {
  padding-top: 20px;
  background-color: #fafafa;
  width: auto;
  height: 550px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.chat-room-fill {
  background-color: #fafafa;
  width: auto;
  height: 550px;
  position: relative;
}
.scrollspy {
  position: relative;
  height: 480px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
.scrollspy::-webkit-scrollbar {
  width: 3px; /* width of the entire scrollbar */
}

.scrollspy::-webkit-scrollbar-track {
  background: white; /* color of the tracking area */
}

.scrollspy::-webkit-scrollbar-thumb {
  background-color: rgba(44, 110, 253, 0.651); /* color of the scroll thumb */
  border-radius: 50px; /* roundness of the scroll thumb */
  border: none; /* creates padding around scroll thumb */
}

.chat-room p {
  color: #848484;
  font-size: 24px;
}
</style>
