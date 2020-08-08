<template>
    <v-app id="Dasboard Admin">
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
          <v-btn text href="/dasboard-admin">
            Beranda
          </v-btn>
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
          <v-btn text href="/kelola-berita">
            Kelola Berita
          </v-btn>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-main>
        <div>
        <h1 class="center"><br>Dasboard Admin</h1>
        <v-row>
            <v-col>
                <v-card
                class="mx-auto"
                outlined
                tile
                width="200px"
                >
            <v-card-title>
                Jumlah Peserta
            </v-card-title>
            <v-card-text>
                2
            </v-card-text>
          </v-card>
            </v-col>
            <v-col>
               <v-card
                class="mx-auto justify-center"
                outlined
                tile
                width="200px"
                >
            <v-card-title>
                Jumlah Lunas
            </v-card-title>
            <v-card-text class="justify-center">
                1
            </v-card-text>
          </v-card>
            </v-col>
        </v-row>
      </div>
    </v-main>
    </v-app>
</template>
<script>
export default {
  data: () => ({
      sertifikasi: [
       { title: 'Kelola Sertifikasi', src: '/kelola-sertifikasi' },
       { title: 'Kelola Pembayaran', src: '/kelola-pembayaran' },
        ],
    }),
}
</script>