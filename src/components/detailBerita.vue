<template>
  <v-app id="detail berita">
    <v-main>
      <div class="container mt-5"
      >
        <h1 style="text-align:center" class="center"><br>{{detailberita.judul}}</h1>
        <br><br>
        <v-img
            :src="this.tunnel+'berita-image/'+detailberita.image"
            contain
            height="600px"
            >
            </v-img>
            <div style="text-align: justify">
              <br><br><br><br>
          <span v-html="detailberita.isi"></span>
          <br>
          </div>
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
    this.$store.dispatch('logout')
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