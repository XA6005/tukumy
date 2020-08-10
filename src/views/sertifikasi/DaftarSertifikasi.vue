<template>
  <v-app id="Daftar Sertifikasi">
    <v-main>
      <h1 style="text-align:center"><br>Daftar Sertifikasi</h1>
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
            <v-card-title class="justify-center">Jadwal Sertifikasi {{card.skemasertifikasi_id}}</v-card-title>
            <v-card-text style="text-align:center">
              <p>
              </p>
              Tempat = {{card.tempat}}<br>
              Tanggal= {{card.tanggal}}<br>
              jam = {{card.jam}}<br>
              biaya = {{card.biaya}}<br>
              tujuan = {{card.tujuanasessmen}}<br>

            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
              color="#065139"
              text
              :to="{ name: 'login-daftar', params: { id: card.id } }" >
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
    mounted () {
    this.$store.dispatch('logout')
    this.tunnel = this.$store.state.tunnel;
    axios
    .get(this.tunnel+'jadwal',{
      headers:{
      }
    })
      .then((response) => {
        this.cardSertifikasi = response.data.data.jadwal
      }) 
  },
  }

</script>