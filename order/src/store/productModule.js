export default {
  namespaced: true,
  state: {
    productData: [],
  },
  //mutations可直接改變狀態(state)
  mutations: {
    //新增 c
    setPushProductData(state, productItem) {
      state.productData = productItem;
    },
    //讀取 R
    setRenderProductData(state, productItem) {
      state.productData = productItem;
    },
    //編輯 Ｕ
    //刪除 D
  },
  //actions不會跟state裡的內容有牽扯
  actions: {
    //新增 C
    pushProductData(context, productItem) {
      context.commit("setPushProductData", productItem);
    },

    //讀取 R
    renderProductData(context, productData) {
      context.commit("setRenderProductData", productData);
    },
    //修改 U
    //刪除 D
  },
  //getters可想成資料加工，類似於computed
  getters: {},
};
