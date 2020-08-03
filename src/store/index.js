import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
        tunnel:'https://d183b7562455.ngrok.io/',
        isLogin: false,
        token:null,
        user:null,
  },
  mutations: {
      resetState (state) {
      state.tunnel='https://d183b7562455.ngrok.io/';
      state.isLogin=false;
      state.token=null;
      state.user=null;
  }
  },
  actions: {
    clearState ({ commit }) {
      commit('resetState');
  },
  },
  modules: {
  }
})
