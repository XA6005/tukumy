<template>
  <v-app id="daftar">
    <v-main>
      <div class="container mt-5">
        <v-form v-model="valid" lazy-validation>
          <h1>
            Rincian Data Pemohon Sertifikasi {{nim}}
          </h1>
          <p>Pada bagian ini,  cantumkan data pribadi, data pendidikan formal serta data pekerjaan anda pada saat ini.</p>
          <h2>
            a. Data Pribadi
          </h2>
          <p>* wajib diisi</p>
          <v-text-field
            v-model="nama"
            :error-messages="namaErrors"
            label="Nama Lengkap *"
            required
            @input="$v.nama.$touch()"
            @blur="$v.nama.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="nim"
            :error-messages="nimErrors"
            label="NIM *"
            required
            :counter="11"
            @input="$v.nim.$touch()"
            @blur="$v.nim.$touch()"
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
          <v-select
            v-model="kebangsaan"
            :error-messages="kebangsaanErrors"
            :items="bangsa"
            label="Kebangsaan *"
            required
            @input="$v.kebangsaan.$touch()"
            @blur="$v.kebangsaan.$touch()"
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
            v-model="notelpRumah"
            :error-messages="notelpRumahErrors"
            label="No. Telepon Rumah"
            required
            :counter="10"
            @input="$v.notelpRumah.$touch()"
            @blur="$v.notelpRumah.$touch()"
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
          <v-select
            v-model="pendidikan"
            :items="pendidikanItem"
            :error-messages="pendidikanErrors"
            label="pendidikan Terakhir *"
            required
            @change="$v.pendidikan.$touch()"
            @blur="$v.pendidikan.$touch()"
          ></v-select>
          <h1>
            <br />b. Data Pekerjaan Sekarang
          </h1>
          <v-text-field
            v-model="pekerjaan"
            :error-messages="pekerjaanErrors"
            label="Pekerjaan *"
            required
            @input="$v.pekerjaan.$touch()"
            @blur="$v.pekerjaan.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="perusahaan"
            :error-messages="perusahaanErrors"
            label="Nama Lembaga / Perusahaan"
            required
            @input="$v.perusahaan.$touch()"
            @blur="$v.perusahaan.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="jabatan"
            :error-messages="jabatanErrors"
            label="Jabatan"
            required
            @input="$v.jabatan.$touch()"
            @blur="$v.jabatan.$touch()"
          ></v-text-field>
          <v-textarea
            v-model="alamatKantor"
            :error-messages="alamatKantorErrors"
            label="Alamat Kantor"
            required
            @input="$v.alamatKantor.$touch()"
            @blur="$v.alamatKantor.$touch()"
          ></v-textarea>
          <v-text-field
            v-model="kodeposKantor"
            :error-messages="kodeposKantorErrors"
            label="Kodepos Kantor"
            required
            :counter="5"
            @input="$v.kodeposKantor.$touch()"
            @blur="$v.kodeposKantor.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="notelpKantor"
            :error-messages="notelpKantorErrors"
            label="No. Telepon Kantor"
            required
            :counter="10"
            @input="$v.notelpKantor.$touch()"
            @blur="$v.notelpKantor.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="fax"
            :counter="10"
            :error-messages="faxErrors"
            label="Fax Kantor"
            required
            @input="$v.fax.$touch()"
            @blur="$v.fax.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="emailKantor"
            :error-messages="emailKantorErrors"
            label="E-mail Kantor"
            required
            @input="$v.emailKantor.$touch()"
            @blur="$v.emailKantor.$touch()"
          ></v-text-field>
          <h1>
            <br />c. Upload Data Pendukung
            <br />
            <br />
          </h1>
          <div v-if="jenis==''">
          <v-file-input show-size accept="image/*" :rules="ijazahRules" v-model="ijazah" :error-messages="ijazahErrors" color="#065139" label="Upload Ijazah *" required></v-file-input>
          <v-file-input show-size accept="image/*" :rules="photoRules" v-model="photo" :error-messages="photoErrors" color="#065139" label="Upload Pas Photo *" required></v-file-input>
          <v-file-input show-size accept="image/*" :rules="identitasRules" v-model="identitas" :error-messages="identitasErrors" color="#065139" label="Upload File Kartu Identitas *" required></v-file-input>
          <br />
          </div>
          <div v-else>
          <v-file-input show-size  accept="image/*" v-model="ijazahUpdate"  color="#065139" label="Upload Ijazah *" ></v-file-input>
          <v-file-input show-size accept="image/*" v-model="photoUpdate"  color="#065139" label="Upload Pas Photo *" ></v-file-input>
          <v-file-input show-size accept="image/*" v-model="identitasUpdate" color="#065139" label="Upload File Kartu Identitas *" ></v-file-input>
          <br />
          </div>
          <v-checkbox
            v-model="checkbox"
            :error-messages="checkboxErrors"
            label="kamu yakin menyimpan form ini?"
            required
            @change="$v.checkbox.$touch()"
            @blur="$v.checkbox.$touch()"
          ></v-checkbox>
          <v-btn v-if="jenis==''" :disabled="!valid" class="white--text" color="#065139" @click="submit">submit</v-btn>
          <v-btn v-else :disabled="!valid" class="white--text" color="#065139" @click="update">update</v-btn>
          <v-btn style="margin-left:10px" class="white--text" color="red darken-1" @click="clear">clear</v-btn>
          <br />
          <br />
          <br />
          <v-snackbar v-model="snackbar">{{error_message}}</v-snackbar>
        </v-form>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  alpha,
  numeric,
  maxLength,
} from "vuelidate/lib/validators";
import { helpers } from "vuelidate/lib/validators";
const alphaSpace = helpers.regex("alpha", /^[a-zA-Z\s]*$/);
export default {
  mixins: [validationMixin],
  validations: {
    nama: { required, alphaSpace },
    nim: { required, numeric, maxLength: maxLength(11) },
    tempat: { required, alpha },
    tanggal: { required },
    jenisKelamin: { required },
    kebangsaan: { required },
    alamat: { required },
    kodepos: { required, numeric, maxLength: maxLength(5) },
    notelpHp: { required, numeric,maxLength: maxLength(13) },
    pendidikan: { required },
    pekerjaan: { required },
    notelpRumah: { numeric,maxLength: maxLength(10) },
    perusahaan: { },
    jabatan: { },
    alamatKantor: {  },
    kodeposKantor: { numeric, maxLength: maxLength(5) },
    fax: {  numeric,maxLength: maxLength(10) },
    emailKantor: { email },
    notelpKantor: { numeric,maxLength: maxLength(10) },
    checkbox: {
      checked(val) {
        return val;
      },
    },
  },

  data: () => ({
    ijazahRules: [
      v => !!v || 'File diperlukan',
      v => (v && v.size < 1000000) || "Gambar harus kurang dari 1000 KB!"],
      identitasRules: [
      v => !!v || 'File diperlukan',
      v => (v && v.size < 1000000) || "Gambar harus kurang dari 1000 KB!"],
      photoRules: [
      v => !!v || 'File diperlukan',
      v => (v && v.size < 1000000) || "Gambar harus kurang dari 1000 KB!"],   
    id: "",
    jenis:"",
    valid: true,
    snackbar: false,
    menu2: false,
    error_message: "",
    nama: "",
    nim:"",
    tempat: "",
    tanggal: null,
    jenisKelamin: null,
    kebangsaan: "",
    alamat: "",
    kodepos: "",
    notelpRumah: "",
    notelpHp: "",
    notelpKantor: "",
    pendidikan: null,
    pekerjaan: "",
    perusahaan: "",
    jabatan: "",
    alamatKantor: "",
    kodeposKantor: "",
    fax: "",
    emailKantor: "",
    ijazah:null,
    photo:null,
    identitas:null,
    ijazahUpdate:null,
    photoUpdate:null,
    identitasUpdate:null,
    jk: ["Laki - laki", "Perempuan"],
    bangsa:["WNI","WNA"],
    pendidikanItem: ["SMA/SMK","D3","D4", "S1", "S2","S3"],
    checkbox: false,
  }),

  computed: {
    emailKantorErrors() {
      const errors = [];
      if (!this.$v.emailKantor.$dirty) return errors;
      !this.$v.emailKantor.email && errors.push("E-mail harus benar");
      return errors;
    },
    namaErrors() {
      const errors = [];
      if (!this.$v.nama.$dirty) return errors;
      !this.$v.nama.alphaSpace && errors.push("Data harus alfabet diperlukan");
      !this.$v.nama.required && errors.push("Data diperlukan");
      return errors;
    },
    nimErrors() {
      const errors = [];
      if (!this.$v.nim.$dirty) return errors;
      !this.$v.nim.numeric && errors.push("Data harus angka diperlukan");
      !this.$v.nim.maxLength && errors.push("Data maximal 11 karakter ");
      !this.$v.nim.required && errors.push("Data diperlukan");
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
    kebangsaanErrors() {
      const errors = [];
      if (!this.$v.kebangsaan.$dirty) return errors;
      !this.$v.kebangsaan.required && errors.push("Data diperlukan");
      return errors;
    },
    alamatErrors() {
      const errors = [];
      if (!this.$v.alamat.$dirty) return errors;
      !this.$v.alamat.required && errors.push("Data diperlukan");
      return errors;
    },
    /* alamatKantorErrors() {
      const errors = [];
      if (!this.$v.alamatKantor.$dirty) return errors;
      !this.$v.alamatKantor.required && errors.push("Data diperlukan");
      return errors;
    }, */
    kodeposErrors() {
      const errors = [];
      if (!this.$v.kodepos.$dirty) return errors;
      !this.$v.kodepos.numeric && errors.push("Data harus angka diperlukan");
      !this.$v.kodepos.maxLength && errors.push("Kodepos maximal 5 karakter ");
      !this.$v.kodepos.required && errors.push("Data diperlukan");
      return errors;
    },
    kodeposKantorErrors() {
      const errors = [];
      if (!this.$v.kodeposKantor.$dirty) return errors;
      !this.$v.kodeposKantor.numeric && errors.push("Kodepos harus angka");
      !this.$v.kodeposKantor.maxLength && errors.push("Kodepos maximal 5 karakter ");
      //!this.$v.kodeposKantor.required && errors.push("Data diperlukan");
      return errors;
    },
    notelpRumahErrors() {
      const errors = [];
      if (!this.$v.notelpRumah.$dirty) return errors;
      !this.$v.notelpRumah.numeric && errors.push("Data harus angka diperlukan");
      !this.$v.notelpRumah.maxLength && errors.push("Kodepos maximal 10 karakter ");
      //!this.$v.notelpRumah.required && errors.push("Data diperlukan");
      return errors;
    },
    notelpHpErrors() {
      const errors = [];
      if (!this.$v.notelpHp.$dirty) return errors;
      !this.$v.notelpHp.numeric && errors.push("Data harus angka diperlukan");
      !this.$v.notelpHp.maxLength && errors.push("Kodepos maximal 13 karakter ");
      !this.$v.notelpHp.required && errors.push("Data diperlukan");
      return errors;
    },
    notelpKantorErrors() {
      const errors = [];
      if (!this.$v.notelpKantor.$dirty) return errors;
      !this.$v.notelpKantor.numeric && errors.push("Data harus angka diperlukan");
      !this.$v.notelpKantor.maxLength && errors.push("Kodepos maximal 10 karakter ");
      //!this.$v.notelpKantor.required && errors.push("Data diperlukan");
      return errors;
    },
    faxErrors() {
      const errors = [];
      if (!this.$v.fax.$dirty) return errors;
      !this.$v.fax.numeric && errors.push("Data harus angka");
      !this.$v.fax.maxLength && errors.push("Kodepos maximal 10 karakter ");
      return errors;
    },
    pendidikanErrors() {
      const errors = [];
      if (!this.$v.pendidikan.$dirty) return errors;
      !this.$v.pendidikan.required && errors.push("Wajib memilih");
      return errors;
    },
    pekerjaanErrors() {
      const errors = [];
      if (!this.$v.pekerjaan.$dirty) return errors;
      !this.$v.pekerjaan.required && errors.push("Wajib memilih");
      return errors;
    },
    /* perusahaanErrors() {
      const errors = [];
      if (!this.$v.perusahaan.$dirty) return errors;
      !this.$v.perusahaan.required && errors.push("Data memilih");
      return errors;
    }, */
    /* jabatanErrors() {
      const errors = [];
      if (!this.$v.jabatan.$dirty) return errors;
      !this.$v.jabatan.required && errors.push("Data diperlukan");
      return errors;
    }, */
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push("You must agree to continue!");
      return errors;
    },
  },

  methods: {
    update() {
      this.error_message = "";
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.error_message = "Periksa kembali form diatas";
        this.snackbar = true;
      } else {
        const data = new FormData();
        data.append("namaLengkap", this.nama);
        data.append("nim", this.nim);
        data.append("tempatLahir", this.tempat);
        data.append("tanggalLahir", this.tanggal);
        if(this.jenisKelamin=="Perempuan"){
          data.append("jenisKelamin", "P");
        }else{
          data.append("jenisKelamin", "L");
        }
        data.append("kebangsaan", this.kebangsaan);
        data.append("noHP", this.notelpHp);
        data.append("alamatRumah", this.alamat);
        data.append("kodeposRumah", this.kodepos);
        data.append("noTeleponRumah", this.notelpRumah);
        data.append("namaPerusahaan", this.perusahaan);
        data.append("jabatandiPerusahaan", this.jabatan);
        data.append("alamatPerusahaan", this.alamatKantor);
        data.append("kodeposPerusahaan", this.kodeposKantor);
        data.append("noTeleponPerusahaan", this.notelpKantor);
        data.append("faxPerusahaan", this.fax);
        data.append("emailPerusahaan", this.emailKantor);
        data.append("pendidikanTerakhir", this.pendidikan);
        data.append("pekerjaan", this.pekerjaan);
        if(this.ijazahUpdate!=null){
          data.append("ijazah", this.ijazahUpdate);
        }
        if(this.photoUpdate!=null){
          data.append("photo", this.photoUpdate);
        }
        if(this.identitas!=null){
          data.append("kartu_identitas", this.identitasUpdate);
        }
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
    submit() {
      this.error_message = "";
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.error_message = "Periksa kembali form diatas";
        this.snackbar = true;
      } else {
        const data = new FormData();
        data.append("namaLengkap", this.nama);
        data.append("nim", this.nim);
        data.append("tempatLahir", this.tempat);
        data.append("tanggalLahir", this.tanggal);
        if(this.jenisKelamin=="Perempuan"){
          data.append("jenisKelamin", "P");
        }else{
          data.append("jenisKelamin", "L");
        }
        data.append("kebangsaan", this.kebangsaan);
        data.append("noHP", this.notelpHp);
        data.append("alamatRumah", this.alamat);
        data.append("kodeposRumah", this.kodepos);
        data.append("noTeleponRumah", this.notelpRumah);
        data.append("namaPerusahaan", this.perusahaan);
        data.append("jabatandiPerusahaan", this.jabatan);
        data.append("alamatPerusahaan", this.alamatKantor);
        data.append("kodeposPerusahaan", this.kodeposKantor);
        data.append("noTeleponPerusahaan", this.notelpKantor);
        data.append("faxPerusahaan", this.fax);
        data.append("emailPerusahaan", this.emailKantor);
        data.append("pendidikanTerakhir", this.pendidikan);
        data.append("pekerjaan", this.pekerjaan);
        data.append("ijazah", this.ijazah);
        data.append("photo", this.photo);
        data.append("kartu_identitas", this.identitas);
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
    clear() {
      this.$v.$reset();
      this.nama = "";
      this.nim = "";
      this.tempat = "";
      (this.tanggal = null), (this.jenisKelamin = null);
      this.kebangsaan = "";
      this.alamat = "";
      this.kodepos = "";
      this.notelpRumah = "";
      this.notelpHp = "";
      this.notelpKantor = "";
      this.pendidikan = null;
      this.perusahaan = "";
      this.jabatan = "";
      this.alamatKantor = "";
      this.kodeposKantor = "";
      this.fax = "";
      this.emailKantor = "";
      this.checkbox = false;
    },
  },

  watch: {
    menu2(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },

  mounted() {
    if (this.$store.getters.isLoggedInPeserta) {
      this.token = this.$store.state.token;
      this.tunnel = this.$store.state.tunnel;
      axios
        .get(`${this.tunnel}peserta/me`, {
          headers: { Authorization: "bearer " + this.$store.state.token },
        })
        .then((response) => {
          console.log(response.data)
          this.jenis = response.data.user.biodata.namaLengkap;
          this.nama = response.data.user.biodata.namaLengkap;
          this.nim = response.data.user.biodata.nim;
          this.tempat = response.data.user.biodata.tempatLahir;
          this.tanggal = response.data.user.biodata.tanggalLahir;
          this.jenisKelamin = response.data.user.biodata.jenisKelamin;
          this.kebangsaan = response.data.user.biodata.kebangsaan;
          this.alamat = response.data.user.biodata.alamatRumah;
          this.kodepos = response.data.user.biodata.kodeposRumah;
          this.notelpRumah = response.data.user.biodata.noTeleponRumah;
          this.notelpHp = response.data.user.biodata.noHP;
          this.notelpKantor = response.data.user.biodata.noTeleponPerusahaan;
          this.pendidikan = response.data.user.biodata.pendidikanTerakhir;
          this.pekerjaan = response.data.user.biodata.pekerjaan;
          this.perusahaan = response.data.user.biodata.namaPerusahaan;
          this.jabatan = response.data.user.biodata.jabatandiPerusahaan;
          this.alamatKantor = response.data.user.biodata.alamatPerusahaan;
          this.kodeposKantor = response.data.user.biodata.kodeposPerusahaan;
          this.fax = response.data.user.biodata.faxPerusahaan;
          this.emailKantor = response.data.user.biodata.emailPerusahaan;
        })
        .catch((error) => {
          this.error_message = error;
          this.snackbar = true;
        });
     } else {
      this.$router.push("login-daftar");
    } 
  },
};
</script>