import Vue from "vue";
import Vuex from "vuex"; //共用參數的倉庫

Vue.use(Vuex);

export default new Vuex.Store({
  // todo
  state: {
    tableData: [
      {
        id: 1,
        name: "拿鐵歐蕾",
        img: null,
        quantity: 2,
        inventory: null,
        price: 90,
        note: "熱的無糖",
      },
    ],
  },
  //mutations可直接改變狀態
  mutations: {
    setUpdateTableData(state, tableItem) {
      state.tableData = tableItem;
    },
    setPushTableData(state, tableItem) {
      state.tableData.push(tableItem);
    },
  },
  actions: {
    updateTableData(context, tableItem) {
      context.commit("setUpdateTableData", tableItem);
    },
    //新增
    pushTableData(context, tableItem) {
      //提交一個mutation
      context.commit("setPushTableData", tableItem);
    },
    //刪除
    //修改
  },
  modules: {},
  getters: {},
});
