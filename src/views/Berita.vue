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
              :src="item.image"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="500px">
            </v-img>
            <v-card-title style="text-align:center" class="justify-center" v-text="item.judul"></v-card-title>
            <v-card-actions class="justify-center">
              <v-btn
              color="#065139"
              text >
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
        cardberita : [],
      }
    },
    mounted () {
    axios
    .get('https://ef0ec7d2686a.ngrok.io/berita',{
      headers:{
      }
    })
      .then((response) => {
        this.cardberita = response.data.data.berita
      })
      
  },
  }

</script>