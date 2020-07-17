<template>
  <v-app id="berita">
    <v-main>
      <h1 style="text-align:center"><br>Berita</h1>
      <v-container>
      <v-row
      class="justify-center"
      >
        <v-col
          v-for="card in cards"
          :key="card.title"
          :cols="8"
        >
          <v-card height="650">
            <v-img
              :src="card.src"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="500px">
            </v-img>
            <v-card-title class="justify-center" v-text="card.title"></v-card-title>
            <v-card-actions class="justify-center">
              <v-btn
              color="#065139"
              text >
              Selengkapnya
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    </v-main> 
  </v-app>
</template>

<script>
export default {
    data () {
      return {
        cards: [
        { title: 'Penundaan Uji Kompetensi Periode Juli 2020', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg' },
        { title: 'Penundaan Uji Kompetensi Periode Juli 2021', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg' },
        { title: 'Penundaan Uji Kompetensi Periode Juli 2022', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg' },
        { title: 'Penundaan Uji Kompetensi Periode Juli 2023', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg' },
      ],
      }
    },
  }

</script>