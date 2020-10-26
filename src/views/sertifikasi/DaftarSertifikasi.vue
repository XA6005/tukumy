<template>
  <v-app id="Daftar Sertifikasi">
    <v-main>
      <h1 style="text-align:center"><br>Daftar Jadwal Sertifikasi</h1>
      <v-container>
      <v-row
      class="justify-center"
      >
        <v-col
          v-for="card in cardSertifikasi"
          :key="card.id"
          :cols="7"
        >
          <v-card>
            <v-card-title class="justify-center">Jadwal Sertifikasi {{card.namaSkema}}</v-card-title>
            <v-card-text id="isi">
              <v-row justify="center" v-if="card.tipe=='Offline'">
                <v-col lg="2">
                  Tempat
                </v-col>
                <v-col md="auto">
                  :
                </v-col>
                <v-col md="2">
                  {{card.tempat}}
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col lg="2">
                  Tanggal
                </v-col>
                <v-col md="auto">
                  :
                </v-col>
                <v-col lg="2">
                  {{card.tanggal}}
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col lg="2">
                  Jam
                </v-col>
                <v-col md="auto">
                  :
                </v-col>
                <v-col lg="2">
                  {{card.jam}}
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col lg="2">
                  Tujuan
                </v-col>
                <v-col md="auto">
                  :
                </v-col>
                <v-col lg="2">
                  {{card.tujuan}}
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col lg="2">
                  Biaya
                </v-col>
                <v-col md="auto">
                  :
                </v-col>
                <v-col lg="2">
                  {{parseInt(card.biaya)}}
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col lg="2">
                  Tipe
                </v-col>
                <v-col md="auto">
                  :
                </v-col>
                <v-col lg="2">
                  {{card.tipe}}
                </v-col>
              </v-row>

            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
              color="#065139"
              class="mr-2 white--text"
              @click="login(card.id)">
              Daftar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    </v-main> 
  </v-app>
</template>

<script>
import axios from 'axios';
export default {
    data () {
      return {
        tunnel:"",
        cardSertifikasi:[],
      }
    },
    methods:{
      login(id){
        localStorage.setItem('sertifikasi', id)
        if(this.$store.getters.isLoggedInPeserta){
          const formdata = new FormData();
            formdata.append("jadwal_id", id);
            axios
              .post(`${this.tunnel}jadwalpeserta`, formdata, {
                headers: {
                  Authorization: "Bearer " + this.$store.state.token,
                },
              })
              .then((response) => {
                this.error_message = response.data.message;
                this.snackbar = true;
                localStorage.removeItem('sertifikasi');
                this.$router.push({
                  name: "form-daftar",

                });
              })
              .catch((error) => {
                this.error_message = error;
                this.snackbar = true;
              });
      }else{
        this.$router.push({
                  name: "login-peserta",

                });
      }
      }
    },
    mounted () {
    this.tunnel = this.$store.state.tunnel;
    axios
    .get(this.tunnel+'jadwal',{
      headers:{
      }
    })
      .then((response) => {
        this.cardSertifikasi = response.data.jadwal.map((item) => {
            return {
              id: item.id,
              tempat: item.tempat,
              tanggal:item.tanggal,
              jam : item.jam,
              tipe: item.tipe,
              biaya: item.biaya,
              tujuan : item.tujuanasessmen,
              skema_id: item.skema_id,
              namaSkema:item.skema.nama
            };
          });
      }) 
  },
  }
</script>