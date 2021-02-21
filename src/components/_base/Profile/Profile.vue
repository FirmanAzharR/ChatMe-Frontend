<template>
  <div>
    <h3 class="user-title">@{{ getProfiles[0].user_name }}</h3>
    <div class="d-flex justify-content-center">
      <img v-if="url" :src="url" class="image-profile" />
      <img
        v-else
        :src="
          getProfiles[0].user_photo !== ''
            ? `http://localhost:5000/profileImages/` + getProfiles[0].user_photo
            : require('../../../assets/img/default.jpg')
        "
        alt="avatar"
        class="image-profile"
      />
    </div>
    <div class="d-flex justify-content-center" style="margin-bottom:30px">
      <b-iconstack
        font-scale="1.2"
        @click.prevent="chooseFiles()"
        class="btn-icons"
      >
        <b-icon stacked icon="circle-fill" variant="warning"></b-icon>
        <b-icon stacked icon="pencil-fill" scale="0.5" variant="white"></b-icon>
      </b-iconstack>
      <input id="fileUpload" @change="handleFile" type="file" hidden />
    </div>
    <h3 class="fullname">{{ getProfiles[0].user_fullname }}</h3>
    <h6 class="sub-username">@{{ getProfiles[0].user_name }}</h6>
    <b-form @submit.prevent="onSubmit">
      <h4 class="labels">
        Account<b-icon style="margin-left:10px" icon="person-fill"></b-icon>
      </h4>
      <label>Phone number</label>
      <b-form-input
        class="input"
        type="text"
        placeholder="Phone number"
        required
        autocomplete="off"
        v-model="getProfiles[0].user_phone"
      ></b-form-input>
      <label>Username</label>
      <b-form-input
        class="input"
        type="text"
        placeholder="Username"
        required
        autocomplete="off"
        v-model="getProfiles[0].user_name"
      ></b-form-input>
      <label>Bio</label>
      <b-form-textarea
        class="input"
        placeholder="Bio"
        v-model="getProfiles[0].user_bio"
      ></b-form-textarea>
      <div class="d-flex justify-content-center">
        <b-button type="submit" class="btn">Save changes</b-button>
      </div>
    </b-form>
    <br />
    <hr />
    <h4 class="labels">
      Location<b-icon
        style="margin-left:10px"
        icon="map-fill"
        font-scale="0.8px"
      ></b-icon>
    </h4>
    <div class="d-flex justify-content-center">
      <GmapMap
        :center="coordinate"
        :zoom="10"
        map-type-id="terrain"
        style="width: 350px; height: 300px"
      >
        <GmapMarker
          :position="coordinate"
          :clickable="true"
          :draggable="true"
          @click="clickMarker"
          icon="https://img.icons8.com/color/48/000000/marker--v2.png"
        />
      </GmapMap>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import vueNotif from '../../../mixins/vueNotif'
export default {
  name: 'Profile',
  mixins: [vueNotif],
  data() {
    return {
      res: '',
      url: null,
      coordinate: {
        lat: 10,
        lng: 10
      }
    }
  },
  created() {
    this.getProfile(this.setUser.user_id)
    this.$getLocation()
      .then(coordinates => {
        this.coordinate = {
          lat: coordinates.lat,
          lng: coordinates.lng
        }
        this.updateMap()
      })
      .catch(error => {
        alert(error)
      })
  },
  computed: {
    ...mapGetters(['getProfiles', 'setUser'])
  },
  methods: {
    ...mapActions(['updateProfile', 'getProfile', 'updateLocation']),
    updateMap() {
      this.updateLocation({
        user_id: this.setUser.user_id,
        data: this.coordinate
      })
        .then(result => {
          console.log(result)
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
    },
    chooseFiles: function() {
      document.getElementById('fileUpload').click()
    },
    handleFile(e) {
      console.log(e.target.files[0])
      if (
        (e.target.files[0].type !== 'image/png') &
        (e.target.files[0].type !== 'image/jpg') &
        (e.target.files[0].type !== 'image/jpeg')
      ) {
        this.vueToastFailed('Image must be PNG or JPG/JPEG')
      } else {
        const file = (this.getProfiles[0].user_photo = e.target.files[0])
        this.url = URL.createObjectURL(file)
      }
    },
    onSubmit() {
      this.updateProfile(this.setUser.user_id)
        .then(result => {
          this.getProfile(this.setUser.user_id)
          this.res = result
          this.vueToastSuccess('Success Update Profile')
        })
        .catch(error => {
          this.res = error
          this.vueToastFailed(`Failed Update Profile ${error}`)
        })
    }
  }
}
</script>

<style scoped>
.btn {
  padding: 10px;
  border-radius: 30px;
  background-color: #7e98df;
  border: none;
}
.input {
  border-radius: 0px;
  border: none;
  border-bottom: 1.5px solid rgb(175, 175, 175);
  padding: 0px;
  font-weight: 500;
  background-color: #f8f9fa;
  color: black;
  margin-bottom: 30px;
}
.input:focus {
  box-shadow: 0 0 0 0rem rgba(255, 255, 255, 0);
  border-bottom: 1.5px solid rgb(99, 99, 99);
  background-color: #f8f9fa;
  color: black;
}
.labels {
  font-size: 19px;
  font-weight: 500;
  line-height: 23px;
  text-align: left;
  color: black;
}
.sub-username {
  color: #848484;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  text-align: center;
  margin-bottom: 40px;
}
.fullname {
  color: black;
  font-size: 22px;
  font-weight: 500;
  line-height: 26px;
  text-align: center;
}
.image-profile {
  height: 82px;
  width: 82px;
  border-radius: 30px;
  object-fit: cover;
  margin-top: 60px;
  margin-bottom: 10px;
}
.user-title {
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
  letter-spacing: 0px;
  text-align: left;
  text-align: center;
  color: #7e98df;
}
.search-input {
  margin-bottom: 20px;
  height: 45px;
  border-radius: 20px;
}
.search-input:focus {
  box-shadow: 0 0 0 0.2rem rgba(115, 53, 231, 0.301);
  border: 1px solid #7e98df;
}
</style>
