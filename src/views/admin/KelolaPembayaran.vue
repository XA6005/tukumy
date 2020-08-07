<template>
    <v-app id="Kelola Pembayaran">
    <v-main>
        <div>
          <p>aa{{this.jadwal}}</p>
          <v-data-table
            :headers="headers"
            :items="jadwal"
            class="elevation-1"
        >
    <template v-slot:top>
      <v-toolbar flat color="white">
          <v-toolbar-title>Kelola Pembayaran </v-toolbar-title>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Bukti Pembayaran</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-img
                  src="this.tunnel+'jadwalpeserta-image/'+editedItem.image"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="500px">
                  </v-img>
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
  export default {
    data() {
      return{
      token:'',
      snackbar:'',
      error_message:'',
      tunnel:'',
      dialog: false,
      headers: [
        {text: 'Skema Sertifikasi',value: 'skemasertifikasi_id', align: 'start'},
        {text: 'Email Peserta',value: 'email', align: 'start'},
        { text: 'Status', value: 'status' },
        { text: 'Action', value: 'actions' },
      ],
      jadwal: [],
      editedItem: {
        skemasertifikasi_id:'',
        idJadwal:'',
        email: '',
        peserta:[],
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
            const gabungList =[]
            list.forEach(element => {
              gabungList.push(item)
            });
            
              this.jadwal = gabungList.map((item)=>{
              return{
                skemasertifikasi_id:item[element].id,
                idJadwal:item[element].pivot.jadwal_id,
                email: item[element].email,
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
      },

      lihatItem (item) {
        this.editedIndex = this.sertfikasi.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      editItem (item) {
        if(item.status=='lunas'){
          item.status =='belum lunas'
        }else{
          item.status=='lunas'
        }
        const formdata = new FormData();
        formdata.append('judul',item.jadwal_id);
        formdata.append('isi',item.peserta_id);
        formdata.append('image',item.status); 
        confirm('Kamu yakin akan mengubah status pembayaran peserta ini?') && 
        axios.put(`${this.tunnel}updatestatus`,formdata,{ headers: { 
                  Authorization: "Bearer " + this.$store.state.token }
                  })
            .then((response) => {
                this.error_message=response.data.message;
                this.snackbar=true;
                this.loadBerita();
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