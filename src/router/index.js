import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Berita from '../views/Berita.vue'
import Skema from '../views/sertifikasi/Skema.vue' 
import DaftarSertifikasi from '../views/sertifikasi/DaftarSertifikasi.vue'
import SOP from '../views/profil/SOP.vue'
import StrukturOrganisasi from '../views/profil/StrukturOrganisasi.vue'
import VisiMisi from '../views/profil/VisiMisi.vue'
import LoginPeserta from '../views/peserta/LoginPeserta.vue' 
import DaftarPeserta from '../views/peserta/DaftarPeserta.vue' 
import LoginAdmin from '../views/admin/LoginAdmin.vue' 
import DasboardPeserta from '../views/peserta/DasboardPeserta.vue'
import DasboardAdmin from '../views/admin/DasboardAdmin.vue'
import KelolaSertifikasi from '../views/admin/KelolaSertifikasi.vue'
import KelolaBerita from '../views/admin/KelolaBerita.vue'
import KelolaPembayaran from '../views/admin/KelolaPembayaran.vue'



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
  {
    path: '/login-peserta',
    name: 'Login Peserta',
    component: LoginPeserta
  },
  {
    path: '/daftar-peserta',
    name: 'daftar Peserta',
    component: DaftarPeserta
  },
  {
    path: '/dasboard-peserta',
    name: 'dasboard Peserta',
    component: DasboardPeserta
  },
  {
    path: '/login-admin',
    name: 'Login Admin',
    component: LoginAdmin
  },
  {
    path: '/dasboard-admin',
    name: 'dasboard Admin',
    component: DasboardAdmin
  },
  {
    path: '/kelola-sertifikasi',
    name: 'kelola sertifikasi',
    component: KelolaSertifikasi
  },
  {
    path: '/kelola-berita',
    name: 'kelola berita',
    component: KelolaBerita
  },
  {
    path: '/kelola-pembayaran',
    name: 'kelola pembayaran',
    component: KelolaPembayaran
  },
]

const router = new VueRouter({
  mode:'history',
  base: process.env.BASE_URL,
  routes
})

export default router