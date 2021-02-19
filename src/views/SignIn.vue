<template>
  <div class="signin">
    <div class="rubik" v-if="getPage === 'login'">
      <Login />
    </div>
    <div class="rubik" v-if="getPage === 'register'">
      <Register />
    </div>
    <div class="rubik" v-if="getPage === 'forgot'">
      <Forgot />
    </div>
    <div class="rubik" v-if="getPage === 'reset'">
      <Reset />
    </div>
  </div>
</template>
<script>
import Login from '../components/_base/Auth/Login'
import Register from '../components/_base/Auth/Register'
import Forgot from '../components/_base/Auth/Forgot'
import Reset from '../components/_base/Auth/ResetPass'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'SignIn',
  components: {
    Login,
    Register,
    Forgot,
    Reset
  },
  data() {
    return {}
  },
  created() {
    const page = this.$route.query.page
    const key = this.$route.query.key
    if ((key !== 'undefined') & (page === 'reset')) {
      this.changePage(page)
    } else {
      this.changePage('login')
    }
  },
  computed: {
    ...mapGetters(['getPage'])
  },
  methods: {
    ...mapMutations(['changePage'])
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&family=Rubik:wght@300;400;500;600;700&display=swap');
.rubik {
  font-family: 'Rubik', sans-serif;
}
</style>
