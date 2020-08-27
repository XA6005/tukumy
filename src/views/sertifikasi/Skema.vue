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
                  Tujuan Skema
                </v-col>
                <v-col md="auto">
                  :
                </v-col>
                <v-col>
                  {{card.tujuan}}
                </v-col>
              </v-row>
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
                  <v-btn class="mr-2 white--text" color="#065139" :href="tunnel+'detail-skema/'+card.detail">
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
      skema: [],
      panel:[0],
    };
  },
  mounted() {
    this.$store.dispatch("logout");
    this.tunnel = this.$store.state.tunnel;
    axios
      .get(`${this.tunnel}skema`)
      .then((response) => {
        this.skema = response.data.data.SkemaSertifikasi.map((item) => {
          return {
            id: item.id,
            nama: item.nama,
            deskripsi: item.deskripsi,
            tujuan: item.tujuan,
            detail:item.detail_skema,
            asesor:item.asesors.namaLengkap,
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