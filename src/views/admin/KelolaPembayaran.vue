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
    </v-main>
    </v-app>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Skema Sertifikasi', align: 'start', sortable: false, value: 'name',
        },
        { text: 'Status', value: 'status' },
        { text: 'Action', value: 'actions', sortable: false },
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

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.sertfikasi = [
          {
            nama:"peserta",
            name: 'skema Programmer',
            tempat: "Lab G",
            tanggal: "01-01-2020",
            waktu: "07.00-15.00",
            status: "Lunas",
          },
          {
            nama:"peserta",
            name: 'skema Jaringan',
            tempat: "Lab B",
            tanggal: "01-01-2021",
            waktu: "07.00-15.00",
            status: "Belum Lunas",
          },
          
        ]
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