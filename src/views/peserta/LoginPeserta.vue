<template> 
      <v-app id="LoginPeserta">
         <login />
      </v-app>
</template>

<script>
import login from '@/components/login.vue';
  export default {
    components:{
      login
    },
    methods: {
        login:function(){
            let email = this.email
            let password = this.password
            this.$store.dispatch('login',{email,password})
            .then(()=>{
                this.$router.push('/dasboard-peserta')
                this.error_message="Selamat datang "+this.email
                this.snackbar=true
            })
            .catch((err)=>
            this.error_message=err,
            this.snackbar=true)
        }
    },
  }
</script>