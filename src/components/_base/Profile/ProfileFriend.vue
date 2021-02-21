<template>
  <div>
    <h3 class="user-title">@{{ getProfilesFriend[0].user_name }}</h3>
    <div class="d-flex justify-content-center">
      <img
        :src="
          getProfilesFriend[0].user_photo !== ''
            ? `http://localhost:5000/profileImages/` +
              getProfilesFriend[0].user_photo
            : require('../../../assets/img/default.jpg')
        "
        alt="avatar"
        class="image-profile"
      />
    </div>
    <h3 class="fullname">{{ getProfilesFriend[0].user_fullname }}</h3>
    <h6 class="sub-username">@{{ getProfilesFriend[0].user_name }}</h6>
    <h3 class="fullname">{{ getProfilesFriend[0].user_phone }}</h3>
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
        :center="{
          lat: getProfilesFriend[0].lat,
          lng: getProfilesFriend[0].lng
        }"
        :zoom="10"
        map-type-id="terrain"
        style="width: 350px; height: 300px"
      >
        <GmapMarker
          :position="{
            lat: getProfilesFriend[0].lat,
            lng: getProfilesFriend[0].lng
          }"
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
export default {
  name: 'ProfileFriend',
  data() {
    return {
      res: '',
      coordinate: {
        lat: 10,
        lng: 10
      }
    }
  },
  created() {
    // this.coordinate = {
    //   lat: this.getProfilesFriend[0].lat,
    //   lng: this.getProfilesFriend[0].lng
    // }
    // console.log('frend map')
    // this.$getLocation()
    //   .then(coordinates => {
    //     this.coordinate = {
    //       lat: coordinates.lat,
    //       lng: coordinates.lng
    //     }
    //   })
    //   .catch(error => {
    //     alert(error)
    //   })
  },
  computed: {
    ...mapGetters(['getProfilesFriend'])
  },
  methods: {
    ...mapActions(['updateLocation']),
    clickMarker(position) {
      this.coordinate = {
        lat: position.latLng.lat(),
        lng: position.latLng.lng()
      }
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
