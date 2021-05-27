<template>
  <v-app id="Kelola Asesor">
    <v-main>
      <div class="container mt-5">
        <v-data-table :headers="headers" :items="asesor" class="elevation-1">
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Kelola Asesor</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="800px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="#065139"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >Tambah Asesor</v-btn>
                </template>
                <v-card>
                  <v-form ref="form" v-model="valid" lazy-validation>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field
                          :rules="nama_asesorRules"
                          required
                          v-model="editedItem.nama_asesor"
                          label="Nama Lengkap Asesor"
                        ></v-text-field>
                        <v-select
                          required
                          :rules="skemaRules"
                          :items="skema"
                          v-model="editedItem.ruangLingkup"
                          label="Skema Sertifikasi"
                        ></v-select>
                        <v-file-input
                          required
                          v-if="formTitle=='Tambah Asesor'"
                          accept="image/*"
                          :rules="imageRules"
                          show-size
                          color="#065139"
                          v-model="editedItem.image"
                          label="Upload photo Asesor"
                        ></v-file-input>
                        <v-file-input
                          v-else
                          accept="image/*"
                          show-size
                          color="#065139"
                          v-model="editedItem.image"
                          label="Upload Photo Asesor"
                        ></v-file-input>
                      </v-form>
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
      nama_asesorRules: [(v) => !!v || "Nama Skema Harus Diisi"],
      skemaRules: [(v) => !!v || "Skema harus dipilih"],
      imageRules: [
      v => !!v || 'File diperlukan',
      v => (v && v.size < 500000) || "Gambar harus kurang dari 500 KB!"],
      token: "",
      snackbar: "",
      error_message: "",
      tunnel: "",
      dialog: false,
      headers: [
        { text: "Nama Asessor", value: "nama_asesor" },
        { text: "Ruang Lingkup Sertifikasi", value: "ruangLingkup" },
        { text: "Actions", value: "actions" },
      ],
      asesor: [],
      skemaid: [],
      skema: [],
      editedIndex: -1,
      editedItem: {
        id: "",
        nama_asesor: "",
        ruangLingkup: "",
        image:null,
      },
      defaultItem: {
        id: "",
        nama_asesor: "",
        ruangLingkup: "",
        image:null,
      },
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Tambah Asesor" : "Ubah Asesor";
    },
  },

  watch: {
    dialog(val) { 
      val || this.close();
    },
  },

  mounted() {
    if (this.$store.getters.isLoggedInAdmin) {
      this.tunnel = this.$store.state.tunnel;
      this.loadSertifikasi();
     } else {
      this.$router.push("login-admin");
    }  
  },

  methods: {
    loadSertifikasi() {
      this.asesor = [];
      this.tunnel = this.$store.state.tunnel;
      axios
        .get(`${this.tunnel}skema`)
        .then((response) => {
          this.skemaid = response.data.skema.map((item) => {
            return {
              id: item.id_skema,
              nama: item.nama_skema,
            };
          });
          this.skema = response.data.skema.map((item) => {
            return item.nama_skema;
          });
        })
        .catch((error) => {
          this.error_message = error;
          this.snackbar = true;
        });
      axios
        .get(`${this.tunnel}asesor`)
        .then((response) => {
          const asesorSem = response.data.asesor.map((item) => {
            return {
              detail : item,
              skema_id :item.skema_id,
              nama: this.skemaid.find(({ id }) => id === item.skema_id)
            };
          });
          this.asesor = asesorSem.map((item) => {
            return {
              id: item.detail.id_asesor,
              nama_asesor: item.detail.nama_asesor,
              ruangLingkup: item.nama.nama,
            };
          });
        })
        .catch((error) => {
          this.error_message = error;
          this.snackbar = true;
        });
    },

    editItem(item) {
      this.editedIndex = this.asesor.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      confirm("Kamu yakin mau menghapus asesor ini?") &&
        axios
          .delete(`${this.tunnel}asesor/` + item.id, {
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
      var skid = this.skemaid.find( ({ nama }) => nama === item.ruangLingkup );
      if (this.editedIndex > -1) {
        const formdata = new FormData();
          formdata.append("nama_asesor", item.nama_asesor);
          formdata.append("skema_id", skid.id);
          if (item.image!=null) {
          formdata.append("photo", item.image);
        }
          formdata.append("_method", "PUT");
          this.error_message = "Mohon tunggu! sedang dalam proses update ";
          this.snackbar = true;
          axios
            .post(`${this.tunnel}asesor/`+item.id, formdata, {
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
          formdata.append("photo", item.image);
          formdata.append("nama_asesor", item.nama_asesor);
          formdata.append("skema_id", skid.id);
          this.error_message = "Mohon tunggu! sedang dalam proses tambah asesor";
          this.snackbar = true;
          axios
            .post(`${this.tunnel}asesor`, formdata, {
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
