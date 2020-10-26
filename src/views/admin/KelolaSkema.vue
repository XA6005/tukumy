<template>
  <v-app id="Kelola Skema">
    <v-main>
      <div class="container mt-5">
        <v-data-table :headers="headers" :items="skema" class="elevation-1">
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
                        </div>
                         <div v-else>
                        <v-file-input
                          accept=".pdf"
                          show-size
                          v-model="editedItem.detail_skema"
                          label="Berkas Panduan Skema"
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
      namaRules: [(v) => !!v || "Nama Skema Harus Diisi"],
      deskripsiRules: [(v) => !!v || "Nama Skema Harus Diisi"],
      token: "",
      snackbar: "",
      error_message: "",
      tunnel: "",
      dialog: false,
      headers: [
        { text: "Nama Sertifikasi", value: "nama" },
        { text: "Deskripsi", value: "deskripsi" },
        { text: "Actions", value: "actions" },
      ],
      skema: [],
      editedIndex: -1,
      editedItem: {
        id: "",
        nama: "",
        deskripsi: "",
        detail_skema: null,
      },
      defaultItem: {
        id: "",
        nama: "",
        deskripsi: "",
        detail_skema: null,
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
      this.loadSkema();
      this.tunnel = this.$store.state.tunnel;
      } else {
      this.$router.push("login-admin");
    } 
  },

  methods: {
    loadSkema() {
      this.skema = [];
      this.tunnel = this.$store.state.tunnel;
      axios
        .get(`${this.tunnel}skema`)
        .then((response) => {
          this.skema = response.data.skema.map((item) => {
            return {
              id: item.Id_Skema,
              nama: item.NamaSkema,
              deskripsi: item.Deskripsi,
            };
          });
        })
        .catch((error) => {
          this.error_message = error;
          if (error.response.status === 401) {
            this.error_message = "Login Lagi";
            this.snackbar = true;
          }
          this.snackbar = true;
        });
    },

    editItem(item) {
      this.editedIndex = this.skema.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      confirm("Kamu yakin mau menghapus skema ini?") &&
        axios
          .delete(`${this.tunnel}skema/` + item.id, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
            },
          })
          .then((response) => {
            this.error_message = response.data.message;
            this.snackbar = true;
            this.loadSkema();
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
          formdata.append("NamaSkema", item.nama);
          formdata.append("Deskripsi", item.deskripsi);
          if(item.detail_skema!=null){
          formdata.append("Detail_Skema", item.detail_skema);
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
            this.loadSkema();
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
          formdata.append("NamaSkema", item.nama);
          formdata.append("Deskripsi", item.deskripsi);
          formdata.append("Detail_Skema", item.detail_skema);
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
              this.loadSkema();
              this.close();
            })
            .catch((error) => {
            this.error_message = error;
            this.snackbar = true;
            if (error.response.status === 401) {
            this.error_message = "Login Lagi";
            this.snackbar = true;
            this.$store.dispatch('logout')
          }
            });
        }
    }
    },
  },
};
</script>
