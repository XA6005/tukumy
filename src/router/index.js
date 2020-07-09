import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Berita from '../views/Berita.vue'

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
  }
]

const router = new VueRouter({
  mode:'history',
  base: process.env.BASE_URL,
  routes
})

export default router
