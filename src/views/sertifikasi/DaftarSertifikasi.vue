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
              href="/login-daftar" >
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
        cardSertifikasi:[],
      }
    },
    mounted () {
    axios
    .get('https://ef0ec7d2686a.ngrok.io/jadwal',{
      headers:{
      }
    })
      .then((response) => {
        this.cardSertifikasi = response.data.data.jadwal
      }) 
  },
  }

</script>