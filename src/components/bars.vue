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
      <v-btn text>
        masuk atau daftar
      </v-btn>
      <template v-slot:extension >
          <v-btn href="/" text dark>Beranda</v-btn>
            <v-btn-text>
              <div>
              <v-overflow-btn
              dark
              height="15"
              background-color="#065139"
                :items="dropdown_profil"
                label="Profil"
              ></v-overflow-btn>
            </div>
            </v-btn-text>
          
          <v-btn-text>
              <div>
              <v-overflow-btn
              dark
              height="15"
              background-color="#065139"
                :items="dropdown_sertifikasi"
                label="Sertifikasi"
              ></v-overflow-btn>
            </div>
            </v-btn-text>
          <v-btn href="/berita" text dark>Berita</v-btn>
      </template>
    </v-app-bar>
    </div>
</template>


<script>
export default {
  name: 'bars',
  data: () => ({
      dropdown_profil: ['Visi Misi', 'Struktur Organisasi', 'SOP'],
      dropdown_sertifikasi:['Skema', 'Daftar Sertifikasi'],
      
    }),
}
</script>

<style>
#bars{
  font-family: Roboto, sans-serif;
}
</style>