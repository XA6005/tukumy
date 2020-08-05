<template>
    <v-app id="Kelola Sertifikasi">
    <v-main>
        <v-data-table
    :headers="headers"
    :items="sertifikasi"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Kelola Sertifikasi</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >Tambah Sertifikasi</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.skema" label="Skema Sertifikasi"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.tempat" label="Tempat Sertifikasi"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.tanggal" label="Tanggal Sertifikasi"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.waktu" label="Waktu Sertifikasi"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.tujuan" label="Tujuan"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.assesor" label="Assesor"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
      <v-snackbar v-model="snackbar" >
      {{error_message}}
      </v-snackbar>
    </v-main>
    </v-app>
</template>

<script>
import axios from 'axios';
  export default {
    data(){
      return{
        token:'',
      snackbar:'',
      error_message:'',
      tunnel:'',
      dialog: false,
      headers: [
        { text: 'Skema Sertifikasi', align: 'start', value: 'skema'},
        { text: 'Tanggal Sertifikasi', value: 'tanggal' },
        { text: 'Waktu Sertifikasi', value: 'waktu' },
        { text: 'Tujuan Assesmen', value: 'tujuan' },
        { text: 'Assesor', value: 'assesor' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      sertifikasi: [],
      editedIndex: -1,
      editedItem: {
        skema: '',
        tempat:'',
        tanggal: '',
        waktu: '',
        tujuan: '',
        assesor: '',
      },
      defaultItem: {
        skema: '',
        tanggal: '',
        waktu: '',
        tujuan: '',
        assesor: '',
      },
      }
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
        prop
      },
    },

    mounted () {
      this.loadSertifikasi();
      this.tunnel = this.$store.state.tunnel;
      axios.get(`${this.tunnel}berita`)
        .then((response) => {
            this.berita = response.data.data.berita
        }).catch((error) => {
            this.error_message=error;
            this.snackbar=true;
        })
    },

    methods: {
      loadSertifikasi () {
        this.sertifikasi = []
      },

      editItem (item) {
        this.editedIndex = this.sertifikasi.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.sertifikasi.indexOf(item)
        confirm('Kamu yakin mau menghapus sertifikasi ini?') && this.sertifikasi.splice(index, 1)
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.sertifikasi[this.editedIndex], this.editedItem)
        } else {
          this.sertifikasi.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>
