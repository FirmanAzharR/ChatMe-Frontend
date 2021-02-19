<template>
  <div class="profile">
    <!-- edit profile -->
    <b-modal scrollable ref="my-modal" hide-footer title="Edit Profile">
      <div class="label-input">Username</div>
      <b-form-input
        class="input"
        type="text"
        placeholder="Enter your username"
        v-model="getProfiles[0].user_name"
      ></b-form-input
      ><br />
      <div class="label-input">Fullname</div>
      <b-form-input
        class="input"
        type="text"
        placeholder="Enter your fullname"
        v-model="getProfiles[0].user_fullname"
      ></b-form-input
      ><br />
      <div class="label-input">Phone</div>
      <b-form-input
        class="input"
        type="number"
        placeholder="Enter your phone"
        v-model="getProfiles[0].user_phone"
      ></b-form-input
      ><br />
      <div class="label-input">Bio</div>
      <b-form-input
        class="input"
        type="text"
        placeholder="Enter your bio"
        v-model="getProfiles[0].user_bio"
      ></b-form-input
      ><br />
      <div class="label-input">Profile Photo</div>
      <b-form-file class="mt-3" plain @change="handleFile"></b-form-file><br />
      <b-button
        class="mt-2"
        style="background-color:#7e98df;color:white;border:none"
        block
        @click="editProfile"
        >Save Changes</b-button
      >
    </b-modal>

    <!-- Change password -->
    <b-modal
      size="sm"
      ref="my-modal-password"
      hide-footer
      title="Change passowrd"
    >
      <b-form @submit.prevent="changePass">
        <div class="label-input">Old password</div>
        <b-form-input
          class="input"
          type="text"
          placeholder="Enter your old password"
          v-model="form.old_password"
          autocomplete="off"
          required
        ></b-form-input
        ><br />
        <div class="label-input">New password</div>
        <b-form-input
          class="input"
          type="text"
          placeholder="Enter your new password"
          v-model="form.new_password"
          autocomplete="off"
          required
        ></b-form-input
        ><br />
        <div class="label-input">Confirm password</div>
        <b-form-input
          class="input"
          type="text"
          placeholder="Confirmation new password"
          v-model="form.confirm_password"
          autocomplete="off"
          required
        ></b-form-input
        ><br />
        <b-button
          size="sm"
          block
          type="submit"
          variant="primary"
          v-if="form.new_password === form.confirm_password"
          >Save Password</b-button
        >
      </b-form>
    </b-modal>
    <!-- show info -->
    <b-card>
      <div class="title">
        <b-icon icon="chevron-left" class="icons"></b-icon>
        <div class="h5">@{{ getProfiles[0].user_name }}</div>
      </div>
      <div class="info">
        <img src="../../assets/img/img-msg2.jpg" alt="" />
        <h5>{{ getProfiles[0].user_fullname }}</h5>
        <div class="labels">@{{ getProfiles[0].user_name }}</div>
      </div>
      <h5 class="sub-title">Account</h5>
      <div>{{ getProfiles[0].user_phone }}</div>
      <div class="link">Tap to change a phone number</div>
      <hr />
      <div>@{{ getProfiles[0].user_name }}</div>
      <div class="labels">Username</div>
      <hr />
      <div>{{ getProfiles[0].user_bio }}</div>
      <div class="labels">Bio</div>
      <br />
      <center>
        <b-button
          @click="showModal"
          size="sm"
          style="background-color:#7e98df;color:white;border:none"
          >Edit profile</b-button
        >
      </center>
      <hr />
      <h5 class="sub-title">Setting</h5>
      <div style="cursor:pointer" @click="showModalPass">
        <b-icon icon="key" class="icon" style="margin-right:10px;"></b-icon
        >Change Password
      </div>
      <br />
      <b-icon icon="map-fill" class="icon" style="margin-right:10px"></b-icon
      >Location <br /><br />
      <center>
        <div class="maps">
          <GmapMap
            :center="coordinate"
            :zoom="10"
            map-type-id="terrain"
            style="width: 350px; height: 350px;"
          >
            <GmapMarker
              :position="coordinate"
              :clickable="true"
              :draggable="true"
              @click="clickMarker"
            />
          </GmapMap>
          <!-- <h4>{{ coordinate }}</h4> -->
        </div>
      </center>
      <!-- <p>{{ getProfiles }}</p> -->
    </b-card>
  </div>
</template>

<script>
//import vueNotif from '../../../mixins/vueNotif'
import { mapActions, mapGetters } from 'vuex'
import vueNotif from '../../mixins/vueNotif'
export default {
  name: 'Profile',
  mixins: [vueNotif],
  data() {
    return {
      id: '',
      coordinate: {
        lat: 10,
        lng: 10
      },
      form: {
        old_password: '',
        new_password: '',
        confirm_password: 'Confirm passsword',
        user_id: ''
      }
    }
  },
  created() {
    this.form.user_id = this.getProfiles[0].user_id
    this.id = this.$route.params.id
    this.getProfile(this.id)
    this.$getLocation()
      .then(coordinates => {
        this.coordinate = {
          lat: coordinates.lat,
          lng: coordinates.lng,
          user_id: this.getProfiles[0].user_id
        }
        this.updateMaps(this.coordinate)
      })
      .catch(error => {
        this.vueToastFailed(`${error}`)
      })
  },
  computed: {
    ...mapGetters(['getProfiles'])
  },
  methods: {
    ...mapActions([
      'getProfile',
      'updateProfile',
      'changePassword',
      'updateLocation'
    ]),
    handleFile(e) {
      const file = (this.getProfiles[0].user_photo = e.target.files[0])
      this.url = URL.createObjectURL(file)
    },
    changePass() {
      this.changePassword(this.form)
        .then(result => {
          this.vueToastSuccess(`${result.data.msg}`)
          this.$refs['my-modal'].hide()
        })
        .catch(error => {
          this.vueToastFailed(`${error}`)
        })
    },
    showModal() {
      this.$refs['my-modal'].show()
    },
    showModalPass() {
      this.$refs['my-modal-password'].show()
    },
    editProfile() {
      this.updateProfile(this.getProfiles[0].user_id)
        .then(result => {
          this.vueToastSuccess(
            `Update Profile ${result.data.data.user_fullname} Success`
          )
          this.$refs['my-modal'].hide()
        })
        .catch(error => {
          this.vueToastFailed(`Update Profile  Failed, ${error}`)
        })
    },
    updateMaps(location) {
      this.updateLocation(location)
        .then(result => {
          this.vueToastSuccess(`${result.data.msg}`)
        })
        .catch(error => {
          console.log(error)
        })
    },
    clickMarker(position) {
      this.coordinate = {
        lat: position.latLng.lat(),
        lng: position.latLng.lng()
      }
      console.log(this.coordinate)
      this.updateMaps(this.coordinate)
    }
  }
}
</script>

<style scoped>
.input {
  border-radius: 0px;
  border: none;
  border-bottom: 1px solid #d2d2d2;
  padding: 0px;
  font-weight: 500;
}
.input:focus {
  box-shadow: 0 0 0 0rem rgba(255, 255, 255, 0);
  border-bottom: 1px solid #d2d2d2;
}
.label-input {
  color: #848484;
  font-size: 14px;
}
.card {
  border-radius: 0px;
  border: none;
}
.card .card-body {
  padding-top: 30px;
  padding-left: 30px;
}
.link {
  color: #7e98df;
}
.labels {
  color: #bababa;
  font-size: 16px;
}
.title {
  margin-bottom: 35px;
}
.sub-title {
  font-size: 18px;
}
.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 35px;
}
.icons {
  float: left;
  font-size: 20px;
  color: #7e98df;
  position: absolute;
  cursor: pointer;
}
.h5 {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 500px;
  color: #7e98df;
}
img {
  width: 84px;
  height: 84px;
  border-radius: 20px;
  object-fit: cover;
  margin-bottom: 15px;
}
</style>
