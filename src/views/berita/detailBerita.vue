<template>
  <v-app id="detail berita">
    <v-main>
      <div class="container mt-5"
      >
        <h1 class="center"><br>{{detailberita.judul}}</h1>
        <v-img
            :src="this.tunnel+'berita-image/'+detailberita.image"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
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
        tunnel:"",
        detailberita : [],
      }
    },
    mounted () {
    this.tunnel = this.$store.state.tunnel;
    axios
    .get(this.tunnel+'berita/'+ this.slug,{
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