<template lang="pug">
div
  div.logoutContainer
    el-button.logout(v-if="showLogout" @click="centerDialogVisible = true") 登出
  el-dialog(
  :visible.sync="centerDialogVisible" 
  :close-on-click-modal="false"
  width="30%" center)
    span 確定要登出嗎?
    span(slot="footer" class="dialog-footer")
      el-button(@click="centerDialogVisible = false") 取消
      el-button#logoutSure(type="primary" @click="centerDialogVisible = false; logout()" plan) 確定
  //- @click='logout' 
</template>
<script>
export default {
  data() {
    return {
      centerDialogVisible: false, //彈出視窗
    };
  },
  methods: {
    logout() {
      this.$notify({
        message: "登出成功",
        type: "success",
      });
      sessionStorage.clear();
      this.$store.commit("adminModule/setIsLogin", false);

      this.$router.push("/");
    },
  },
  computed: {
    showLogout() {
      return this.$store.state.adminModule.isLogin === true;
    },
  },
};
</script>
<style lang="scss" scoped>
div.logoutContainer {
  position: relative;
  .logout {
    position: absolute;
    width: 100px;
    right: 0;
    top: 18px;
    background: inherit;
    border: 0;
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
