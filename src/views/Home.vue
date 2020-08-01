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
    >
      <v-sheet
        :color="colors[i]"
        height="100%"
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <div class="display-3">{{ slide }} Slide</div>
        </v-row>
      </v-sheet>
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
              :src="item.image"
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
        cardberita: [],
        colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        slides: [
          'First',
          'Second',
          'Third',
          'Fourth',
          'Fifth',
        ],
      }
    },
    mounted () {
    axios
    .get(this.tunnel+'berita',{
      headers:{
      }
    })
      .then((response) => {
        this.cardberita = response.data.data.berita
      }) 
  },
  }

  
</script>