import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import CKEditor from '@ckeditor/ckeditor5-vue'

Vue.use( CKEditor );
Vue.use(Vuetify)
Vue.prototype.$http = axios;

const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}
const peserta = localStorage.getItem('peserta')
if (peserta) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}
const admin = localStorage.getItem('admin')
if (admin) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

