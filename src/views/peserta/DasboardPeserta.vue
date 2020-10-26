<template>
  <v-app id="Dasboard Peserta">
    <v-main>
      <div class="container mt-5">
        <v-data-table :headers="headers" :items="sertifikasi" class="elevation-1">
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Selamat Datang di Dasboard Peserta</v-toolbar-title>
              <v-spacer></v-spacer>
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
                    <v-btn color="red darken-1" text @click="close">Cancel</v-btn>
                    <v-btn color="green darken-1" text @click="save(editedItem)">Save</v-btn>
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
      sertifikasi: [
      ],
      editedItem: {
        skema_id: "",
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
      
      this.token = this.$store.state.token;
      this.tunnel = this.$store.state.tunnel;
     this.loadPeserta();
      } else {
      this.$router.push("login-peserta");
    } 
  },

  methods: {
    loadPeserta() {
      this.sertifikasi = [];
      this.token = this.$store.state.token;
      this.tunnel = this.$store.state.tunnel;
       axios
        .get(`${this.tunnel}jadwalpeserta/me`, {
          headers: { Authorization: "Bearer " + this.$store.state.token },
        })
        .then((response) => {
          if(response.data.jadwal==null){
             this.$router.push("daftar-sertifikasi");
          } 
          this.sertifikasi = response.data.jadwal.map((item) => {
            return {
              id: item.id,
              tempat: item.tempat,
              tanggal: item.tanggal,
              jam: item.jam,
              tipe: item.tipe,
              biaya: item.biaya,
              skema_id: item.skema_id,
              namaSkema: item.skema.nama,
              image_lihat: item.pivot.bukti_pembayaran,
              status: item.pivot.status,
              komentar:item.pivot.komentar,
              jadwal_id: item.pivot.jadwal_id,
            };
          });
        })
        .catch((error) => {
          this.$router.push("daftar-sertifikasi");
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
    close() {
      this.dialog = false;
    },
    closeBerkas() {
      this.dialogBerkas = false;
    },
    save(item) {
      const formdata = new FormData();
      formdata.append("jadwal_id", item.jadwal_id);
      formdata.append("bukti_pembayaran", item.image);
      formdata.append("_method", "PUT");
      axios
        .post(`${this.tunnel}jadwalpeserta/pembayaran`, formdata, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.snackbar = true;
          this.loadPeserta();
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