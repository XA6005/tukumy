<template>
  <v-app id="skema">
    <v-main>
      <div class="container mt-5">
        <h1 class="center">
          <br />Daftar Skema
          <br />
        </h1>
        <p>
          Berikut daftar skema sertifikasi yang bisa diambil di Tempat Uji Kompetensi prodi Teknologi Informasi UMY.
          <br />
          <br />
        </p>
        <v-row justify="center">
          <v-expansion-panels v-model="panel" popout>
            <v-expansion-panel v-for="card in skema" :key="card.id">
              <v-expansion-panel-header><h4>{{card.nama}}</h4></v-expansion-panel-header>
              <v-expansion-panel-content>
              <v-row >
                <v-col lg="2">
                  Deskripsi Skema
                </v-col>
                <v-col md="auto">
                  :
                </v-col>
                <v-col>
                  {{card.deskripsi}}
                </v-col>
              </v-row>
              <v-row >
                <v-col lg="2">
                  File Panduan 
                </v-col>
                <v-col md="auto">
                  :
                </v-col>
                <v-col>
                  <v-btn class="mr-2 white--text" color="#065139" :href="tunnelGambar+'detail-skema/'+card.detail">
                    Unduh
                  </v-btn>
                </v-col>
              </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tunnel: "",
      tunnelGambar:"",
      skema: [],
      panel:[0],
    };
  },
  mounted() {
    this.$store.dispatch("logout");
    this.tunnel = this.$store.state.tunnel;
    this.tunnelGambar = this.$store.state.tunnelGambar;
    axios
      .get(`${this.tunnel}skema`)
      .then((response) => {
        this.skema = response.data.skema.map((item) => {
          return {
            id: item.id_skema,
            nama: item.nama_skema,
            deskripsi: item.deskripsi,
            detail:item.detail_skema
          };
        });
      })
      .catch((error) => {
        this.error_message = error;
        this.snackbar = true;
      });
  },
};
</script>