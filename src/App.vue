<template>
  <div id="app">
    <router-view/>
    <pesertabars v-if="this.$store.state.token!=null"></pesertabars>
    <bars v-else ></bars>
    
    <footbar/>
  </div>
</template>

<script>
import footbar from './components/footer.vue'
import bars from './components/bars.vue'
import pesertabars from './components/barsPeserta.vue'
export default {
  components: {
    footbar,
    bars,
    pesertabars
  },
}
</script>