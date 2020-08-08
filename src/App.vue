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
import footbar from './components/bar/footer.vue'
import bars from './components/bar/bars.vue'
import pesertabars from './components/bar/barsPeserta.vue'
import adminbars from './components/bar/barsAdmin.vue'
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
   created: function () {
        this.$http.interceptors.push(function(request, next) {
        let token = localStorage.getItem('token')
        request.headers.set('Authorization', 'Bearer '+token)
        request.headers.set('Accept', 'application/json')

        // continue to next interceptor
        next(function(response) {
            if(response.status !=200){
                this.$store.dispatch('logout') // UNCOMMENT
                this.showPopupMessage('Access', 'Not authorized !', 'warn')
                this.$router.push('/')
            }
        });
    });
    }
}
</script>