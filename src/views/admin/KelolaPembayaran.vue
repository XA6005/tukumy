<template>
    <v-app id="Kelola Pembayaran">
    <v-main>
        <div class="container mt-5">
          <v-data-table
            :headers="headers"
            :items="jadwal"
            class="elevation-1"
        >
    <template v-slot:top>
      <v-toolbar flat color="white">
          <v-toolbar-title>Kelola Pembayaran </v-toolbar-title>
        <v-dialog v-model="dialog" max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Bukti Pembayaran</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-img v-if="editedItem.image!=null" height="500px" :src="tunnel+'bukti-pembayaran/'+editedItem.image"></v-img>
                <v-sheet v-else color="grey" height="500px" >
                  <v-row class="fill-height" align="center" justify="center" >
                  <div>
                    <h1>Tidak Ada Gambar</h1>
                  </div>
                  </v-row>
                </v-sheet>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Close</v-btn>
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
        @click="lihatItem(item)"
        >
        Lihat Bukti
        </v-btn>
        <v-btn
        small
        class="mr-2 white--text"
        color="#065139"
        @click="editItem(item)"
        >
        Ubah Status
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
import qs from 'qs';
  export default {
    data() {
      return{
      token:'',
      snackbar:'',
      error_message:'',
      tunnel:'',
      tunnelgambar:this.tunnel+'bukti-pembayaran/',
      dialog: false,
      headers: [
        {text: 'Id Jdwal',value: 'jadwal_id', align: 'start'},
        {text: 'Email Peserta',value: 'email', align: 'start'},
        { text: 'Status', value: 'status' },
        { text: 'Action', value: 'actions' },
      ],
      jadwal: [],
      editedItem: {
        skemasertifikasi_id:'',
        jadwal_id:'',
        email: '',
        peserta_id:'',
        status:'',
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
      this.loadData();
      this.user = this.$store.state.user;
      this.tunnel = this.$store.state.tunnel;
      axios.get(`${this.tunnel}jadwalpeserta`,
            { headers: { Authorization: "Bearer " + this.$store.state.token }})
        .then((response) => {
          const list = response.data.data.jadwal.map((det)=>{
              return det.peserta
            })
               this.jadwal = [].concat.apply([],list).map((item)=>{
              return{
                jadwal_id:item.pivot.jadwal_id,
                email: item.email,
                peserta_id:item.pivot.peserta_id,
                status:item.pivot.status,
                image:item.pivot.image,
              }
            })    
        }).catch((error) => {
            this.error_message=error;
            this.snackbar=true;
        })
    },


    methods: {
      loadData () {
        this.jadwal = []
        axios.get(`${this.tunnel}jadwalpeserta`,
            { headers: { Authorization: "Bearer " + this.$store.state.token }})
        .then((response) => {
          const list = response.data.data.jadwal.map((det)=>{
              return det.peserta
            })
               this.jadwal = [].concat.apply([],list).map((item)=>{
              return{
                jadwal_id:item.pivot.jadwal_id,
                email: item.email,
                peserta_id:item.pivot.peserta_id,
                status:item.pivot.status,
                image:item.pivot.image,
              }
            })    
        }).catch((error) => {
            this.error_message=error;
            this.snackbar=true;
        })
      },

      lihatItem (item) {
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      editItem (item) {
        var status = ""
        if(item.status == "belum lunas"){
          status = "lunas"
        }else{
          status ="belum lunas"
        }
        const data = qs.stringify({
          'jadwal_id': item.jadwal_id,
          'peserta_id': item.peserta_id,
          'status': status,
        });
        confirm('Kamu yakin akan mengubah status pembayaran peserta ini?') && 
        axios.put(`${this.tunnel}updatestatus`,data,{ headers: { 
                  Authorization: "Bearer " + this.$store.state.token }
                  })
            .then((response) => {
                this.error_message=response.data.message;
                this.snackbar=true;
                this.loadData();
            }).catch((error) => {
                this.error_message=error;
                this.snackbar=true;
            })
      },
      close () {
        this.dialog = false
      },
    },
  }
</script>