<template>
  <div id="barsPeserta">
    <v-app-bar dark app src="@/assets/appbar-banner.png" height="60">
      <div id="divimg">
        <v-img max-width="120px" max-height="120px" src="@/assets/logo.png"></v-img>
      </div>
      <div id="divbar">
        <v-toolbar-title>Tempat Uji Kompetensi Prodi Teknologi Informasi UMY</v-toolbar-title>
      </div>
      <template v-slot:extension>
        <v-tabs dark v-model="currentItem" fixed-tabs slider-color="white">
          <v-btn text width="140px" disabled></v-btn>
          <v-btn text href="/dasboard-peserta">Beranda</v-btn>
          <v-spacer></v-spacer>
          <v-btn text @click="logout">keluar</v-btn>
        </v-tabs>
      </template>
    </v-app-bar>
  </div>
</template>


<script>
export default {
  name: "barsPeserta",
  methods: {
    logout: function () {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    },
  },
};
</script>

<style>
#barsPeserta{
  font-family: Roboto, sans-serif;
}
#divbar {
  position: absolute;
  left: 140px;
}
#divimg {
  position: absolute;
  height: 60px;
}
</style>