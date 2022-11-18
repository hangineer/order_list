// import Vuex from "vuex";
// Vue.use(Vuex);
export default {
  namespaced: true,
  state: {
    isLogin: false,
  },
  mutations: {
    setIsLogin(state, isLogin) {
      state.isLogin = isLogin;
    },
  },
  actions: {},
  getters: {},
};
