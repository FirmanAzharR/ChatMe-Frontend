<template>
  <div class="login">
    <b-container style="align-items: stretch;">
      <b-row>
        <b-col md="3"></b-col>
        <b-col md="6">
          <b-card>
            <h5>Login</h5>
            <br />
            <div class="text">Hi, Welcome back !</div>
            <br />
            <b-form @submit.prevent="signIn">
              <div class="label-input">Email</div>
              <b-form-input
                class="input"
                type="email"
                placeholder="Enter your email address"
                required
                autocomplete="off"
                v-model="form.user_email"
              ></b-form-input>
              <br />
              <div class="label-input">Password</div>
              <b-form-input
                class="input"
                type="password"
                placeholder="Enter your password"
                required
                autocomplete="off"
                v-model="form.user_password"
              ></b-form-input>
              <div class="forgot cursor" @click="changePage('forgot')">
                Forgot Password?
              </div>
              <br />
              <b-button block type="submit">Login</b-button>
              <div class="text2">Login with</div>
              <b-button block class="btn2">Google</b-button>
              <div class="text3">
                Don't have an account ?
                <div
                  @click="changePage('register')"
                  class="cursor"
                  style="color:#7e98df;font-weight:500;margin-left:5px"
                >
                  Sign Up
                </div>
              </div>
            </b-form>
          </b-card>
        </b-col>
        <b-col md="3"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import vueNotif from '../../../mixins/vueNotif'
export default {
  name: 'Login',
  mixins: [vueNotif],
  data() {
    return {
      res: '',
      form: {
        user_email: '',
        user_password: ''
      }
    }
  },
  methods: {
    ...mapActions(['login', 'getProfile']),
    ...mapMutations(['changePage']),
    signIn() {
      this.login(this.form)
        .then(result => {
          this.getProfile(result.data.data.user_id)
          this.vueToastSuccess('Login Success')
          setTimeout(() => {
            this.$router.push(`/chat`)
          }, 2000)
        })
        .catch(error => {
          this.vueToastFailed(error.data.msg)
        })
    }
  }
}
</script>

<style scoped>
.input {
  border-radius: 0px;
  border: none;
  border-bottom: 1px solid black;
  padding: 0px;
  font-weight: 500;
}
.input:focus {
  box-shadow: 0 0 0 0rem rgba(255, 255, 255, 0);
  border-bottom: 1px solid black;
}
.label-input {
  color: #848484;
  font-size: 14px;
}
.login {
  padding-top: 100px;
  padding-bottom: 148px;
}
.card {
  border: none;
  max-width: 500px;
  padding: 0px 40px 20px 40px;
  border-radius: 30px;
}
h5 {
  text-align: center;
  margin-top: 30px;
  margin-bottom: 10px;
  font-size: 22px;
  font-weight: 500px;
  color: #7e98df;
}
.text {
  font-size: 14px;
  margin-bottom: 10px;
}
.forgot {
  font: size 16px;
  float: right;
  color: #7e98df;
  margin-top: 20px;
  margin-bottom: 20px;
}
.btn {
  padding: 15px;
  border-radius: 70px;
  background-color: #7e98df;
  border: none;
}
.btn2 {
  padding: 15px;
  border-radius: 70px;
  background-color: white;
  color: #7e98df;
  border: 1px solid #7e98df;
}
.text2 {
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
  color: #848484;
  font-size: 16px;
}
.text3 {
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
  color: #848484;
  font-size: 14px;
}
.cursor {
  cursor: pointer;
}
.cursor:hover {
  text-decoration: underline;
}
@media only screen and (max-width: 600px) {
  .card {
    padding: 0px 10px 20px 10px;
  }
}
</style>
