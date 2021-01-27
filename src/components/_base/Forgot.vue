<template>
  <div class="forgots">
    <b-container style="align-items: stretch;">
      <b-row>
        <b-col md="3"></b-col>
        <b-col md="6">
          <b-card>
            <div class="title">
              <b-icon icon="chevron-left" class="icons"></b-icon>
              <div class="h5">
                Forgot Password
              </div>
            </div>

            <br />
            <div class="text">You’ll get messages soon on your e-mail</div>
            <br />
            <b-form>
              <div class="label-input">Email</div>
              <b-form-input
                class="input"
                type="email"
                placeholder="Enter your email address"
                required
                autocomplete="off"
              ></b-form-input>
              <br />
              <b-button block type="submit">Send</b-button>
            </b-form>
          </b-card>
        </b-col>
        <b-col md="3"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

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
  .h5 {
    font-size: 18px;
  }
  .icons {
    font-size: 20px;
  }
}
</style>
