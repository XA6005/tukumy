<template>
  <v-app id="daftar">
    <v-main>
      <div class="container mt-5">
        <v-dialog v-model="dialog" scrollable max-width="600px">
          <v-card>
            <v-card-title>PERHATIAN</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 200px">
              <br />
              <h3>
                Untuk melanjutkan pendaftaran silahkan isi data diri dan di
                simpan.
              </h3>
              <br />
              <h3 v-if="this.bootcamp=='Tidak Mengikuti'">
                Segera lakukan pembayaran ke nomor rekening berikut:
                <br/>
                nomor rekening : 4610-01-010973-53-1
                <br/>
                Bank           : BRI
                <br/>
                atas nama      : Tempat Uji Kompetensi
              </h3>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="dialog = false">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-form v-model="valid" lazy-validation>
          <h1>
            Rincian Data Pemohon Sertifikasi
          </h1>
          <p>
            Pada bagian ini, cantumkan data pribadi, data pendidikan formal
            serta data pekerjaan anda pada saat ini.
          </p>
          <h2>a. Data Pribadi</h2>
          <p>* wajib diisi</p>
          <v-text-field
            v-model="nama_peserta"
            :error-messages="nama_pesertaErrors"
            label="Nama Lengkap *"
            required
            @input="$v.nama_peserta.$touch()"
            @blur="$v.nama_peserta.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="NIM"
            :error-messages="NIMErrors"
            label="NIM *"
            required
            :counter="11"
            @input="$v.NIM.$touch()"
            @blur="$v.NIM.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="tempat"
            :error-messages="tempatErrors"
            label="Tempat Lahir *"
            required
            @input="$v.tempat.$touch()"
            @blur="$v.tempat.$touch()"
          ></v-text-field>
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="tanggal"
                :error-messages="tanggalErrors"
                label="Tanggal Lahir *"
                append-icon="mdi-calendar"
                readonly
                required
                v-bind="attrs"
                v-on="on"
                @input="$v.tanggal.$touch()"
                @blur="$v.tanggal.$touch()"
              ></v-text-field>
            </template>
            <v-date-picker
              ref="picker"
              v-model="tanggal"
              @input="menu2 = false"
              max="2004-12-31"
              min="1950-01-01"
            ></v-date-picker>
          </v-menu>
          <v-select
            v-model="jenisKelamin"
            :items="jk"
            :error-messages="jkErrors"
            label="Jenis Kelamin *"
            required
            @change="$v.jenisKelamin.$touch()"
            @blur="$v.jenisKelamin.$touch()"
          ></v-select>
          <v-textarea
            v-model="alamat"
            :error-messages="alamatErrors"
            label="Alamat Rumah *"
            required
            @input="$v.alamat.$touch()"
            @blur="$v.alamat.$touch()"
          ></v-textarea>
          <v-text-field
            v-model="kodepos"
            :error-messages="kodeposErrors"
            label="Kodepos Rumah *"
            required
            :counter="5"
            @input="$v.kodepos.$touch()"
            @blur="$v.kodepos.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="notelpHp"
            :error-messages="notelpHpErrors"
            label="No. HP *"
            required
            :counter="13"
            @input="$v.notelpHp.$touch()"
            @blur="$v.notelpHp.$touch()"
          ></v-text-field>
          <v-checkbox
            v-model="checkbox"
            :error-messages="checkboxErrors"
            label="kamu yakin menyimpan form ini?"
            required
            @change="$v.checkbox.$touch()"
            @blur="$v.checkbox.$touch()"
          ></v-checkbox>
          <v-btn
            v-if="jenis == ''"
            :disabled="!valid"
            class="white--text"
            color="#065139"
            @click="submit"
            >submit</v-btn
          >
          <v-btn
            v-else
            :disabled="!valid"
            class="white--text"
            color="#065139"
            @click="update"
            >update</v-btn
          >
          <v-btn
            style="margin-left: 10px"
            class="white--text"
            color="red darken-1"
            @click="clear"
            >clear</v-btn
          >
          <br />
          <br />
          <br />
          <v-snackbar v-model="snackbar">{{ error_message }}</v-snackbar>
        </v-form>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import { required, alpha, numeric, maxLength, minLength } from "vuelidate/lib/validators";
import { helpers } from "vuelidate/lib/validators";
const alphaSpace = helpers.regex("alpha", /^[a-zA-Z\s]*$/);
export default {
  mixins: [validationMixin],
  validations: {
    nama_peserta: { required, alphaSpace },
    NIM: { required, numeric, maxLength: maxLength(11) },
    tempat: { required, alpha },
    tanggal: { required },
    jenisKelamin: { required },
    alamat: { required },
    kodepos: { required, numeric, maxLength: maxLength(5),minLength:minLength(5) },
    notelpHp: { required, numeric, maxLength: maxLength(13),minLength:minLength(11) },
    checkbox: {
      checked(val) {
        return val;
      },
    },
  },

  data: () => ({
    id: "",
    jenis: "",
    valid: true,
    snackbar: false,
    menu2: false,
    error_message: "",
    nama_peserta: "",
    NIM: "",
    tempat: "",
    tanggal: null,
    jenisKelamin: null,
    alamat: "",
    kodepos: "",
    notelpHp: "",
    jk: ["Laki - laki", "Perempuan"],
    checkbox: false,
    dialog: false,
    sertifikasi: "",
    bootcamp: "",
  }),

  computed: {
    nama_pesertaErrors() {
      const errors = [];
      if (!this.$v.nama_peserta.$dirty) return errors;
      !this.$v.nama_peserta.alphaSpace &&
        errors.push("Data harus alfabet diperlukan");
      !this.$v.nama_peserta.required && errors.push("Data diperlukan");
      return errors;
    },
    NIMErrors() {
      const errors = [];
      if (!this.$v.NIM.$dirty) return errors;
      !this.$v.NIM.numeric && errors.push("Data harus angka diperlukan");
      !this.$v.NIM.maxLength && errors.push("Data maximal 11 karakter ");
      !this.$v.NIM.required && errors.push("Data diperlukan");
      return errors;
    },
    tempatErrors() {
      const errors = [];
      if (!this.$v.tempat.$dirty) return errors;
      !this.$v.tempat.alpha && errors.push("Data harus alfabet diperlukan");
      !this.$v.tempat.required && errors.push("Data diperlukan");
      return errors;
    },
    tanggalErrors() {
      const errors = [];
      if (!this.$v.tanggal.$dirty) return errors;
      !this.$v.tanggal.required && errors.push("Data diperlukan");
      return errors;
    },
    jkErrors() {
      const errors = [];
      if (!this.$v.jenisKelamin.$dirty) return errors;
      !this.$v.jenisKelamin.required && errors.push("Wajib memilih");
      return errors;
    },
    alamatErrors() {
      const errors = [];
      if (!this.$v.alamat.$dirty) return errors;
      !this.$v.alamat.required && errors.push("Data diperlukan");
      return errors;
    },
    kodeposErrors() {
      const errors = [];
      if (!this.$v.kodepos.$dirty) return errors;
      !this.$v.kodepos.numeric && errors.push("Data harus angka diperlukan");
      !this.$v.kodepos.minLength && errors.push("Kodepos minimal 5 karakter ");
      !this.$v.kodepos.maxLength && errors.push("Kodepos maximal 5 karakter ");
      !this.$v.kodepos.required && errors.push("Data diperlukan");
      return errors;
    },
    notelpHpErrors() {
      const errors = [];
      if (!this.$v.notelpHp.$dirty) return errors;
      !this.$v.notelpHp.numeric && errors.push("Data harus angka diperlukan");
      !this.$v.notelpHp.maxLength &&
        errors.push("Kodepos maximal 13 karakter ");
        !this.$v.notelpHp.minLength &&
        errors.push("Kodepos minimal 11 karakter ");
      !this.$v.notelpHp.required && errors.push("Data diperlukan");
      return errors;
    },
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push("You must agree to continue!");
      return errors;
    },
  },

mounted() {
    if (this.$store.getters.isLoggedInPeserta) {
      this.token = this.$store.state.token;
      this.tunnel = this.$store.state.tunnel;
      this.sertifikasi = this.$cookies.get("sertifikasi");
      this.bootcamp =this.$cookies.get("bootcamp");
      if (this.$cookies.isKey("sertifikasi")) {
            this.dialog = true;
          }
    this.loadData();
     } else {
      this.$router.push("login-daftar");
    } 
  },

  methods: {
    loadData(){
      axios
        .get(`${this.tunnel}peserta/me`, {
          headers: { Authorization: "bearer " + this.$store.state.token },
        })
        .then((response) => {
          this.daftarSertifikasi();
          this.jenis = response.data.user.biodata.nama_peserta;
          this.nama_peserta = response.data.user.biodata.nama_peserta;
          this.NIM = response.data.user.biodata.NIM;
          this.tempat = response.data.user.biodata.tempat_lahir;
          this.tanggal = response.data.user.biodata.tanggal_Lahir;
          this.jenisKelamin = response.data.user.biodata.jenis_kelamin;
          this.alamat = response.data.user.biodata.alamat_rumah;
          this.kodepos = response.data.user.biodata.kodepos_rumah;
          this.notelpHp = response.data.user.biodata.no_hp;
          
        })
        .catch((error) => {
          this.error_message = error;
          this.error_message = "Biodata masih kosong";
          this.snackbar = true;
        });
    },
    update() {
      this.error_message = "";
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.error_message = "Periksa kembali form diatas";
        this.snackbar = true;
      } else {
        const data = new FormData();
        data.append("nama_peserta", this.nama_peserta);
        data.append("NIM", this.NIM);
        data.append("tempat_lahir", this.tempat);
        data.append("tanggal_lahir", this.tanggal);
        if (this.jenisKelamin == "Perempuan") {
          data.append("jenis_kelamin", "P");
        } else {
          data.append("jenis_kelamin", "L");
        }
        data.append("no_hp", this.notelpHp);
        data.append("alamat_rumah", this.alamat);
        data.append("kodepos_rumah", this.kodepos);
        data.append("_method", "PUT");
        axios
          .post(`${this.tunnel}peserta/biodata`, data, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
            },
          })
          .then((response) => {
            this.error_message = response.data.message;
            this.snackbar = true;
            this.$router.push("/dasboard-peserta");
          })
          .catch((error) => {
            this.error_message = error;
            this.snackbar = true;
          });
      }
    },
    daftarSertifikasi() {
      const formdata = new FormData();
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
              this.$cookies.remove("sertifikasi");
              this.$cookies.remove("bootcamp");
              this.$router.push({
                name: "dasboard-peserta",
              });
            })
            .catch((error) => {
              this.error_message = error;
              this.snackbar = true;
            });
          // end save bootcamp
        })
        .catch((error) => {
          this.error_message = error;
          this.snackbar = true;
        });
    },
    submit() {
      this.error_message = "";
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.error_message = "Periksa kembali form diatas";
        this.snackbar = true;
      } else {
        const data = new FormData();
        data.append("nama_peserta", this.nama_peserta);
        data.append("NIM", this.NIM);
        data.append("tempat_lahir", this.tempat);
        data.append("tanggal_lahir", this.tanggal);
        if (this.jenisKelamin == "Perempuan") {
          data.append("jenis_kelamin", "P");
        } else {
          data.append("jenis_kelamin", "L");
        }
        data.append("no_hp", this.notelpHp);
        data.append("alamat_rumah", this.alamat);
        data.append("kodepos_rumah", this.kodepos);
        axios
          .post(`${this.tunnel}peserta/biodata`, data, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
            },
          })
          .then((response) => {
            this.daftarSertifikasi();
            this.error_message = response.data.message;
            this.snackbar = true;
            this.$router.push("/dasboard-peserta");
          })
          .catch((error) => {
            this.error_message = error;
            this.snackbar = true;
          });
      }
    },
    clear() {
      this.$v.$reset();
      this.nama_peserta = "";
      this.NIM = "";
      this.tempat = "";
      (this.tanggal = null), (this.jenisKelamin = null);
      this.alamat = "";
      this.kodepos = "";
      this.notelpHp = "";
      this.checkbox = false;
    },
  },

  watch: {
    menu2(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },

  
};
</script>