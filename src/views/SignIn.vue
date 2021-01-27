<template>
  <div class="signin">
    <div class="rubik" v-if="type === 'login'">
      <Login :typeForm="type" @sendType="formChange" />
    </div>
    <div class="rubik" v-if="type === 'register'">
      <Register :typeForm="type" @sendType="formChange" />
    </div>
    <div class="rubik" v-if="type === 'forgot'">
      <Forgot />
    </div>
  </div>
</template>
<script>
import Login from '../components/_base/Login'
import Register from '../components/_base/Register'
import Forgot from '../components/_base/Forgot'
export default {
  name: 'SignIn',
  data() {
    return {
      type: 'login'
    }
  },
  components: {
    Login,
    Register,
    Forgot
  },
  methods: {
    formChange(type) {
      this.type = type
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&family=Rubik:wght@300;400;500;600;700&display=swap');
.rubik {
  font-family: 'Rubik', sans-serif;
}
</style>
