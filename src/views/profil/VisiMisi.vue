<template>
  <v-app id="visimisi">
    <v-main>
      <div class="container mt-5">
        <h1 class="center"><br>Visi Misi</h1>
      <p>
Visi departemen kami adalah menjadi Program Studi Pemerintah Internasional yang sangat baik yang didasarkan pada nilai-nilai Islam untuk kepentingan masyarakat di tingkat nasional dan internasional pada tahun 2020.
Misi Departemen Pemerintah adalah Melakukan pendidikan Ilmu Pemerintahan pada tingkat sarjana yang unggul dan inovatif.
Melakukan penelitian dan studi Pemerintah yang menggabungkan Ilmu Pemerintahan kontemporer dengan nilai-nilai Islam.
Melaksanakan layanan masyarakat yang relevan dengan keprihatinan dan kebutuhan masyarakat dengan pendekatan Pemerintah kontemporer yang didasarkan pada nilai-nilai Islam.</p>
      </div>
    </v-main> 
  </v-app>
</template>
<script>
export default {
  data:()=>({
    visimisi:[{
      title:'Visi Misi',isi:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat. Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat. Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi. Aenean magna nisl, mollis quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst.'
    }]
  }),
  mounted(){
    this.$store.dispatch('logoutAdmin')
    this.$store.dispatch('logoutPeserta')
  },
}
</script>
