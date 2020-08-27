<template>
  <v-app id="Kelola Asesor">
    <v-main>
      <div class="container mt-5">
        <h1 style="text-align:center">
          <br />Daftar Asesor
        </h1>
        <v-container>
          <v-row class="justify-center">
            <v-col v-for="(item, index) in asesor" :key="index" :cols="5">
              <v-card height="650">
                <v-img :src="tunnel+'photo-asesor/'+item.image" height="500px"></v-img>
                <v-card-title style="text-align:center" class="justify-center" v-text="item.namaLengkap"></v-card-title>
                <v-card-text style="text-align:center" class="justify-center" >Ruang Lingkup skema : {{item.ruangLingkup}}</v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      valid: true,
      token: "",
      snackbar: "",
      error_message: "",
      tunnel: "",
      dialog: false,
      headers: [
        { text: "Nama Asessor", value: "namaLengkap" },
        { text: "Ruang Lingkup Sertifikasi", value: "ruangLingkup" },
      ],
      asesor: [],
    };
  },

  mounted() {
    this.tunnel = this.$store.state.tunnel;
    axios
      .get(`${this.tunnel}asesor`)
      .then((response) => {
        this.asesor = response.data.data.asesor.map((item) => {
          return {
            id: item.id,
            namaLengkap: item.namaLengkap,
            image:item.photo,
            ruangLingkup: item.skema_sertifikasi.nama,
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
