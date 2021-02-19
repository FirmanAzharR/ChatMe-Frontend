<template>
  <div class="forgots">
    <b-container style="align-items: stretch;">
      <b-row>
        <b-col md="3"></b-col>
        <b-col md="6">
          <b-card>
            <div class="title">
              <div class="h5">
                Reset Password
              </div>
            </div>

            <br />
            <div class="text">Reset your password here !</div>
            <br />
            <b-form @submit.prevent="onSubmit">
              <div class="label-input">New password</div>
              <b-form-input
                class="input"
                type="password"
                placeholder="Enter new password"
                required
                autocomplete="off"
                v-model="form.password"
              ></b-form-input>
              <br />
              <div class="label-input">Confirm password</div>
              <b-form-input
                class="input"
                type="password"
                placeholder="Confirm password"
                required
                autocomplete="off"
                v-model="confirmPass"
              ></b-form-input>
              <br />
              <b-button block type="submit" v-if="form.password === confirmPass"
                >Save changes</b-button
              >
              <b-button block type="submit" v-else disabled
                >Save changes</b-button
              >
            </b-form>
            <br />
            <b-button block @click="changePage('login')">Login here</b-button>
            <br />
          </b-card>
        </b-col>
        <b-col md="3"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import vueNotif from '../../../mixins/vueNotif.js'
export default {
  name: 'Reset',
  mixins: [vueNotif],
  data() {
    return {
      confirmPass: '',
      form: {
        password: ''
      }
    }
  },
  methods: {
    ...mapMutations(['changePage']),
    ...mapActions(['updateUser']),
    onSubmit() {
      const key = this.$route.query.key
      const data = {
        key: key,
        password: this.form.password
      }
      this.updateUser(data)
        .then(result => {
          this.vueToastSuccess(`${result.data.msg}`)
        })
        .catch(error => {
          this.vueToastFailed(`${error}`)
        })
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
.forgots {
  padding-top: 140px;
  padding-bottom: 185px;
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

@media only screen and (max-width: 600px) {
  .card {
    padding: 0px 10px 20px 10px;
  }
  .h5 {
    font-size: 18px;
  }
  .icons {
    font-size: 20px;
  }
}
</style>
