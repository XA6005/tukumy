<template>
  <div id="barsAdmin">
    <v-app-bar dark app src="@/assets/appbar-banner.png" height="60">
      <div id="divimg">
        <v-img max-width="120px" max-height="120px" src="@/assets/logo.png"></v-img>
      </div>
      <div id="divbar">
        <v-toolbar-title>Tempat Uji Kompetensi Prodi Teknologi Informasi UMY</v-toolbar-title>
      </div>
      <template v-slot:extension>
        <v-tabs dark v-model="currentItem" fixed-tabs slider-color="white" style="padding-left:130px">
          <v-menu v-if="sertifikasi.length" bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn text class="align-self-center mr-4" v-bind="attrs" v-on="on">
                Sertifikasi
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>

            <v-list class="grey lighten-3">
              <v-list-item
                v-for="(item,index) in sertifikasi"
                :key="index"
                :href="item.src"
              >{{ item.title }}</v-list-item>
            </v-list>
          </v-menu>
          <v-btn text href="/kelola-peserta">Kelola Peserta</v-btn>
          <v-btn text href="/kelola-berita">Kelola Berita</v-btn>
          <v-spacer></v-spacer>
          <v-btn text @click="logout">keluar</v-btn>
        </v-tabs>
      </template>
    </v-app-bar>
  </div>
</template>


<script>
export default {
  name: "barsAdmin",
  data() {
    return {
      sertifikasi: [
        { title: "Kelola Jadwal", src: "/kelola-sertifikasi" },
        { title: "Kelola Skema", src: "/kelola-skema" },
        { title: "Kelola Asesor", src: "/kelola-asesor" },
      ],
    };
  },
  methods: {
    logout: function () {
      this.$store.dispatch("logoutAdmin").then(() => {
        this.$router.push("/");
      });
    },
  },
};
</script>

<style>
#barsAdmin{
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