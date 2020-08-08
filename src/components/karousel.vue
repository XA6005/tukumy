<template>
      <!-- carousel start !-->
      <v-carousel
    cycle
    height="600"
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
      :src="slide.src"
    >
    </v-carousel-item>
  </v-carousel>
  <!-- carousel end !-->
</template>

<script>
  export default {
      name:'karousel',
    data () {
      return {
        slides: [
          { src: require('@/assets/banner-tuk-1.png'),},
          { src: require('@/assets/banner-tuk-2.png'),},
        ],
      }
    },
  }

  
</script>