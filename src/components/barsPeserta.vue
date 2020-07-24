<template>
    <div id="barsPeserta">
      <v-app-bar
      app
      src="@/assets/appbar-banner.png"
      shrink-on-scroll
      height="30" 
    >
    <v-toolbar-title >Tempat Uji Kompetensi Prodi Teknologi Informasi UMY</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text href="/">
        keluar
      </v-btn>
      <template v-slot:extension >
          <v-tabs
          dark
          v-model="currentItem"
          fixed-tabs
          slider-color="white"
        >
          <v-btn text href="/dasboard-peserta">
            Beranda
          </v-btn>
        </v-tabs>
      </template>

    </v-app-bar>
    </div>
</template>


<script>
export default {
  name: 'barsPeserta',
}
</script>

<style>
#barsPeserta{
  font-family: Roboto, sans-serif;
}
</style>