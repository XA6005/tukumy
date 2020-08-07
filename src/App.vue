<template>
  <div id="app">
    <router-view/>
    <pesertabars v-if="isLoggedInPeserta"></pesertabars>
    <adminbars v-else-if="isLoggedInAdmin"></adminbars>
    <bars v-else ></bars>
    
    <footbar/>
  </div>
</template>

<script>
import footbar from './components/footer.vue'
import bars from './components/bars.vue'
import pesertabars from './components/barsPeserta.vue'
import adminbars from './components/barsAdmin.vue'
export default {
  components: {
    footbar,
    bars,
    adminbars,
    pesertabars
  },
  computed:{
    isLoggedInPeserta : function(){return this.$store.getters.isLoggedInPeserta},
    isLoggedInAdmin : function(){return this.$store.getters.isLoggedInAdmin}
  },
  /* created: function () {
      this.$http.interceptors.response.use(undefined, function (err) {
        return new Promise(function (resolve, reject) {
          if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
            this.$store.dispatch(logout)
          }
          this.$router.push('/login-peserta')
          throw err;
        });
      });
    } */
}
</script>