<template>
    <v-app id="Dasboard Peserta">
    <v-main>
        <v-data-table
            :headers="headers"
            :items="sertfikasi"
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
                <v-text-field disabled="true" v-model="editedItem.nama" label="Nama Peserta"></v-text-field>
                    <v-text-field disabled="true" v-model="editedItem.name" label="Skema Sertifikasi"></v-text-field>
                    <v-text-field disabled="true" v-model="editedItem.tempat" label="Tempat Sertifikasi"></v-text-field>
                    <v-text-field disabled="true" v-model="editedItem.tanggal" label="Tanggal Sertifikasi"></v-text-field>
                    <v-text-field disabled="true" v-model="editedItem.waktu" label="Waktu"></v-text-field>
                    <v-file-input color="#065139" chips label="Upload bukti pembayaran"></v-file-input>
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
    </v-main>
    </v-app>
</template>

<script>
import axios from 'axios';
  export default {
    data: () => ({
      user:'',
      tunnel:'',
      dialog: false,
      headers: [
        { text: 'Skema Sertifikasi', align: 'start', sortable: false, value: 'name',},
        { text: 'Tempat Sertifikasi', value: 'tempat' },
        { text: 'Tanggal Sertifikasi', value: 'tanggal' },
        { text: 'Status', value: 'status' },
        { text: 'Bukti Pembayaran', value: 'actions', sortable: false },
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
    }),

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
    },

    methods: {
      loadSertifikasi () {
        this.sertfikasi = []
        axios.get(`${this.tunnel}jadwalpeserta`,
            { headers: { Authorization: "Bearer " + this.$store.state.token }})
        .then((response) => {
            this.items = response.data.data.jadwal
        }).catch((error) => {
            console.log(error)
        })
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