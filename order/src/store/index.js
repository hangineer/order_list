import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  // todo
  state: {
    tableData: [
      {
        id: 0,
        img: null,
        name: "咖啡拿鐵",
        price: "90",
        quantity: "2",
        note: "",
      },
    ],
  },
  mutations: {
    setTableData(state, status) {
      state.tableData = status;
    },
  },
  actions: {
    updateTableData(context, status) {
      context.commit("setTableData", status);
    },
  },
  modules: {},
  getters: {},
});
