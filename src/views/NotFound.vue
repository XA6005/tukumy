<template>
  <v-app id="secure">
    <v-main>
      <div style="text-align:center" class="container mt-5">
        <h1>Halaman yang anda cari tidak Ada</h1>
      </div>
    </v-main> 
  </v-app>
</template>

<script>
export default {
  mounted(){
    this.$store.dispatch('logoutAdmin')
    this.$store.dispatch('logoutPeserta')
  }
}
</script>
