import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueGeolocation from 'vue-browser-geolocation'
import Toast from 'vue-toastification'
import { SidebarPlugin } from 'bootstrap-vue'
import VueTimeago from 'vue-timeago'
import 'vue-toastification/dist/index.css'

Vue.use(SidebarPlugin)

Vue.use(VueTimeago, {
  name: 'Timeago',
  locale: 'en',
  locales: {
    'zh-CN': require('date-fns/locale/zh_cn'),
    ja: require('date-fns/locale/ja')
  }
})
const options = {
  transition: 'Vue-Toastification__fade',
  maxToasts: 20,
  newestOnTop: true
}

Vue.use(Toast, options)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueGeolocation)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCZIasf-tWMl5Ct-3zOvGva2aMna_rqpfM',
    libraries: 'places'
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
