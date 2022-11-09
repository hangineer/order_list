//todo 可以嘗試用模組的方式引入
export default {
  namespaced: true,
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

  //mutations可直接改變狀態(state)
  mutations: {
    //新增 c
    setPushTableData(state, tableItem) {
      state.tableData.push(tableItem);
    },

    //編輯 Ｕ
    setUpdateTableData(state, obj) {
      let { index, rows } = obj;
      state.tableData.splice(index, 1, rows);
    },
    //刪除 D
    setRemoveTableData(state, index) {
      state.tableData.splice(index, 1);
    },
  },
  //不會跟state裡的內容有牽扯
  actions: {
    //新增 C
    pushTableData(context, tableItem) {
      //提交一個mutation
      context.commit("setPushTableData", tableItem);
    },

    //修改 U
    updateTableData(context, targetItem) {
      context.commit("setUpdateTableData", targetItem);
    },
    //刪除 D
    removeTableData(context, index) {
      context.commit("setRemoveTableData", index);
    },
  },
  getters: {},
};
