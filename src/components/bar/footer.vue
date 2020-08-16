<template>
  <div id="footer">
    <!--Footer start!-->
    <v-footer dark padless>
      <v-card class="flex text-center" flat tile dark color="#065139">
        <v-card-title>
          <div id="divkantor" class="subheading">
            <v-card-title>Kantor</v-card-title>
            <v-card-text>
              Muhammadiyah Yogyakarta
              <br />Tamantirto,Kec. Kasihan, Bantul
              <br />Daerah Istimewa Yogyakarta 55184
            </v-card-text>
          </div>
          <v-spacer></v-spacer>
          <div class="flex subheading">
            <v-card-title class="justify-center">Kontak</v-card-title>
            <v-card-text class="justify-center">
              (0274)123 456
              <br />
              <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon :href="icon.src">
                <v-icon size="24px">{{ icon.ikon }}</v-icon>
              </v-btn>
            </v-card-text>
          </div>
        </v-card-title>
        <v-card-text id="copyrights">
          {{ new Date().getFullYear() }} —
          <strong>TUK Prodi Teknologi Informasi UMY</strong>
        </v-card-text>
      </v-card>
    </v-footer>
    <!--Footer end!-->
  </div>
</template>


<script>
export default {
  name: "footbar",
  data: () => ({
    icons: [
      { ikon: "mdi-facebook", src: "https://www.facebook.com/" },
      { ikon: "mdi-instagram", src: "https://www.instagram.com/ti.umyogya/" },
    ],
  }),
};
</script>

<style>
#footer {
  font-family: Roboto, sans-serif;
}
#divkantor {
  position: absolute;
  left: 100px;
}
#copyrights {
  text-align: center;
}
</style>