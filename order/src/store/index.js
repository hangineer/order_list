import Vue from "vue";
import Vuex from "vuex"; //共用參數的倉庫
// import tableData from "./tableData";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    tableData: [
      // {
      //   id: 1,
      //   name: "拿鐵歐蕾",
      //   imgUrl: null,
      //   quantity: 2,
      //   inventory: null,
      //   price: 90,
      //   note: "熱的無糖",
      // },
    ],
  },
  //mutations可直接改變狀態(state)
  mutations: {
    // setUpdateTableData(state, tableItem) {
    //   state.tableData = tableItem;
    // },

    //新增 c
    setPushTableData(state, tableItem) {
      state.tableData.push(tableItem);
    },

    //讀取 R
    setRenderTableData(state, tableItem) {
      state.tableData = tableItem;
    },

    //編輯 Ｕ
    setUpdateTableData(state, targetItem) {
      // let { index, rows } = obj;
      // state.tableData.splice(index, 1, rows);
      // let updateIndex = state.tableData.findIndex(
      //   (item) => item.id === targetItem.id
      // );
      // state.tableData.splice(updateIndex, 1, targetItem);
    },

    //刪除 D
    setRemoveTableData(state, index) {
      state.tableData.splice(index, 1);
    },
  },
  //actions不會跟state裡的內容有牽扯
  actions: {
    // updateTableData(context, tableItem) {
    //   context.commit("setUpdateTableData", tableItem);
    // },

    //新增 C
    pushTableData(context, tableItem) {
      //提交一個mutation
      context.commit("setPushTableData", tableItem);
    },

    //讀取 R
    renderTableData(context, tableData) {
      context.commit("setRenderTableData", tableData);
    },

    //修改 U
    updateTableData(context, obj) {
      context.commit("setUpdateTableData", obj);
    },
    //刪除 D
    removeTableData(context, tableData) {
      context.commit("setRemoveTableData", tableData);
    },
  },
  modules: {
    // tableData,
  },
  //getters可想成資料加工，等同於computed
  getters: {},
});
