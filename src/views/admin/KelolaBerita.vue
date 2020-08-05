<template>
    <v-app id="Kelola Berita">
    <v-main>
        <v-data-table
    :headers="headers"
    :items="berita"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Kelola Berita</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >Tambah Berita</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                 
                    <v-text-field v-model="editedItem.judul" label="Judul Berita"></v-text-field>
                    <v-textarea v-model="editedItem.isi" label="Isi"></v-textarea>
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
    data: () => ({
      tunnel:'',
      snackbar:'',
      error_message:'',
      dialog: false,
      headers: [
        { text: 'Judul Berita',  value: 'judul', align: 'start',},
        { text: 'Tanggal Terbit', value: 'tanggal' },
        { text: 'Actions', value: 'actions' },
      ],
      berita: [],
      editedIndex: -1,
      editedItem: {
        judul: '',
        isi: '',
        tanggal: '',
        
      },
      defaultItem: {
        judul: '',
        isi: '',
        tanggal: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    mounted () {
      this.loadBerita();
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
      loadBerita () {
        this.berita = []
      },

      editItem (item) {
        this.editedIndex = this.berita.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.berita.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.berita.splice(index, 1)
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
          Object.assign(this.berita[this.editedIndex], this.editedItem)
        } else {
          this.berita.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>
