import { apiCollect } from "./myAxios.js";
export default {
  namespaced: true,
  state: {
    tableData: [],
    targetItem: {}, //訂單資訊
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
    //用於讀取編輯頁面的訂單資訊
    setOrderInfo(state, targetItem) {
      state.targetItem = targetItem;
    },
    //編輯 Ｕ
    setUpdateTableData(state, targetItem) {
      state.targetItem = targetItem;
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
      apiCollect
        .post("/orders", tableItem)
        // .post("http://localhost:3000/orders", tableItem)
        .then(function (response) {
          console.log("新增成功");
          //提交一個mutation
          context.commit("setPushTableData", tableItem);
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
    },
    //讀取 R
    renderTableData(context) {
      apiCollect
        .get("/orders")
        // .get("http://localhost:3000/orders")
        .then(function (response) {
          context.commit("setRenderTableData", response.data);
        })
        .catch(function (error) {
          console.log(error);
          throw error;
        });
    },
    //讀取特定訂單資訊
    getOrderById(context, nowId) {
      return (
        apiCollect
          .get(`/orders/${parseInt(nowId)}`)
          // .get(`http://localhost:3000/orders/${parseInt(nowId)}`)
          .then(function (response) {
            context.commit("setOrderInfo", response.data);
          })
          .catch(function (error) {
            console.log(error);
            throw error;
          })
      );
    },
    //修改 U
    // updateTableData(context, obj) {
    //   context.commit("setUpdateTableData", obj);
    // },
    updateTableData(context, targetItem) {
      apiCollect
        .patch(
          `/orders/${targetItem.id}`,
          targetItem //舊Data
        )
        // .patch(
        //   `http://localhost:3000/orders/${targetItem.id}`,
        //   targetItem //舊Data
        // )
        .then(function (response) {
          context.commit("setUpdateTableData", response.data);
          console.log("修改成功");
        })
        .catch(function (error) {
          console.log(error);
          throw error;
        });
      // context.commit("setUpdateTableData", newContent);
    },

    //刪除 D
    removeTableData(context, deleteIndex) {
      apiCollect
        .delete(`/orders/${deleteIndex}`)
        // .delete(`http://localhost:3000/orders/${deleteIndex}`)
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
