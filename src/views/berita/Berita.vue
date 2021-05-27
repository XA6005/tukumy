<template>
  <v-app id="berita">
    <v-main>
      <div class="container mt-5">
      <h1 style="text-align:center"><br>Berita</h1>
      <v-container>
      <v-row
      class="justify-center"
      >
        <v-col
          v-for="(item, index) in cardberita"
          :key="index"
          :cols="7"
        >
          <v-card height="650">
            <v-img
              :src="tunnelGambar+'berita-image/'+item.image"
              height="500px">
            </v-img>
            <v-card-title style="text-align:center" class="justify-center" v-text="item.judul"></v-card-title>
            <v-card-actions class="justify-center">
              <v-btn
              class="white--text"
              color="#065139"
              :to="{ name: 'detail-berita', params: { slug: item.slug } }">
              Selengkapnya
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
      </div>
    </v-main> 
  </v-app>
</template>

<script>
import axios from 'axios';
export default {
    data () {
      return {
        tunnel:"",
        tunnelGambar:"",
        cardberita : [],
      }
    },
    mounted () {
    this.$store.dispatch('logoutAdmin')
    this.$store.dispatch('logoutPeserta')
    this.tunnel = this.$store.state.tunnel;
    this.tunnelGambar = this.$store.state.tunnelGambar;
    axios
    .get(this.tunnel+'berita',{
      headers:{
      }
    })
      .then((response) => {
        this.cardberita = response.data.berita
      }) 
  },
  }

</script>