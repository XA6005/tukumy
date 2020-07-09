<template>
  <div id="app">
    <router-view/>
    <bars />
    <footbar/>
  </div>
</template>

<script>
import footbar from './components/footer.vue'
import bars from './components/bars.vue'
export default {
  components: {
    footbar,
    bars
  },
}
</script>