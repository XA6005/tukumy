<template>
    <v-app id="Kelola Berita">
    <v-main>
        <div class="container mt-5">
          <v-data-table
        :headers="headers"
        :items="berita"
        class="elevation-1" >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Kelola Berita</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" fullscreen >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="#065139"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >Tambah Berita</v-btn>
          </template>
          <v-card>
            <v-toolbar color="#fbc800">
              <v-btn text @click="close">
                <v-icon>mdi-close</v-icon>
                </v-btn>
            <v-toolbar-title>
              <span class="headline">{{ formTitle }}</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>       
              <v-toolbar-items>
                <v-btn text @click="save(editedItem)">Save</v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-card-text>
              <v-container>
                    <v-text-field v-model="editedItem.judul" label="Judul Berita"></v-text-field>
                    <v-textarea auto-grow v-model="editedItem.isi" label="Isi"></v-textarea>
                    <v-file-input color="#065139" v-model="editedItem.image" chips label="Upload Banner Berita"></v-file-input>
              </v-container>
            </v-card-text>
            <v-card-actions>
              
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
    data: () => ({
      token:'',
      tunnel:'',
      snackbar:'',
      error_message:'',
      dialog: false,
      headers: [
        { text: 'Judul Berita',  value: 'judul', align: 'start',},
        { text: 'Actions', value: 'actions' },
      ],
      berita: [],
      editedIndex: -1,
      editedItem: {
        id:'',
        judul: '',
        isi: '',
        image:'',
        tanggal: '',
        
      },
      defaultItem: {
        judul: '',
        isi: '',
        image:'',
        tanggal: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Tambah Berita' : 'Edit Berita'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    mounted () {
      if (this.$store.getters.isLoggedInAdmin) {
      this.loadBerita();
      this.tunnel = this.$store.state.tunnel;
      axios.get(`${this.tunnel}berita`)
        .then((response) => {
            this.berita = response.data.data.berita
        }).catch((error) => {
            this.error_message=error;
            this.snackbar=true;
        })
        }else{
        this.$router.push("login-admin")
      }
    },

    methods: {
      loadBerita () {
        this.berita = []
        this.tunnel = this.$store.state.tunnel;
        axios.get(`${this.tunnel}berita`)
          .then((response) => {
              this.berita = response.data.data.berita
          }).catch((error) => {
              this.error_message=error;
              this.snackbar=true;
          })
      },

      editItem (item) {
        this.editedIndex = this.berita.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        confirm('Kamu yakin akan menghapus berita ini?') && 
        axios.delete(`${this.tunnel}berita/`+item.id,{ headers: { 
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
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save (item) {
        if (this.editedIndex > -1) {
          const formdata = new FormData();
            formdata.append('judul',item.judul);
            formdata.append('isi',item.isi);
            formdata.append('image',item.image);
            formdata.append('_method','PUT');
            axios.post(`${this.tunnel}berita/`+item.id,formdata,{ headers: { 
                  Authorization: "Bearer " + this.$store.state.token ,
                  'Content-Type' : 'multipart/form-data'}
                  })
            .then((response) => {
                this.error_message=response.data.message;
                this.snackbar=true;
                this.loadBerita();
            }).catch((error) => {
                this.error_message=error;
                this.snackbar=true;
            })
        } else {
           const formdata = new FormData();
            formdata.append('judul',item.judul);
            formdata.append('isi',item.isi);
            formdata.append('image',item.image);
            axios.post(`${this.tunnel}berita`,formdata,{ headers: { 
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
        }
        this.close()
      },
    },
  }
</script>
