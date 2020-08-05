<template>
    <v-app id="Dasboard Peserta">
    <v-main>
        <v-data-table
            :headers="headers"
            :items="sertifikasi"
            class="elevation-1"
        >
    <template v-slot:top>
      <v-toolbar flat color="white">
          <v-toolbar-title>Hai,{{user}} </v-toolbar-title>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-text-field disabled="true" v-model="editedItem.email" label="Email Peserta"></v-text-field>
                    <v-text-field disabled="true" v-model="editedItem.skemasertifikasi_id" label="Skema Sertifikasi"></v-text-field>
                    <v-text-field disabled="true" v-model="editedItem.tempat" label="Tempat Sertifikasi"></v-text-field>
                    <v-text-field disabled="true" v-model="editedItem.tanggal" label="Tanggal Sertifikasi"></v-text-field>
                    <v-text-field disabled="true" v-model="editedItem.waktu" label="Waktu"></v-text-field>
                    <v-file-input color="#065139" v-model="editedItem.image" chips label="Upload bukti pembayaran"></v-file-input>
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
      <v-btn
        small
        class="mr-2 white--text"
        color="#065139"
        @click="editItem(item)"
        
      >
        UPLOAD
      </v-btn>
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
      user:'',
      token:'',
      snackbar:'',
      error_message:'',
      tunnel:'',
      dialog: false,
      headers: [
        { text: 'Skema Sertifikasi', align: 'start', value: 'skemasertifikasi_id',},
        { text: 'Tempat Sertifikasi', value: 'tempat' },
        { text: 'Tanggal Sertifikasi', value: 'tanggal' },
        { text: 'Bukti Pembayaran', value: 'actions' },
        { text: 'Status', value: 'pivot.status' },
        
      ],
      sertifikasi: [],
      editedIndex: -1,
      editedItem: {
        email:this.user,
        skemasertifikasi_id: '',
        tempat: 0,
        tanggal: 0,
        waktu: 0,
        image:null,
      },
      defaultItem: {
        email:this.user,
        skemasertifikasi_id: '',
        tempat: 0,
        tanggal: 0,
        waktu: 0,
        image:null,
      },
      }
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Upload Bukti Pembayaran'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    mounted () {
      this.loadSertifikasi();
      this.user = this.$store.state.user;
      this.tunnel = this.$store.state.tunnel;
      axios.get(`${this.tunnel}jadwalpeserta/me`,
            { headers: { Authorization: "Bearer " + this.$store.state.token }})
        .then((response) => {
            this.sertifikasi = response.data.jadwal
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
      close () {
        this.dialog = false
      },

      save (item) {
        this.editedItem = Object.assign({}, item)
        const formdata = new FormData();
        formdata.append('jadwal_id',this.editItem.jadwal_id);
        formdata.append('image',this.editItem.image);
        formdata.append('_method','PUT');
        axios.post(`${this.tunnel}updateimage`,formdata,{ headers: { 
              Authorization: "Bearer " + this.$store.state.token }
              })
        .then((response) => {
            this.sertifikasi = response.data.jadwal
        }).catch((error) => {
            this.error_message=error;
            this.snackbar=true;
        })
        this.close()
      },
    },
    
  }
</script>