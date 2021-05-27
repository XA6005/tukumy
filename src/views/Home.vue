<template>
  <v-app id="home">
    <v-main>
      <karousel />
  <br><br><br><br>
      <!-- card berita start !-->
    <v-container>
      <v-row class="justify-center">
        <v-col
          v-for="(item, index) in cardberita"
          :key="index"
          :cols="4"
        > 
          <v-card height="450" class="justify-center">
            <v-img
              :src="tunnelGambar+'berita-image/'+item.image"
              height="300px">
            </v-img>
            <v-card-title class="justify-center">{{item.judul}}</v-card-title>
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
  <br><br><br><br>
  <!-- card berita end !-->

    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';
import karousel from '@/components/karousel.vue';
  export default {
    components:{
      karousel
    },
    data () {
      return {
        tunnel :'',
        tunnelGambar:'',
        cardberita: [],
        slides: [
          { src: require('@/assets/banner-tuk-1.png'),},
          { src: require('@/assets/banner-tuk-2.png'),},
        ],
      }
    },
    mounted () {
    this.$store.dispatch('logoutAdmin');
    this.$store.dispatch('logoutPeserta');
    this.tunnel = this.$store.state.tunnel;
    this.tunnelGambar = this.$store.state.tunnelGambar;
    axios
    .get(`${this.tunnel}berita`,{
      headers:{
      }
    })
      .then((response) => {
        this.cardberita = response.data.berita
      }) 
  },
  }

  
</script>