<template>
  <v-app id="Dasboard Peserta">
    <v-main>
      <div class="container mt-5">
        <v-data-table :headers="headers" :items="sertifikasi" class="elevation-1">
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Selamat Datang di Dasboard Peserta</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="#065139" dark href="/form-daftar">APL-01</v-btn>
              <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="headline">Upload Bukti Pembayaran</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-text-field
                        disabled="true"
                        v-model="editedItem.namaSkema"
                        label="Skema Sertifikasi"
                      ></v-text-field>
                      <v-text-field
                        :disabled="true"
                        v-model="editedItem.tipe"
                        label="Tipe Sertifikasi"
                      ></v-text-field>
                      <v-text-field
                        v-if="editedItem.tipe!='Online'"
                        :disabled="true"
                        v-model="editedItem.tempat"
                        label="Tempat Sertifikasi"
                      ></v-text-field>
                      <v-text-field
                        disabled="true"
                        v-model="editedItem.tanggal"
                        label="Tanggal Sertifikasi"
                      ></v-text-field>
                      <v-text-field disabled="true" v-model="editedItem.jam" label="Waktu"></v-text-field>
                      <v-file-input
                        color="#065139"
                        v-model="editedItem.image"
                        :rules="buktiRules"
                        show-size
                        accept="image/*"
                        label="Upload bukti pembayaran"
                      ></v-file-input>
                      <a
                        :href="tunnel+'bukti-pembayaran/'+editedItem.image_lihat"
                      >{{editedItem.image_lihat}}</a>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="save(editedItem)">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogBerkas" max-width="800px">
                <v-card>
                  <v-card-title>
                    <span class="headline">Upload Berkas Tambahan</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <div v-if="upItem.tipe=='Online'">
                        <v-btn
                          v-if="upItem.berkas_verifikasi_lihat==null"
                          class="mr-2 white--text"
                          color="#065139"
                          :href="tunnel+'berkas-skema/'+upItem.download_online"
                        >Unduh Berkas Sertifikasi Online</v-btn>
                        <v-file-input
                          color="#065139"
                          v-model="upItem.berkas_verifikasi"
                          :rules="verifikasiRules"
                          show-size
                          accept=".doc, .docx"
                          label="Upload Ulang berkas verifikasi"
                        ></v-file-input>
                        <a
                          :href="tunnel+'berkas-verifikasi/'+upItem.berkas_verifikasi_lihat"
                        >{{upItem.berkas_verifikasi_lihat}}</a>
                        <br />
                      </div>
                      <v-btn
                        v-if="upItem.berkas_apl02_lihat==null"
                        class="mr-2 white--text"
                        color="#065139"
                        :href="tunnel+'berkas-apl02/'+upItem.download_APL02"
                      >Unduh APL02</v-btn>
                      <v-file-input
                        color="#065139"
                        v-model="upItem.berkas_apl02"
                        :rules="APL02Rules"
                        show-size
                        accept=".doc, .docx"
                        label="Upload berkas APL02"
                      ></v-file-input>
                      <a
                        :href="tunnel+'berkas-apl02-verifikasi/'+upItem.berkas_apl02_lihat"
                      >{{upItem.berkas_apl02_lihat}}</a>
                      <v-file-input
                        color="#065139"
                        v-model="upItem.sertifikat"
                        :rules="sertifikatRules"
                        show-size
                        accept=".rar, .zip"
                        label="Upload berkas sertifikat(Transkrip Nilai atau Sertifikat yang mendukung lain)"
                      ></v-file-input>
                      <a
                        :href="tunnel+'sertifikat/'+upItem.sertifikat_lihat"
                      >{{upItem.sertifikat_lihat}}</a>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeBerkas">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="saveUpload(upItem)">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{item}">
            <v-btn
              small
              class="mr-2 white--text"
              color="#065139"
              @click="editItem(item,item.status)"
            >Upload Pembayaran</v-btn>
            <v-btn
              small
              class="mr-2 white--text"
              color="#065139"
              @click="uploadItem(item)"
            >Upload Berkas Tambahan</v-btn>
          </template>
        </v-data-table>
        <v-snackbar v-model="snackbar">{{error_message}}</v-snackbar>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      sertifikatRules: [
        (v) => !!v || "File diperlukan",
        (v) => (v && v.size < 3500000) || "File harus kurang dari 3500 KB!",
      ],
      APL02Rules: [
        (v) => !!v || "File diperlukan",
        (v) => (v && v.size < 1500000) || "File harus kurang dari 1500 KB!",
      ],
      verifikasiRules: [
        (v) => !!v || "File diperlukan",
        (v) => (v && v.size < 1500000) || "Gambar harus kurang dari 1500 KB!",
      ],
      buktiRules: [
        (v) => !!v || "File diperlukan",
        (v) => (v && v.size < 500000) || "Gambar harus kurang dari 500 KB!",
      ],
      user: "",
      token: "",
      snackbar: "",
      error_message: "",
      tunnel: "",
      dialog: false,
      dialogBerkas: false,
      headers: [
        {
          text: "Skema Sertifikasi",
          align: "start",
          value: "namaSkema",
        },
        { text: "Tipe Sertifikasi", value: "tipe" },
        { text: "Tempat Sertifikasi", value: "tempat" },
        { text: "Tanggal Sertifikasi", value: "tanggal" },
        { text: "Upload", value: "actions" },
        { text: "Status", value: "status" },
        { text: "Keterangan", value: "komentar" },
      ],
      sertifikasi: [],
      biodata: [],
      upItem: {
        jadwal_id: "",
        tipe: "",
        berkas_apl02_lihat: "",
        berkas_apl02: null,
        berkas_verifikasi_lihat: "",
        berkas_verifikasi: null,
        sertifikat_lihat: "",
        sertifikat: null,
        download_APL02: "",
        download_online: "",
      },
      editedItem: {
        skemasertifikasi_id: "",
        tipe: "",
        jadwal_id: "",
        tempat: "",
        tanggal: null,
        jam: null,
        image: null,
        image_lihat: "",
      },
    };
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  mounted() {
    if (this.$store.getters.isLoggedInPeserta) {
      this.loadPeserta();
      this.token = this.$store.state.token;
      this.user = this.$store.state.user;
      this.tunnel = this.$store.state.tunnel;
      axios
        .get(`${this.tunnel}jadwalpeserta/me`, {
          headers: { Authorization: "Bearer " + this.$store.state.token },
        })
        .then((response) => {
          this.sertifikasi = response.data.jadwal.map((item) => {
            return {
              id: item.id,
              tempat: item.tempat,
              tanggal: item.tanggal,
              jam: item.jam,
              tipe: item.tipe,
              biaya: item.biaya,
              skemasertifikasi_id: item.skemasertifikasi_id,
              namaSkema: item.skema_sertifikasi.nama,
              image_lihat: item.pivot.bukti_pembayaran,
              status: item.pivot.status,
              komentar:item.pivot.komentar,
              jadwal_id: item.pivot.jadwal_id,
              berkas_apl02_lihat: item.pivot.berkas_apl02,
              sertifikat_lihat: item.pivot.sertifikat,
              berkas_verifikasi_lihat: item.pivot.berkas_verifikasi,
              download_APL02: item.skema_sertifikasi.berkas_apl02,
              download_online: item.skema_sertifikasi.berkas_skema,
            };
          });
        })
        .catch((error) => {
          this.error_message = error;
          this.snackbar = true;
        });
      axios
        .get(`${this.tunnel}peserta/me`, {
          headers: { Authorization: "bearer " + this.$store.state.token },
        })
        .then((response) => {
          this.biodata = response.data.user.biodata;
        })
        .catch((error) => {
          this.error_message = error;
          this.snackbar = true;
        });
    } else {
      this.$router.push("login-peserta");
    }
  },

  methods: {
    loadPeserta() {
      this.sertifikasi = [];
      this.token = this.$store.state.token;
      this.user = this.$store.state.user;
      this.tunnel = this.$store.state.tunnel;
      axios
        .get(`${this.tunnel}jadwalpeserta/me`, {
          headers: { Authorization: "Bearer " + this.$store.state.token },
        })
        .then((response) => {
          this.sertifikasi = response.data.jadwal.map((item) => {
            return {
              id: item.id,
              tempat: item.tempat,
              tanggal: item.tanggal,
              jam: item.jam,
              tipe: item.tipe,
              biaya: item.biaya,
              skemasertifikasi_id: item.skemasertifikasi_id,
              namaSkema: item.skema_sertifikasi.nama,
              image_lihat: item.pivot.bukti_pembayaran,
              status: item.pivot.status,
              komentar:item.pivot.komentar,
              jadwal_id: item.pivot.jadwal_id,
              berkas_apl02_lihat: item.pivot.berkas_apl02,
              sertifikat_lihat: item.pivot.sertifikat,
              berkas_verifikasi_lihat: item.pivot.berkas_verifikasi,
              download_APL02: item.skema_sertifikasi.berkas_apl02,
              download_online: item.skema_sertifikasi.berkas_skema,
            };
          });
        })
        .catch((error) => {
          this.error_message = error;
          this.snackbar = true;
        });
      axios
        .get(`${this.tunnel}peserta/me`, {
          headers: { Authorization: "bearer " + this.$store.state.token },
        })
        .then((response) => {
          this.biodata = response.data.user.biodata;
        })
        .catch((error) => {
          this.error_message = error;
          this.snackbar = true;
        });
    },

    editItem(item, status) {
      if (status == "lunas") {
        this.error_message = "Pembayaran Sudah Lunas";
        this.snackbar = true;
      } else {
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      }
    },
    uploadItem(item) {
      if (this.biodata == null) {
        this.error_message = "Isi file APL 01 dulu!";
        this.snackbar = true;
      } else {
        this.upItem = Object.assign({}, item);
        this.dialogBerkas = true;
      }
    },
    close() {
      this.dialog = false;
    },
    closeBerkas() {
      this.dialogBerkas = false;
    },
    saveUpload(item) {
      const formdata = new FormData();
      formdata.append("jadwal_id", item.jadwal_id);
      if (item.berkas_apl02 != null) {
        formdata.append("berkas_apl02", item.berkas_apl02);
      }
      if (item.berkas_verifikasi != null) {
        formdata.append("berkas_verifikasi", item.berkas_verifikasi);
      }
      if (item.sertifikat != null) {
        formdata.append("sertifikat", item.sertifikat);
      }
      formdata.append("_method", "PUT");
      axios
        .post(`${this.tunnel}updateberkasdanbuktipembayaran`, formdata, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.snackbar = true;
        })
        .catch((error) => {
          this.error_message = error;
          this.snackbar = true;
        });
      this.closeBerkas();
    },
    save(item) {
      const formdata = new FormData();
      formdata.append("jadwal_id", item.jadwal_id);
      formdata.append("bukti_pembayaran", item.image);
      formdata.append("_method", "PUT");
      axios
        .post(`${this.tunnel}updateberkasdanbuktipembayaran`, formdata, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.snackbar = true;
        })
        .catch((error) => {
          this.error_message = error;
          this.snackbar = true;
        });
      this.close();
    },
  },
};
</script>