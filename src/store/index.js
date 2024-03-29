import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tunnel: 'https://f1ea3bb5b8a2.ngrok.io/api/',
    tunnelGambar: 'https://f1ea3bb5b8a2.ngrok.io/',
    status: localStorage.getItem('status') || '',
    sertifikasi: localStorage.getItem('sertifikasi') || '',
    bootcamp: localStorage.getItem('bootcamp') || '',
    admin: localStorage.getItem('admin') || '',
    peserta: localStorage.getItem('peserta') || '',
    token: localStorage.getItem('token') || '',
    user: {}
  },
  modules: {},
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success_peserta(state, token, user) {
      state.status = 'success'
      state.token = token
      state.peserta = token
      state.user = user
    },
    auth_success_admin(state, token, user) {
      state.status = 'success'
      state.token = token
      state.admin = token
      state.user = user
    },
    auth_error(state) {
      state.status = 'Akun email dan password yang anda masukkan tidak ada di dalam database'
    },
    logout(state) {
      state.status = 'logout'
      state.sertifikasi = ''
      state.bootcamp = ''
      state.token = ''
      state.admin = ''
      state.peserta = ''
    },

  },
  actions: {
    login({
      commit
    }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({
            url: this.state.tunnel + 'peserta/login',
            data: user,
            method: 'POST',

          })
          .then(response => {
            const token = response.data.token
            localStorage.setItem('token', token)
            localStorage.setItem('peserta', token)
            // Add the following line:
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success_peserta', token, user)
            resolve(response)
          })
          .catch(err => {
            commit('auth_error')  
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    loginAdmin({
      commit
    }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({
            url: this.state.tunnel + 'admin/login',
            data: user,
            method: 'POST'
          })
          .then(response => {
            const token = response.data.token
            localStorage.setItem('token', token)
            localStorage.setItem('admin', token)
            // Add the following line:
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success_admin', token, user)
            resolve(response)
          })
          .catch(err => {
            commit('auth_error',err.response.status)
            if (err.response.status === 401) {
              localStorage.setItem('status', "Email atau password salah")
            }
            localStorage.removeItem('token')
            localStorage.removeItem('admin')
            reject(err)
          })
      })
    },
    register({
      commit
    }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({
            url: this.state.tunnel + 'peserta/register',
            data: user,
            method: 'POST'
          })
          .then(resp => {
            const token = resp.data.token
            localStorage.setItem('token', token)
            localStorage.setItem('peserta', token)
            // Add the following line:
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success_peserta', token, user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.setItem('status', err)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logoutAdmin({
      commit
    }) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({
            url: this.state.tunnel + 'admin/logout',
            method: 'post',
            headers:{
              Authorization: "Bearer " + this.state.token,
            }
          })
          .then(response => {
            commit('logout')
            localStorage.removeItem('token')
            localStorage.removeItem('admin')
            delete axios.defaults.headers.common['Authorization']
            resolve(response)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            localStorage.removeItem('admin')
            delete axios.defaults.headers.common['Authorization']
            reject(err)
          })
      })
    },
    logoutPeserta({
      commit
    }) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({
            url: this.state.tunnel + 'peserta/logout',
            method: 'post',
            headers:{
              Authorization: "Bearer " + this.state.token,
            }
          })
          .then(response => {
            commit('logout')
            localStorage.removeItem('token')
            localStorage.removeItem('peserta')
            delete axios.defaults.headers.common['Authorization']
            resolve(response)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            localStorage.removeItem('peserta')
            delete axios.defaults.headers.common['Authorization']
            reject(err)
          })
      })
    },
    logout({
      commit
    }) {
      return new Promise((resolve) => {
            commit('logout')
            localStorage.removeItem('token')
            localStorage.removeItem('admin')
            localStorage.removeItem('peserta')
            delete axios.defaults.headers.common['Authorization']
            resolve()
      })
    },
  },
  getters: {
    isLoggedInPeserta: state => !!state.peserta,
    isPesertaPick: state => !!state.sertifikasi,
    isLoggedInAdmin: state => !!state.admin,
    authStatus: state => state.status,
  }
})