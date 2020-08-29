import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Berita from '../views/berita/Berita.vue'
import DetailBerita from '@/components/detailBerita.vue'
import Skema from '../views/sertifikasi/Skema.vue'
import Asesor from '../views/sertifikasi/Asesor.vue'
import DaftarSertifikasi from '../views/sertifikasi/DaftarSertifikasi.vue'
import SOP from '../views/profil/SOP.vue'
import StrukturOrganisasi from '../views/profil/StrukturOrganisasi.vue'
import VisiMisi from '../views/profil/VisiMisi.vue'
import LoginPeserta from '../views/peserta/LoginPeserta.vue'
import DaftarPeserta from '../views/peserta/DaftarPeserta.vue'
import LoginAdmin from '../views/admin/LoginAdmin.vue'
import DasboardPeserta from '../views/peserta/DasboardPeserta.vue'
import KelolaSertifikasi from '../views/admin/KelolaSertifikasi.vue'
import KelolaSkema from '../views/admin/KelolaSkema.vue'
import KelolaAsesor from '../views/admin/KelolaAsesor.vue'
import KelolaBerita from '../views/admin/KelolaBerita.vue'
import KelolaPeserta from '../views/admin/KelolaPeserta.vue'
import FormDaftar from '../views/sertifikasi/FormDaftar.vue'
import notFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Beranda',
    component: Home
  },
  {
    path: '*',
    name: 'notFound',
    component: notFound
  },
  {
    path: '/berita',
    name: 'Berita',
    component: Berita
  },
  {
    path: '/detail-berita/:slug',
    name: 'detail-berita',
    component: DetailBerita
  },
  {
    path: '/skema',
    name: 'Skema',
    component: Skema
  },
  {
    path: '/asesor',
    name: 'Asesor',
    component: Asesor
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
    name: 'login-peserta',
    component: LoginPeserta
  },
  {
    path: '/daftar-peserta',
    name: 'daftar Peserta',
    component: DaftarPeserta
  },
  {
    path: '/dasboard-peserta',
    name: 'dasboard-peserta',
    component: DasboardPeserta,
    
  },
  {
    path: '/login-admin',
    name: 'Login Admin',
    component: LoginAdmin
  },
  {
    path: '/kelola-sertifikasi',
    name: 'kelola sertifikasi',
    component: KelolaSertifikasi
  },
  {
    path: '/kelola-skema',
    name: 'kelola skema',
    component: KelolaSkema
  },
  {
    path: '/kelola-asesor',
    name: 'kelola asesor',
    component: KelolaAsesor
  },
  {
    path: '/kelola-berita',
    name: 'kelola berita',
    component: KelolaBerita
  },
  {
    path: '/kelola-peserta',
    name: 'kelola peserta',
    component: KelolaPeserta
  },
  {
    path: '/form-daftar',
    name: 'form-daftar',
    component: FormDaftar
  },

]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});


/* router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login-peserta')
  } else {
    next()
  }
}) */

export default router