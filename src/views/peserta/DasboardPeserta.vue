<template>
    <v-app id="Dasboard Peserta">
    <v-main>
      <div class="container mt-5">
        <v-data-table
            :headers="headers"
            :items="sertifikasi"
            class="elevation-1"
        >
    <template v-slot:top>
      <v-toolbar flat color="white">
          <v-toolbar-title>Selamat Datang di Dasboard Peserta </v-toolbar-title>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Upload Bukti Pembayaran</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-text-field disabled="true" v-model="editedItem.email" label="Email Peserta"></v-text-field>
                    <v-text-field disabled="true" v-model="editedItem.skemasertifikasi_id" label="Skema Sertifikasi"></v-text-field>
                    <v-text-field disabled="true" v-model="editedItem.tempat" label="Tempat Sertifikasi"></v-text-field>
                    <v-text-field disabled="true" v-model="editedItem.tanggal" label="Tanggal Sertifikasi"></v-text-field>
                    <v-text-field disabled="true" v-model="editedItem.jam" label="Waktu"></v-text-field>
                    <v-file-input color="#065139" v-model="editedItem.image" chips label="Upload bukti pembayaran"></v-file-input>
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
    <template v-slot:item.actions ="{ item }">
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
      </div>
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
        { text: 'Status', value: 'status' },
        
      ],
      sertifikasi: [],
      editedItem: {
        email:this.user,
        skemasertifikasi_id: '',
        jadwal_id:'',
        tempat: 0,
        tanggal: 0,
        jam: 0,
        image:'',
      },
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },


    mounted () {
      this.token = this.$store.state.token;
      this.user = this.$store.state.user;
      this.tunnel = this.$store.state.tunnel;
      axios.get(`${this.tunnel}jadwalpeserta/me`,
            { headers: { Authorization: "Bearer " + this.$store.state.token }})
        .then((response) => {
            this.sertifikasi = response.data.jadwal.map((item)=>{
              return{
                id:item.id,
                tempat:item.tempat,
                tanggal:item.tanggal,
                jam:item.jam,
                biaya:item.biaya,
                skemasertifikasi_id:item.skemasertifikasi_id,
                image:item.pivot.image,
                status:item.pivot.status,
                jadwal_id:item.pivot.jadwal_id
              }
            })
        }).catch((error) => {
            this.error_message=error;
            this.snackbar=true;

        })
    },

    methods: {

      editItem (item) {
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      close () {
        this.dialog = false
      },

      save (item) {
        const formdata = new FormData();
        formdata.append('jadwal_id',item.jadwal_id);
        formdata.append('image',item.image);
        formdata.append('_method','PUT');
        axios.post(`${this.tunnel}updateimage`,formdata,{ headers: { 
              Authorization: "Bearer " + this.$store.state.token }
              })
        .then((response) => {
            this.error_message=response.data.message;
            this.snackbar=true;
        }).catch((error) => {
            this.error_message=error;
            this.snackbar=true;
        })
        this.close()
      },
    },
    
  }
</script>