import axios from "axios";
export default {
  namespaced: true,
  state: {
    tableData: [],
  },
  //mutations可直接改變狀態(state)
  mutations: {
    //新增 c
    setPushTableData(state, tableItem) {
      state.tableData.push(tableItem);
    },

    //讀取 R
    setRenderTableData(state, tableItem) {
      state.tableData = tableItem;
    },

    //編輯 Ｕ
    setUpdateTableData(state, obj) {
      // let { index, rows } = obj;
      // state.tableData.splice(index, 1, rows);
      // let updateIndex = state.tableData.findIndex(
      //   (item) => item.id === targetItem.id
      // );
      // state.tableData.splice(updateIndex, 1, targetItem);
      state.tableData = obj;
    },

    //刪除 D
    setRemoveTableData(state, index) {
      state.tableData.splice(index, 1);
    },
  },
  //actions不會跟state裡的內容有牽扯
  actions: {
    //新增 C
    pushTableData(context, tableItem) {
      //1123新增
      axios
        .post("http://localhost:3000/orders", tableItem)
        .then(function (response) {
          console.log("新增成功");
          //提交一個mutation
          context.commit("setPushTableData", tableItem);
          // axios
          //   .patch(
          //     `http://localhost:3000/products/${parseInt(_this.product.id)}`,
          //     _this.product
          //   )
          //   .then((res) => {
          //     console.log("庫存修改成功");
          //     console.log("目前庫存", _this.product.inventory);
          //   });
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
    },

    //讀取 R 1123新增
    renderTableData(context) {
      // renderTableData(context, tableData) {
      axios
        .get("http://localhost:3000/orders")
        .then(function (response) {
          context.commit("setRenderTableData", response.data);
        })
        .catch(function (error) {
          console.log(error);
          throw error;
        });
    },

    //修改 U
    updateTableData(context, obj) {
      context.commit("setUpdateTableData", obj);
    },
    //刪除 D
    removeTableData(context, deleteIndex) {
      axios
        .delete(`http://localhost:3000/orders/${deleteIndex}`)
        .then(function (response) {
          context.commit("setRemoveTableData", deleteIndex);
          console.log("刪除成功", response);
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
    },
  },
  //getters可想成資料加工，類似於computed
  getters: {
    id(state) {
      return state.tableData[state.tableData.length - 1]?.id + 1;
    },
  },
};
