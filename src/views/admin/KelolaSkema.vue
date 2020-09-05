<template>
  <v-app id="Kelola Skema">
    <v-main>
      <div class="container mt-5">
        <v-data-table :headers="headers" :items="sertifikasi" class="elevation-1">
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Kelola Skema</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="800px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="#065139"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >Tambah Skema Sertifikasi</v-btn>
                </template>
                <v-card>
                  <v-form ref="form" v-model="valid" lazy-validation>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                        <v-text-field
                          :rules="namaRules"
                          required
                          v-model="editedItem.nama"
                          label="Nama Skema"
                        ></v-text-field>
                        <v-text-field
                          :counter="100"
                          :rules="tujuanRules"
                          required
                          v-model="editedItem.tujuan"
                          label="Tujuan Skema"
                        ></v-text-field>
                        <v-textarea
                          :rules="deskripsiRules"
                          show-size
                          required
                          v-model="editedItem.deskripsi"
                          label="Deskripsi Skema"
                        ></v-textarea>
                        <div v-if="formTitle=='Tambah Skema'">
                        <v-file-input
                          :rules="berkasRules"
                          value="editedItem.detail_skema"
                          accept=".pdf"
                          required
                          show-size
                          v-model="editedItem.detail_skema"
                          label="Berkas Panduan Skema"
                        ></v-file-input>
                        <v-file-input
                          :rules="verifikasiRules"
                          required
                          accept=".doc, .docx"
                          show-size
                          v-model="editedItem.berkas_skema"
                          label="Berkas Verifikasi Online Skema"
                        ></v-file-input>
                        <v-file-input
                          :rules="aPLRules"
                          required
                          accept=".doc, .docx"
                          show-size
                          v-model="editedItem.berkas_apl02"
                          label="Berkas APL 02"
                        ></v-file-input>
                        </div>
                         <div v-else>
                        <v-file-input
                          accept=".pdf"
                          show-size
                          v-model="editedItem.detail_skema"
                          label="Berkas Panduan Skema"
                        ></v-file-input>
                        <v-file-input
                          accept=".doc, .docx"
                          show-size
                          v-model="editedItem.berkas_skema"
                          label="Berkas Verifikasi Online Skema"
                        ></v-file-input>
                        <v-file-input
                          accept=".doc, .docx"
                          show-size
                          v-model="editedItem.berkas_apl02"
                          label="Berkas APL 02"
                        ></v-file-input>
                        </div>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="close">Cancel</v-btn>
                    <v-btn
                      color="green darken-1"
                      :disabled="!valid"
                      text
                      @click="validate(editedItem)"
                    >Save</v-btn>
                  </v-card-actions>
                  </v-form>
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
      berkasRules: [
          v => !!v || 'File diperlukan',
          v => (v && v.size < 1000000) || "Berkas harus kurang dari 1000 KB!",
      ],
      verifikasiRules: [
        v => !!v || 'File diperlukan',
        v => (v && v.size < 200000) || "Berkas harus kurang dari 200 KB!",
      ],
      aPLRules: [
        v => !!v || 'File diperlukan',
        v => (v && v.size < 200000) || "Berkas harus kurang dari 200 KB!",
      ],  
      namaRules: [(v) => !!v || "Nama Skema Harus Diisi"],
      tujuanRules: [
        (v) => !!v || "Nama Skema Harus Diisi",
        (v) =>
          (v && v.length <= 100) ||
          "Tujuan harus kurang dari sama dengan 100 karakter",
      ],
      deskripsiRules: [(v) => !!v || "Nama Skema Harus Diisi"],
      token: "",
      snackbar: "",
      error_message: "",
      tunnel: "",
      dialog: false,
      headers: [
        { text: "Nama Sertifikasi", value: "nama" },
        { text: "Tujuan Assesmen", value: "tujuan" },
        //{ text: "Berkas Online", value: "actionsBerkasOnline" },
        //{ text: "Berkas APL-02", value: "berkas_apl02_lihat" },
        //{ text: "Berkas Detail Skema", value: "detail_skema_lihat" },
        { text: "Actions", value: "actions" },
      ],
      sertifikasi: [],
      editedIndex: -1,
      editedItem: {
        id: "",
        nama: "",
        deskripsi: "",
        detail_skema: null,
        berkas_skema: null,
        berkas_apl02: null,
        tujuan: "",
      },
      defaultItem: {
        id: "",
        nama: "",
        deskripsi: "",
        detail_skema: null,
        berkas_skema: null,
        berkas_apl02: null,
        tujuan: "",
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
        .get(`${this.tunnel}skema`)
        .then((response) => {
          this.sertifikasi = response.data.data.SkemaSertifikasi.map((item) => {
            return {
              id: item.id,
              nama: item.nama,
              deskripsi: item.deskripsi,
              tujuan: item.tujuan,
            };
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
      confirm("Kamu yakin mau menghapus sertifikasi ini?") &&
        axios
          .delete(`${this.tunnel}skema/` + item.id, {
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
      if (this.editedIndex > -1) {
        const formdata = new FormData();
          formdata.append("nama", item.nama);
          formdata.append("tujuan", item.tujuan);
          formdata.append("deskripsi", item.deskripsi);
          if(item.berkas_skema!=null){
          formdata.append("berkas_skema", item.berkas_skema);
          }
          
          if(item.detail_skema!=null){
          formdata.append("detail_skema", item.detail_skema);
          }
          if(item.berkas_apl02!=null){
          formdata.append("berkas_apl02", item.berkas_apl02);
          }
          formdata.append("_method", "PUT");
          this.error_message = "Mohon tunggu! sedang dalam proses update";
          this.snackbar = true;
          axios
            .post(`${this.tunnel}skema/`+item.id, formdata, {
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
      } else {
        this.$refs.form.validate(item);
          if (this.valid==true) {
          const formdata = new FormData();
          formdata.append("nama", item.nama);
          formdata.append("tujuan", item.tujuan);
          formdata.append("deskripsi", item.deskripsi);
          formdata.append("detail_skema", item.detail_skema);
          formdata.append("berkas_skema", item.berkas_skema);
          formdata.append("berkas_apl02", item.berkas_apl02);
          this.error_message = "Mohon tunggu! sedang dalam proses tambah skema";
          this.snackbar = true;
          axios
            .post(`${this.tunnel}skema`, formdata, {
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
