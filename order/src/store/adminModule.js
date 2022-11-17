export default {
  namespaced: true,
  state: {
    userInfo: {},
  },
  //mutations可直接改變狀態(state)
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    loginRequest(state, findUser) {
      loginRequest = findUser;
    },
  },
  //actions不會跟state裡的內容有牽扯
  actions: {},
  //getters可想成資料加工，類似於computed
  getters: {},
};
