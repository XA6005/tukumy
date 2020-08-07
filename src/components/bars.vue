<template>
    <div id="bars">
      <v-app-bar
      app
      src="@/assets/appbar-banner.png"
      shrink-on-scroll
      height="30" 
    >
    <v-toolbar-title >Tempat Uji Kompetensi Prodi Teknologi Informasi UMY</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text href="/login-peserta">
        masuk atau daftar
      </v-btn>
      <template v-slot:extension >
          <v-tabs
          dark
          v-model="currentItem"
          fixed-tabs
          slider-color="white"
        >
          <v-btn text href="/">
            Beranda
          </v-btn>
          <v-menu
            v-if="profil.length"
            bottom
            left
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                class="align-self-center mr-4"
                v-bind="attrs"
                v-on="on"
              >
                Profil
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>

            <v-list class="grey lighten-3">
              <v-list-item
                v-for="(item,index) in profil"
                :key="index"
                :href="item.src"
              >
                {{ item.title }}
              </v-list-item>
            </v-list>
          </v-menu>
          <v-menu
            v-if="sertifikasi.length"
            bottom
            left
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                class="align-self-center mr-4"
                v-bind="attrs"
                v-on="on"
              >
                Sertifikasi
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>

            <v-list class="grey lighten-3">
              <v-list-item
                v-for="(item,index) in sertifikasi"
                :key="index"
                :href="item.src"
              >
                {{ item.title }}
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn text href="/berita">
            Berita
          </v-btn>

        </v-tabs>
      </template>

    </v-app-bar>
    </div>
</template>


<script>
export default {
  name: 'bars',
  data: () => ({
      profil: [
        { title: 'Visi Misi', src: '/visi-misi' },
        { title: 'Struktur Organisasi', src: '/struktur-organisasi' },
        { title: 'SOP', src: '/sop' },
        ],
      sertifikasi: [
       { title: 'Skema', src: '/skema' },
       { title: 'Daftar Sertifikasi', src: '/daftar-sertifikasi' },
        ],
    }),
}
</script>

<style>
#bars{
  font-family: Roboto, sans-serif;
}
</style>