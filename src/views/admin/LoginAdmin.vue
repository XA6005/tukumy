<template>
    <v-app id="LoginAdmin">
        <v-main>
            <div class="container mt-5" >
                <div class="grey lighten-3 rounded-xl col-md-5 mx-auto my-auto">
                    <h1 class="text-center">
                        Masuk
                    </h1>
                    <h2 class="text-center">
                        Portal ADMIN Tempat Uji Kompetensi(TUK)<br>
                        <small style="font-size:11pt">Prodi Teknologi Informasi UMY</small>
                    </h2>
                    <div class="jumbotron mt-4">
                        <v-text-field
                         label="E-mail"
                         value=""
                         v-model="email"
                        ></v-text-field>
                        <v-text-field
                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required, rules.min]"
                            name="input-10-2"
                            label="Password"
                            hint="At least 8 characters"
                            value=""
                            v-model="password"
                            class="input-group--focused"
                            @click:append="show = !show"
                            ></v-text-field>
                            <br>
                        <div>
                            <div class="row align-center justify-center">
                            <v-btn
                            class="white--text"
                            color="#065139"
                            @click="doLogin"
                            >
                             masuk
                            </v-btn>
                        </div>
                        <br>
                        <div align="right">
                            <a
                            href="/login-peserta">
                             masuk sebagai peserta
                            </a>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </v-main>
    </v-app>
</template>


<script>
import axios from 'axios';
  export default {
    data () {
      return {
        show: false,
        email:"",
        password:"",
        result:null,
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match'),
        },
      }
    },
    methods: {
        doLogin(){
            axios
            .post('https://ef0ec7d2686a.ngrok.io/admin/login',{
                email: this.email,
                password: this.password
            })
            .then((response) => {
            this.result= response.data;
            if(this.result.token){
                this.$store.state.isLogin=true;
                this.$store.state.jwt_token=this.result.token;
                this.$router.push({ path: '/dasboard-admin' });
            }
      }) 
        }
    },
  }
</script>