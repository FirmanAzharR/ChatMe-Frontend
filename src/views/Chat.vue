<template>
  <div class="chat rubik">
    <b-container fluid>
      <b-row>
        <b-col md="4" lg="4" class="p-0">
          <div v-if="page === 'chatlist'">
            <ChatList />
          </div>
          <div v-else-if="page === 'profile'">
            <Profile />
          </div>
        </b-col>
        <b-col md="8" lang="8" class="p-0">
          <ChatRoom />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ChatList from '../components/_base/Chat/ChatList'
import ChatRoom from '../components/_base/Chat/ChatRoom'
export default {
  name: 'Chat',
  components: {
    ChatList,
    ChatRoom
  },
  data() {
    return {
      page: 'chatlist'
    }
  },
  created() {},
  methods: {}
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&family=Rubik:wght@300;400;500;600;700&display=swap');
.rubik {
  font-family: 'Rubik', sans-serif;
}
</style>
