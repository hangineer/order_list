import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  // todo
  state: {
    tableData: [
      // {
      //   id: 1,
      //   name: "咖啡拿鐵",
      //   img: null,
      //   quantity: 2,
      //   inventory: null,
      //   price: 90,
      //   note: "",
      // },
    ],
  },
  mutations: {
    setTableData(state, tableItem) {
      state.tableData.push(tableItem);
    },
  },
  actions: {
    updateTableData(context, tableItem) {
      context.commit("setTableData", tableItem);
    },
  },
  modules: {},
  getters: {},
});
