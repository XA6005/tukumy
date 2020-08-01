<template>
  <v-app id="detail berita">
    <v-main>
      <div class="container mt-5"
      >
        <h1 class="center"><br>{{detailberita.judul}}</h1>
        <v-img
            :src="detailberita.image"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="500px">
            </v-img>
        <p>{{detailberita.isi}}</p>
      </div>
    </v-main> 
  </v-app>
</template>

<script>
import axios from 'axios';
    export default {
      data () {
      return {
        detailberita : [],
      }
    },
    mounted () {
    axios
    .get('https://ef0ec7d2686a.ngrok.io/berita/'+ this.slug,{
      headers:{
      }
    })
      .then((response) => {
        this.detailberita = response.data.data.berita
      }) 
  },
  created() {
      this.slug = this.$route.params.slug;
      },
    }
</script>