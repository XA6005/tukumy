<template>
  <v-app id="LoginPeserta">
    <v-main>
      <div class="container mt-5">
        <v-form v-model="valid" lazy-validation>
          <div class="grey lighten-3 rounded-xl col-md-5 mx-auto my-auto">
            <div>
              <h1 class="text-center">LOGIN PESERTA</h1>
              <h3 class="text-center">
                <br />
                TEMPAT UJI KOMPENTENSI(TUK)
                <br />
                PRODI TEKNOLOGI INFORMASI UMY
              </h3>
              <div class="jumbotron mt-4">
                <v-text-field
                  full-width="50"
                  label="E-mail"
                  value
                  v-model="email"
                  :error-messages="emailErrors"
                  required
                  @input="$v.email.$touch()"
                  @blur="$v.email.$touch()"
                ></v-text-field>
                <v-text-field
                  required
                  :error-messages="passwordErrors"
                  @input="$v.password.$touch()"
                  @blur="$v.password.$touch()"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  name="input-10-2"
                  label="Password"
                  v-model="password"
                  hint="Minimal 8-10 Karakter"
                  value
                  class="input-group--focused"
                  @click:append="show = !show"
                ></v-text-field>
                <br />
                <div>
                  <div class="row align-center justify-center">
                    <v-btn
                      :disabled="!valid"
                      class="white--text"
                      color="#065139"
                      @click="login"
                      >masuk</v-btn
                    >
                  </div>
                  <div class="row align-center justify-center">
                    <v-btn text color="#065139" href="/daftar-peserta"
                      >daftar</v-btn
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <v-snackbar v-model="snackbar">{{ error_message }}</v-snackbar>
        </v-form>
      </div>
    </v-main>
  </v-app>
</template>

<script>
//import axios from "axios";
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  email,
} from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  validations: {
    password: { required, minLength: minLength(8), maxLength: maxLength(10) },
    email: { required, email },
  },
  data() {
    return {
      valid: true,
      show: false,
      snackbar: false,
      error_message: "loading",
      email: "",
      password: "",
      tunnel: "",
      sertifikasi:"",
      //bootcamp:"", 
    };
  },

  computed: {
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength && errors.push("Password minimal 8 karakter");
      !this.$v.password.maxLength &&
        errors.push("Password maximal 10 karakter");
      !this.$v.password.required && errors.push("Password diperlukan");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("email harus valid");
      !this.$v.email.required && errors.push("E-mail diperlukan");
      return errors;
    },
  },

  methods: {
    login: function () {
      this.error_message = "";
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.error_message = "Isikan email dan password anda" + this.email;
        this.snackbar = true;
      } else {
        let email = this.email;
        let password = this.password;
        this.$store
          .dispatch("login", { email, password })
          .then(() => {
            this.error_message = "Login Berhasil";
            this.snackbar = true;
            // start save jadwal
            if (this.$cookies.get("sertifikasi")!=null) {
              /* const formdata = new FormData();
              formdata.append("jadwal_id", this.sertifikasi);
              axios
                .post(`${this.tunnel}status`, formdata, {
                  headers: {
                    Authorization: "Bearer " + this.$store.state.token,
                  },
                })
                .then((response) => {
                  this.error_message = response.data.message;
                  this.snackbar = true;

                  // start save bootcamp
                  const formdata = new FormData();
                  formdata.append("jadwal_id", this.sertifikasi);
                  formdata.append("status_bootcamp", this.bootcamp);
                  formdata.append("_method", "PUT");
                  axios
                    .post(`${this.tunnel}status/bootcamp`, formdata, {
                      headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                      },
                    })
                    .then((response) => {
                      this.error_message = response.data.message;
                      this.snackbar = true;
                      localStorage.removeItem("sertifikasi");
                      localStorage.removeItem("bootcamp"); */
                      this.$router.push({
                        name: "form-daftar",
                      });
                  /*   })
                    .catch((error) => {
                      this.error_message = error;
                      this.snackbar = true;
                    });
                  // end save bootcamp
                })
                .catch((error) => {
                  this.error_message = error;
                  this.snackbar = true;
                }); */
            } else {
              this.$router.push("/dasboard-peserta");
              this.error_message = "Selamat datang " + this.email;
              this.snackbar = true;
            }
          })
          .catch((err) => {
            this.error_message = err;
            this.error_message = this.$store.state.status;
            this.snackbar = true;
          });
      }
    },
  },

  mounted() {
    this.$store.dispatch("logout");
    this.tunnel = this.$store.state.tunnel;
    this.sertifikasi=this.$store.state.sertifikasi;
    //this.bootcamp =this.$store.state.bootcamp; 
  },
};
</script>