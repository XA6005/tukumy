import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Berita from '../views/Berita.vue'
import Skema from '../views/Skema.vue'
import DaftarSertifikasi from '../views/DaftarSertifikasi.vue'
import SOP from '../views/SOP.vue'
import StrukturOrganisasi from '../views/StrukturOrganisasi.vue'
import VisiMisi from '../views/VisiMisi.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Beranda',
    component: Home
  },
  {
    path: '/berita',
    name: 'Berita',
    component: Berita
  },
  {
    path: '/skema',
    name: 'Skema',
    component: Skema
  },
  {
    path: '/sop',
    name: 'SOP',
    component: SOP
  },
  {
    path: '/daftar-sertifikasi',
    name: 'Daftar Sertifikasi',
    component: DaftarSertifikasi
  },
  {
    path: '/visi-misi',
    name: 'Visi-Misi',
    component: VisiMisi
  },
  {
    path: '/struktur-organisasi',
    name: 'Struktur Organisasi',
    component: StrukturOrganisasi
  },
]

const router = new VueRouter({
  mode:'history',
  base: process.env.BASE_URL,
  routes
})

export default router
