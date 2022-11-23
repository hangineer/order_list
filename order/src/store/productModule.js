//集中管理 易於維護
import axios from "axios";
export default {
  namespaced: true,
  state: {
    productData: [],
    targetProduct: {},
  },
  //mutations可直接改變狀態(state)
  mutations: {
    //新增 c
    setPushProductData(state, productItem) {
      state.productData.push(productItem);
    },
    //讀取 R
    setRenderProductData(state, response) {
      state.productData = response;
    },
    //讀取目標產品，用於編輯頁
    setTargetProduct(state, response) {
      state.targetProduct = response;
    },
    //編輯 Ｕ
    setUpdateProductData(state, targetProduct) {
      state.targetProduct = targetProduct;
    },
    //刪除 D
    setRemoveProductData(state, index) {
      state.productData.splice(index, 1);
    },
  },
  //actions不會跟state裡的內容有牽扯
  actions: {
    //新增 C
    pushProductData(context, productItem) {
      axios
        .post("http://localhost:3000/products", productItem)
        .then(function (response) {
          console.log(productItem);
          context.commit("setPushProductData", productItem);
          console.log("新增成功");
        })
        .catch(function (error) {
          console.log(error);
          throw error;
        });
    },

    //讀取 R
    renderProductData(context) {
      axios
        .get("http://localhost:3000/products")
        .then(function (response) {
          context.commit("setRenderProductData", response.data);
        })
        .catch(function (error) {
          console.log(error);
          throw error;
        });
    },
    //讀取目標產品，用於編輯頁
    getTargetProduct(context, productID) {
      axios
        .get(`http://localhost:3000/products/${parseInt(productID)}`)
        .then(function (response) {
          // _this.targetProduct = response.data;
          context.commit("setTargetProduct", response.data);
        })
        .catch(function (error) {
          console.log(error);
          throw error;
        });
    },
    //修改 U
    updateProductData(context, targetProduct) {
      axios
        .patch(
          `http://localhost:3000/products/${parseInt(targetProduct.id)}`,
          targetProduct
        )
        .then(function (response) {
          context.commit("setUpdateProductData", response.data);
          console.log("修改成功");
        })
        .catch(function (error) {
          console.log(error);
          throw error;
        });
    },
    //修改產品庫存
    updateProductInventory(context, productInfo) {
      axios
        .patch(
          `http://localhost:3000/products/${parseInt(productInfo.productId)}`,
          {
            inventory: productInfo.inventory,
          }
        )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
          throw error;
        });
    },
    //刪除 D
    removeProductData(context, deleteIndex) {
      axios
        .delete(`http://localhost:3000/products/${deleteIndex}`)
        .then(function (response) {
          context.commit("setRemoveProductData", deleteIndex);
          console.log("刪除成功", response);
        })
        .catch(function (error) {
          console.log(error);
          throw error;
        });
    },
  },
  //getters可想成資料加工，類似於computed
  getters: {
    id(state) {
      return state.productData[state.productData.length - 1]?.id + 1;
    },
  },
};
