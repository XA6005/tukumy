<template>
    <v-app id="DaftarPeserta">
        <v-main>
            <div class="container mt-5" >
                <div class="grey lighten-3 rounded-xl col-md-5 mx-auto my-auto">
                    <h1 class="text-center">
                        Daftar
                    </h1>
                    <h2 class="text-center">
                        Portal PESERTA Tempat Uji Kompetensi(TUK)<br>
                        <small style="font-size:11pt">Prodi Teknologi Informasi UMY</small>
                    </h2>
                    <div class="jumbotron mt-4">
                        <v-text-field
                         label="E-mail"
                         value=""
                        ></v-text-field>
                        <v-text-field
                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required, rules.min]"
                            :type="show ? 'text' : 'password'"
                            name="input-10-2"
                            label="Password"
                            hint="At least 8 characters"
                            value=""
                            class="input-group--focused"
                            @click:append="show = !show"
                            ></v-text-field>
                            <br>
                        <div>
                            <div class="row align-center justify-center">
                            <v-btn
                            class="white--text"
                            color="#065139"
                            href="/">
                             daftar
                            </v-btn>
                        </div>
                        <div class="row align-center justify-center">
                            <a
                            href="/login-peserta">
                             Login
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
  export default {
    data () {
      return {
        show: false,
        password: 'Password',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match'),
        },
      }
    },
  }
</script>