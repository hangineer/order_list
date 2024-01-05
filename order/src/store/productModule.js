//集中管理 易於維護
import { apiCollect } from "./myAxios.js";
export default {
  namespaced: true,
  state: {
    productData: [],
    targetProduct: {},
  },
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
  actions: {
    //新增 C
    pushProductData(context, productItem) {
      apiCollect
        .post("/products", productItem)
        .then(function (response) {
          context.commit("setPushProductData", productItem);
        })
        .catch(function (error) {
          console.log(error);
          throw error;
        });
    },

    //讀取 R
    renderProductData(context) {
      return (
        apiCollect
          .get("/products")
          .then(function (response) {
            context.commit("setRenderProductData", response.data);
          })
          .catch(function (error) {
            console.log(error);
            throw error;
          })
      );
    },
    getProductById(context, id) {
      apiCollect
        .get(`/products/${parseInt(id)}`)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          console.log(error);
          throw error;
        });
    },
    //讀取目標產品，用於編輯頁
    getTargetProduct(context, productID) {
      apiCollect
        .get(`/products/${parseInt(productID)}`)
        .then(function (response) {
          context.commit("setTargetProduct", response.data);
        })
        .catch(function (error) {
          console.log(error);
          throw error;
        });
    },
    //修改 U
    updateProductData(context, targetProduct) {
      apiCollect
        .patch(`/products/${parseInt(targetProduct.id)}`, targetProduct)
        .then(function (response) {
          context.commit("setUpdateProductData", response.data);

        })
        .catch(function (error) {
          console.log(error);
          throw error;
        });
    },
    //修改產品庫存
    updateProductInventory(context, productInfo) {
      apiCollect
        .patch(`/products/${parseInt(productInfo.productId)}`, {
          inventory: productInfo.info.inventory,
        })
        .then(function (response) {
          console.log("庫存修改成功");
        })
        .catch(function (error) {
          console.log(error);
          throw error;
        });
    },
    //刪除 D
    removeProductData(context, deleteIndex) {
      apiCollect
        .delete(`products/${deleteIndex}`)
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
  getters: {
    id(state) {
      return state.productData[state.productData.length - 1]?.id + 1;
    },
  },
};
