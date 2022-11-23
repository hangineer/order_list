import Vue from "vue";
import Vuex from "vuex"; //共用參數的倉庫
import listModule from "./listModule";
import productModule from "./productModule";
import adminModule from "./adminModule";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {},

  mutations: {
    //mutations可直接改變狀態(state)
  },

  actions: {
    //actions不會跟state裡的內容有牽扯 (commit)
  },
  modules: {
    listModule,
    productModule,
    adminModule,
  },
  getters: {
    //getters可想成資料加工，類似於computed
  },
  plugins: [
    createPersistedState({
      paths: ["adminModule.isLogin"],
      storage: window.sessionStorage,
    }),
    // createPersistedState({
    //   paths: ["listModule.getters"],
    //   storage: window.sessionStorage,
    // }),
  ],
});
