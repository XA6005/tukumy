<template>
  <div id="app">
    <router-view />
    <pesertabars v-if="isLoggedInPeserta"></pesertabars>
    <adminbars v-else-if="isLoggedInAdmin"></adminbars>
    <bars v-else></bars>
    <footbar />
  </div>
</template>

<script>
import footbar from "./components/bar/footer.vue";
import bars from "./components/bar/bars.vue";
import pesertabars from "./components/bar/barsPeserta.vue";
import adminbars from "./components/bar/barsAdmin.vue";
export default {
  components: {
    footbar,
    bars,
    adminbars,
    pesertabars,
  },
  computed: {
    isLoggedInPeserta: function () {
      return this.$store.getters.isLoggedInPeserta;
    },
    isLoggedInAdmin: function () {
      return this.$store.getters.isLoggedInAdmin;
    },
  },
  mounted() {
    /* function handleResponse(response) {
      return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
          if ([401, 403,404].indexOf(response.status) !== -1) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            authenticationService.logout();
            location.reload(true);
          }

          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }

        return data;
      });
    } */
  },
};
</script>