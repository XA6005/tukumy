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
import JsonExcel from 'vue-json-excel'
import cookies from 'vue-cookies'
Vue.use(cookies)

Vue.component('downloadExcel', JsonExcel)

Vue.use( CKEditor );
Vue.use(Vuetify)
Vue.prototype.$http = axios;


Vue.config.productionTip = false

new Vue({
  router,
  store,
  cookies,
  vuetify,
  render: h => h(App)
}).$mount('#app')

