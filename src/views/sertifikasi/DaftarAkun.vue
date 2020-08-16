<template>
  <v-app id="DaftarPeserta">
    <v-main>
      <div class="container mt-5">
        <v-form v-model="valid" lazy-validation>
          <div class="grey lighten-3 rounded-xl col-md-5 mx-auto my-auto">
            <h1 class="text-center">Daftar</h1>
            <h2 class="text-center">
              Portal PESERTA Tempat Uji Kompetensi(TUK)
              <br />
              <small style="font-size:11pt">Prodi Teknologi Informasi UMY</small>
            </h2>
            <div class="jumbotron mt-4">
              <v-text-field
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
                hint="Minimal 8-20 Karakter"
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
                    @click="daftar"
                  >daftar</v-btn>
                </div>
                <div class="row align-center justify-center">
                  <v-btn text color="#065139" @click="login">login</v-btn>
                </div>
              </div>
            </div>
          </div>
          <v-snackbar v-model="snackbar">{{error_message}}</v-snackbar>
        </v-form>
      </div>
    </v-main>
  </v-app>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength, email } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  validations: {
    password: { required, minLength: minLength(8) ,maxLength: maxLength(20)},
    email: { required, email },
  },
  data() {
    return {
      valid: true,
      show: false,
      snackbar: false,
      error_message: "loading",
      id: "",
      email: "",
      password: "",
    };
  },

  computed: {
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength && errors.push("Password minimal 8 karakter");
      !this.$v.password.maxLength && errors.push("Password maximal 20 karakter");
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

  mounted() {
    this.$store.dispatch("logout");
    this.id = this.$route.params.id;
  },
  methods: {
    daftar: function () {
      this.error_message = "";
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.error_message = "Isikan email dan password anda" + this.email;
        this.snackbar = true;
      } else {
        let email = this.email;
        let password = this.password;
        this.$store
          .dispatch("register", { email, password })
          .then((resp) => {
            (this.error_message = resp), (this.snackbar = true)
            this.$router.push({ name: "login-daftar", params: { id: this.id } });
          })
          .catch((err) => (this.error_message = err), (this.snackbar = true));
      }
    },
    login: function () {
      (this.id = this.$route.params.id),
        this.$router.push({ name: "login-daftar", params: { id: this.id } });
    },
  },
};
</script>