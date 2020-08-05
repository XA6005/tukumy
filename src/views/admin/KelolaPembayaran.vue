<template>
    <v-app id="Kelola Pembayaran">
    <v-main>
        <v-data-table
            :headers="headers"
            :items="sertfikasi"
            class="elevation-1"
        >
    <template v-slot:item.actions="{ item }">
      <v-btn
        small
        class="mr-2 white--text"
        color="#065139"
        @click="editItem(item)"
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
    data() {
      return{
      token:'',
      snackbar:'',
      error_message:'',
      tunnel:'',
      dialog: false,
      headers: [
        {text: 'Skema Sertifikasi',value: 'name', align: 'start'},
        { text: 'Status', value: 'status' },
        { text: 'Action', value: 'actions' },
      ],
      sertfikasi: [],
      editedIndex: -1,
      editedItem: {
        nama:'',
        name: '',
        tempat: 0,
        tanggal: 0,
        waktu: 0,
      },
      defaultItem: {
        nama:'',
        name: '',
        tempat: 0,
        tanggal: 0,
        waktu: 0,
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
      this.loadData();
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
      loadData () {
        this.sertfikasi = []
      },

      editItem (item) {
        this.editedIndex = this.sertfikasi.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
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
          Object.assign(this.sertfikasi[this.editedIndex], this.editedItem)
        } else {
          this.sertfikasi.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>