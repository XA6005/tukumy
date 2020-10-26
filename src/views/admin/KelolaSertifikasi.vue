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
                    color="#065139"
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
                      <v-form ref="form" v-model="valid" lazy-validation>
                        <v-select
                          required
                          :rules="skemaRules"
                          :items="skema"
                          v-model="editedItem.namaSkema"
                          label="Skema Sertifikasi"
                        ></v-select>
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
                              required
                              :rules="tanggalRules"
                              v-model="editedItem.tanggal"
                              label="Tanggal Sertifikasi"
                              append-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="editedItem.tanggal"
                            :min="minimtanggal"
                            @input="menu2 = false"
                          ></v-date-picker>
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
                              required
                              :rules="jamRules"
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
                            use-seconds
                            full-width
                            @click:minute="$refs.menu.save(editedItem.jam)"
                          ></v-time-picker>
                        </v-menu>
                        <v-text-field
                          type="number" 
                          required
                          :rules="biayaRules"
                          v-model.number="editedItem.biaya"
                          label="Biaya"/>
                        {{Number(editedItem.biaya).toLocaleString()}}
                        <v-select
                          required
                          :rules="tujuanRules"
                          :items="tujuan"
                          v-model="editedItem.tujuan"
                          label="Tujuan"
                        ></v-select>
                        <v-select
                          required
                          :rules="tipeRules"
                          :items="tipe"
                          v-model="editedItem.tipe"
                          label="Tipe"
                        ></v-select>
                        <v-text-field v-if="editedItem.tipe=='Offline'"
                          v-model="editedItem.tempat"
                          label="Tempat Sertifikasi"
                        ></v-text-field>
                      </v-form>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="close">Cancel</v-btn>
                    <v-btn color="green darken-1" :disabled="!valid" text @click="validate(editedItem)">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
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
      skemaRules: [(v) => !!v || "Skema harus dipilih"],
      tanggalRules: [(v) => !!v || "Tanggal harus dipilih"],
      biayaRules: [(v) => !!v || "biaya harus diisi angka"],
      jamRules: [(v) => !!v || "Jam harus dipilih"],
      tujuanRules: [(v) => !!v || "Tujuan harus dipilih"],
      tipeRules: [(v) => !!v || "Tipe harus dipilih"],
      token: "",
      snackbar: "",
      error_message: "",
      tunnel: "",
      minimtanggal:new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
          .toISOString()
          .substr(0, 10),
      tujuan: [
        "Sertifikasi",
        "RPL",
        "Pencapaian Proses Pembelajaran",
        "RRC",
        "Lainnya",
      ],
      tipe: ["Online", "Offline"],
      menu1: false,
      menu2: false,
      dialog: false,
      headers: [ 
        { text: "Skema Sertifikasi", value: "namaSkema" },
        { text: "Tipe Sertifikasi", value: "tipe" },
        { text: "Tanggal Sertifikasi", value: "tanggal" },
        { text: "Waktu Sertifikasi", value: "jam" },
        { text: "Tujuan Assesmen", value: "tujuan" },
        { text: "Actions", value: "actions" },
      ],
      sertifikasi: [
        
      ],
      skemaid: [],
      skema: [],
      editedIndex: -1,
      editedItem: {
        id: "",
        namaSkema: "",
        tempat: "",
        tanggal: null,
        jam: null,
        biaya: null,
        tujuan: "",
        tipe: "",
      },
      defaultItem: {
        id: "",
        namaSkema: "",
        tempat: "",
        tanggal: null,
        jam: null,
        biaya: null,
        tujuan: "",
        tipe: "",
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
          this.sertifikasi = response.data.jadwal.map((item) => {
            return {
              id: item.Id_Jadwal,
              tempat: item.Tempat,
              tanggal:item.Tanggal,
              jam : item.Jam,
              tipe: item.TipeUjian,
              biaya: item.Biaya,
              tujuan : item.TujuanAsesmen,
              skema_id: item.Skema_Id,
              namaSkema:item.skema.NamaSkema
            };
          });
        })
        .catch((error) => {
          this.error_message = error;
          if (error.response.status === 404) {
            this.error_message = "Data Kosong";
            this.snackbar = true;
          }
          this.snackbar = true;
        });
      axios
        .get(`${this.tunnel}skema`)
        .then((response) => {
          this.skemaid = response.data.skema.map((item) => {
            return {
              id: item.Id_Skema,
              nama: item.NamaSkema,
            };
          });
          this.skema = response.data.skema.map((item) => {
            return item.NamaSkema;
          });
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
      confirm("Kamu yakin mau menghapus jadwal ini?") &&
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

    validate(item) {
      var skid = this.skemaid.find( ({ nama }) => nama === item.namaSkema );
      var a =parseInt(item.biaya);
      if (this.editedIndex > -1) {
        const formdata = new FormData();
        formdata.append("Tempat", item.tempat);
        formdata.append("Tanggal", item.tanggal);
        formdata.append("Jam", item.jam);
        formdata.append("TipeUjian", item.tipe);
        formdata.append("Biaya", a);
        formdata.append("Skema_Id", skid.id);
        formdata.append("TujuanAsesmen", item.tujuan);
        formdata.append("_method", "PUT");
        this.error_message = "Mohon tunggu";
        this.snackbar = true;
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
            this.close();
          })
          .catch((error) => {
            this.error_message = error;
            this.snackbar = true;
          });
      } else {
        this.$refs.form.validate(item);
        if (this.valid == true) {
          const formdata = new FormData();
          formdata.append("Tempat", item.tempat);
          formdata.append("Tanggal", item.tanggal);
          formdata.append("Jam", item.jam);
          formdata.append("TipeUjian", item.tipe);
          formdata.append("Biaya", item.biaya);
          formdata.append("Skema_Id", skid.id);
          formdata.append("TujuanAsesmen", item.tujuan);
          this.error_message = "Mohon tunggu";
          this.snackbar = true;
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
              this.close();
            })
            .catch((error) => {
              this.error_message = error;
              this.snackbar = true;
            });
        }
      }
    },
  },
};
</script>
