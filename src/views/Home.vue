<template>
  <v-app id="home">
    <v-main>
      <!-- carousel start !-->
      <v-carousel
    cycle
    height="600"
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
      :src="slide.src"
    >
    </v-carousel-item>
  </v-carousel>
  <!-- carousel end !-->
  <br><br><br><br>
      <!-- card berita start !-->
    <v-container>
      <v-row>
        <v-col
          v-for="(item, index) in cardberita"
          :key="index"
          :cols="4"
        >
          <v-card height="450">
            <v-img
              :src="tunnel+'berita-image/'+item.image"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="300px">
            </v-img>
            <v-card-title class="justify-center" v-text="item.judul"></v-card-title>
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
  export default {
    data () {
      return {
        tunnel :'',
        cardberita: [],
        slides: [
          {
            src:'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          },
          {
            src:'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          },
        ],
      }
    },
    mounted () {
    this.tunnel = this.$store.state.tunnel;
    axios
    .get(`${this.tunnel}berita`,{
      headers:{
      }
    })
      .then((response) => {
        this.cardberita = response.data.data.berita
      }) 
  },
  }

  
</script>