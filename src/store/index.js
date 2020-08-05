import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
        tunnel:'https://6a2dcd39aa8c.ngrok.io/',
        isLogin: false,
        token:'https://6a2dcd39aa8c.ngrok.io/',
        user:null,
  },
  mutations: {
      resetState (state) {
      state.tunnel='https://6a2dcd39aa8c.ngrok.io/';
      state.isLogin=false;
      state.token='https://6a2dcd39aa8c.ngrok.io/';
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
