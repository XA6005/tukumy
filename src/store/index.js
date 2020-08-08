import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
        tunnel:'https://6896534d4f31.ngrok.io/',
        status: '',
        admin : localStorage.getItem('admin') || '',
        peserta : localStorage.getItem('peserta') || '',
        token: localStorage.getItem('token') || '',
        user : {}
  },
  modules: {
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success_peserta(state, token, user){
      state.status = 'success'
      state.token = token
      state.peserta =token
      state.user = user
    },
    auth_success_admin(state, token, user){
      state.status = 'success'
      state.token = token
      state.admin = token
      state.user = user
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
      state.admin = ''
      state.peserta =''
    },
    
  },
  actions: {
    login({commit}, user){
        return new Promise((resolve, reject) => {
            commit('auth_request')
            axios({url: this.state.tunnel+'peserta/login', data: user, method: 'POST' })
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
    loginAdmin({commit}, user){
      return new Promise((resolve, reject) => {
          commit('auth_request')
          axios({url: this.state.tunnel+'/admin/login', data: user, method: 'POST' })
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
              commit('auth_error')
              localStorage.removeItem('token')
              localStorage.removeItem('admin')
              reject(err)
          })
      })
  },
    register({commit}, user){
      return new Promise((resolve, reject) => {
            commit('auth_request')
            axios({url: this.state.tunnel+'peserta/register', data: user, method: 'POST' })
            .then(resp => {
                const token = resp.data.token
                const user = resp.data.user
                localStorage.setItem('token', token)
                // Add the following line:
                axios.defaults.headers.common['Authorization'] = token
                commit('auth_success_peserta', token, user)
                resolve(resp)
            })
            .catch(err => {
                commit('auth_error', err)
                localStorage.removeItem('token')
                reject(err)
            })
        })
    },
    logout({commit}){
      return new Promise((resolve) => {
          commit('logout')
          localStorage.removeItem('token')
          localStorage.removeItem('admin')
          localStorage.removeItem('peserta')
          delete axios.defaults.headers.common['Authorization']
          resolve()
      })
    }
},
getters : {
  isLoggedInPeserta: state => !!state.peserta,
  isLoggedInAdmin: state => !!state.admin,
  authStatus: state => state.status,
}
})
