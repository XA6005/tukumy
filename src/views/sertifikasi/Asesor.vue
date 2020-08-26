<template>
  <v-app id="Kelola Asesor">
    <v-main>
      <div class="container mt-5">
        <v-data-table :headers="headers" :items="sertifikasi" class="elevation-1">
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Daftar Asesor</v-toolbar-title>
            </v-toolbar>
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
      valid: true,
      token: "",
      snackbar: "",
      error_message: "",
      tunnel: "",
      dialog: false,
      headers: [
        { text: "Nama Asessor", value: "namaLengkap" },
        { text: "Ruang Lingkup Sertifikasi", value: "ruangLingkup" },
      ],
      sertifikasi: [],
      skemaid: [],
      skema: [],
      editedIndex: -1,
      editedItem: {
        id: "",
        namaLengkap: "",
        namaSkema: "",
      },
      defaultItem: {
        id: "",
        namaLengkap: "",
        namaSkema: "",
      },
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Tambah Skema" : "Ubah Skema";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  mounted() {
      this.loadSertifikasi();
      this.tunnel = this.$store.state.tunnel;
      var sknama = this.skemaid.find( ({ id }) => id === item.id );
      axios
        .get(`${this.tunnel}asesor`)
        .then((response) => {
          this.sertifikasi = response.data.data.asesor.map((item) => {
            return {
              id: item.id,
              namaLengkap: item.namaLengkap,
              ruangLingkup: item.skema_sertifikasi.nama,
            };
          });
        })
        .catch((error) => {
          this.error_message = error;
          this.snackbar = true;
        }); 
  },

  methods: {
    loadSertifikasi() {
      this.sertifikasi = [];
      this.tunnel = this.$store.state.tunnel;
      axios
        .get(`${this.tunnel}asesor`)
        .then((response) => {
          this.sertifikasi = response.data.data.asesor.map((item) => {
            return {
              id: item.id,
              namaLengkap: item.namaLengkap,
              ruangLingkup: item.skema_sertifikasi.nama,
            };
          });
        })
        .catch((error) => {
          this.error_message = error;
          this.snackbar = true;
        });
    },
  },
};
</script>
