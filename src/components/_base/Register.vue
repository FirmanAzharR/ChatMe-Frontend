<template>
  <div class="register">
    <b-container style="align-items: stretch;">
      <b-row>
        <b-col md="3"></b-col>
        <b-col md="6">
          <b-card>
            <div class="title">
              <b-icon
                icon="chevron-left"
                class="icons"
                :value="typeForm"
                @click="changeForm('login')"
              ></b-icon>
              <div class="h5">
                Register
              </div>
            </div>

            <br />
            <div class="text">Let’s create your account!</div>
            <br />
            <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
              <div class="label-input">Name</div>
              <b-form-input
                class="input"
                type="text"
                placeholder="Enter your email address"
                required
                autocomplete="off"
                v-model="form.user_fullname"
              ></b-form-input
              ><br />
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
                v-model="form.user_password"
              ></b-form-input>
              <a href="#" class="forgot">Forgot Password?</a><br />
              <b-button block type="submit">Register</b-button>
              <div class="text2">Register with</div>
              <b-button block class="btn2">Google</b-button>
            </b-form>
          </b-card>
        </b-col>
        <b-col md="3"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import vueNotif from '../../mixins/vueNotif.js'
export default {
  name: 'Register',
  props: ['typeForm'],
  mixins: [vueNotif],
  data() {
    return {
      form: {
        user_fullname: '',
        user_email: '',
        user_password: ''
      }
    }
  },
  methods: {
    ...mapActions(['register']),
    changeForm(data) {
      this.$emit('sendType', data)
    },
    onRegister() {
      this.register(this.form)
        .then(result => {
          this.vueToastSuccess(`Register Success`)
          console.log(result)
          this.onReset()
        })
        .catch(error => {
          this.vueToastFailed(`Register Failed ${error}`)
        })
    },
    onReset() {
      this.form = {
        user_fullname: '',
        user_email: '',
        user_password: ''
      }
    }
  }
}
</script>

<style scoped>
.icons {
  float: left;
  font-size: 30px;
  color: #7e98df;
  position: absolute;
  cursor: pointer;
}
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
.register {
  padding-top: 100px;
  padding-bottom: 148px;
}
.card {
  border: none;
  max-width: 500px;
  padding: 0px 40px 20px 40px;
  border-radius: 30px;
}
.h5 {
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
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
  color: #848484;
  font-size: 14px;
}
</style>
