<template>
    <div id="footer">
        <!--Footer start!-->
    <v-footer
    dark
    padless
  >
    <v-card
      class="flex text-center"
      flat
      tile
      dark
      color="#065139"
    >
    <v-card-title>
        <div class="subheading">
          <v-card-title >Kantor</v-card-title>
        <v-card-text>
          Muhammadiyah Yogyakarta
          <br>Tamantirto,Kec. Kasihan, Bantul
          <br>Daerah Istimewa Yogyakarta 55184
          <br>
        </v-card-text>
        </div>
        <v-spacer></v-spacer>
      <div class="flex subheading">
          <v-card-title class="justify-center">Kontak</v-card-title>
        <v-card-text>
          <br>(0274)123 456
        </v-card-text>
        </div>
        </v-card-title>

      <v-card-text id="copyrights">
        {{ new Date().getFullYear() }} — <strong>TUK Prodi Teknologi Informasi UMY</strong>
      </v-card-text>
    </v-card>
  </v-footer>
  <!--Footer end!-->
</div>
</template>


<script>
export default {
  name: 'footbar'
}
</script>

<style>
#footer{
  font-family: Roboto, sans-serif;
}
#copyrights{
  text-align: center;
}
</style>