import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
        isLogin: false,
        token:null,
        user:null,
  },
  mutations: {
      resetState (state) {
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
