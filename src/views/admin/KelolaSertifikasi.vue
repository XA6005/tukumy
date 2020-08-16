<template>
  <v-app id="Kelola Sertifikasi">
    <v-main>
      <div class="container mt-5">
        <v-data-table :headers="headers" :items="sertifikasi" class="elevation-1">
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Kelola Jadwal Sertifikasi</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >Tambah Jadwal Sertifikasi</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-text-field
                        v-model="editedItem.skemasertifikasi_id"
                        label="Skema Sertifikasi"
                      ></v-text-field>
                      <v-text-field v-model="editedItem.tempat" label="Tempat Sertifikasi"></v-text-field>
                      <v-menu
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editedItem.tanggal"
                            label="Tanggal Sertifikasi"
                            aprepend-icon="event"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="editedItem.tanggal" :min="editedItem.tanggal" @input="menu2 = false"></v-date-picker>
                      </v-menu>
                      <v-menu
                        ref="menu"
                        v-model="menu1"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="time"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            v-model="editedItem.jam"
                            label="Waktu Sertifikasi"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="menu1"
                          v-model="editedItem.jam"
                          full-width
                          @click:minute="$refs.menu.save(editedItem.jam)"
                        ></v-time-picker>
                      </v-menu>
                      <v-text-field v-model="editedItem.biaya" label="Biaya"></v-text-field>
                      <v-select :items="tujuan" v-model="editedItem.tujuanasessmen" label="Tujuan"></v-select>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="save(editedItem)">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
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
      token: "",
      snackbar: "",
      error_message: "",
      tunnel: "",
      tujuan: [
        "Sertifikasi",
        "RPL",
        "Pencapaian Proses Pembelajaran",
        "RRC",
        "Lainnya",
      ],
      menu1: false,
      menu2: false,
      dialog: false,
      headers: [
        { text: "Id Skema Sertifikasi", value: "skemasertifikasi_id", align: "start" },
        { text: "Skema Sertifikasi", value: "skemaa" },
        { text: "Tempat Sertifikasi", value: "tempat" },
        { text: "Tanggal Sertifikasi", value: "tanggal" },
        { text: "Waktu Sertifikasi", value: "jam" },
        { text: "Tujuan Assesmen", value: "tujuanasessmen" },
        { text: "Actions", value: "actions" },
      ],
      sertifikasi: [],
      skema:[],
      editedIndex: -1,
      editedItem: {
        id: "",
        skemasertifikasi_id: "",
        skemaa : "",
        tempat: "",
        tanggal: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().substr(0, 10),
        jam: null,
        biaya: "",
        tujuanasessmen: "",
      },
      defaultItem: {
        id: "",
        skemasertifikasi_id: "",
        tempat: "",
        tanggal: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().substr(0, 10),
        jam: null,
        biaya: "",
        tujuanasessmen: "",
      },
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Tambah Jadwal" : "Ubah Jadwal";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  mounted() {
    if (this.$store.getters.isLoggedInAdmin) {
      this.loadSertifikasi();
      this.tunnel = this.$store.state.tunnel;
      axios
        .get(`${this.tunnel}jadwal`)
        .then((response) => {
          this.sertifikasi = response.data.data.jadwal
        })
        .catch((error) => {
          this.error_message = error;
          this.snackbar = true;
        });
        axios
        .get(`${this.tunnel}skema`)
        .then((response) => {
          this.skema = response.data.data.SkemaSertifikasi
        })
        .catch((error) => {
          this.error_message = error;
          this.snackbar = true;
        });
    } else {
      this.$router.push("login-admin");
    }
  },

  methods: {
    loadSertifikasi() {
      this.sertifikasi = [];
      this.tunnel = this.$store.state.tunnel;
      axios
        .get(`${this.tunnel}jadwal`)
        .then((response) => {
          this.sertifikasi = response.data.data.jadwal;
        })
        .catch((error) => {
          this.error_message = error;
          this.snackbar = true;
        });
      axios
        .get(`${this.tunnel}skema`)
        .then((response) => {
          this.skema = response.data.data.SkemaSertifikasi;
        })
        .catch((error) => {
          this.error_message = error;
          this.snackbar = true;
        });
    },

    editItem(item) {
      this.editedIndex = this.sertifikasi.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      confirm("Kamu yakin mau menghapus sertifikasi ini?") &&
        axios
          .delete(`${this.tunnel}jadwal/` + item.id, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
            },
          })
          .then((response) => {
            this.error_message = response.data.message;
            this.snackbar = true;
            this.loadSertifikasi();
          })
          .catch((error) => {
            this.error_message = error;
            this.snackbar = true;
          });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save(item) {
      if (this.editedIndex > -1) {
        const formdata = new FormData();
        formdata.append("tempat", item.tempat);
        formdata.append("tanggal", item.tanggal);
        formdata.append("jam", item.jam);
        formdata.append("biaya", item.biaya);
        formdata.append("skemasertifikasi_id", item.skemasertifikasi_id);
        formdata.append("tujuanasessmen", item.tujuanasessmen);
        formdata.append("_method", "PUT");
        axios
          .post(`${this.tunnel}jadwal/` + item.id, formdata, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.error_message = response.data.message;
            this.snackbar = true;
            this.loadSertifikasi();
          })
          .catch((error) => {
            this.error_message = error;
            this.snackbar = true;
          });
      } else {
        const formdata = new FormData();
        formdata.append("tempat", item.tempat);
        formdata.append("tanggal", item.tanggal);
        formdata.append("jam", item.jam);
        formdata.append("biaya", item.biaya);
        formdata.append("skemasertifikasi_id", item.skemasertifikasi_id);
        formdata.append("tujuanasessmen", item.tujuanasessmen);
        axios
          .post(`${this.tunnel}jadwal`, formdata, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
            },
          })
          .then((response) => {
            this.error_message = response.data.message;
            this.snackbar = true;
            this.loadSertifikasi();
          })
          .catch((error) => {
            this.error_message = error;
            this.snackbar = true;
          });
      }
      this.close();
    },
  },
};
</script>
