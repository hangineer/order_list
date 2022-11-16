<template>
  <div class="container">
    <a @click="centerDialogVisible = true"
      ><img
        class="joinBtn"
        src="../assets/image/btn_join.png"
        alt="join button"
    /></a>
    <!-- <el-button>註冊</el-button> -->
    <!-- <el-button @click="centerDialogVisible = true">登入</el-button> -->
    <!-- @click="loginIn"  -->
    <!-- @click="signUp"  -->
    <el-dialog
      :visible.sync="centerDialogVisible"
      :close-on-click-modal="false"
      width="30%"
      center
    >
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="['tab-button', { active: currentTab === tab }]"
        @click="currentTab = tab"
      >
        {{ tab }}
      </button>
      <span slot="footer" class="dialog-footer">
        <component :is="currentTabComponent"></component>
        <!-- <tab-login v-if="currentTab === 'login'"></tab-login>
        <tab-signup v-if="currentTab === 'signup'"></tab-signup> -->
        <!-- <el-form
          v-if="loginMode"
          label-position="left"
          :model="loginForm"
          status-icon
          :rules="rules"
          ref="loginForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="電子郵件" prop="loginEmail">
            <el-input
              type="email"
              v-model="loginForm.loginEmail"
              autocomplete="on"
            ></el-input>
          </el-form-item>
          <el-form-item label="密碼" prop="loginPassword">
            <el-input
              type="password"
              v-model="loginForm.loginPassword"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-button type="primary" @click="submitForm('loginForm')"
            >登入</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form>

        <el-form
          v-else
          label-position="left"
          :model="signupForm"
          status-icon
          :rules="rules"
          ref="signupForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <h3 class="heading3">註冊</h3>
          <el-form-item label="電子郵件" prop="signUpEmail">
            <el-input
              type="email"
              v-model="signupForm.signupEmail"
              autocomplete="on"
            ></el-input>
          </el-form-item>
          <el-form-item label="密碼" prop="signUpPassword">
            <el-input
              type="password"
              v-model="signupForm.signupPassword"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="確認密碼" prop="checkPassword">
            <el-input
              type="password"
              v-model="signupForm.checkPassword"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-button type="primary" @click="submitForm('signupForm')"
            >註冊</el-button
          >

          <el-button @click="resetForm('signupForm')">重置</el-button>
        </el-form> -->
        <!-- <el-button
          v-if="signUp"
          type="primary"
          @click="centerDialogVisible = false"
          >註冊</el-button
        >
        <el-button type="primary" v-else @click="centerDialogVisible = false"
          >登入</el-button
        > -->
        <!-- <el-button @click="centerDialogVisible = false">取消</el-button> -->
      </span>
    </el-dialog>

    <img
      class="fingerPoint"
      src="../assets/image/btn_joinHand.gif"
      alt="finger point"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabs: ["login", "signup"],
      currentTab: "signup",
      loginMode: true,
      loginForm: {
        loginEmail: "",
        loginPassword: "",
      },
      signupForm: {
        signupEmail: "",
        signupPassword: "",
        checkPassword: "",
      },
      rules: {
        loginEmail: [
          {
            // required: true,
            pattern: /^\d+$/g,
            message: "請輸入數字(需正數)",
            trigger: "blur",
          },
        ],
        loginPassword: [
          {
            // required: true,
            pattern: /^\d+$/g,
            message: "請輸入數字(需正數)",
            trigger: "blur",
          },
        ],
        signupEmail: [{}],
        signupPassword: [{}],
      },

      // signUp: true,
      centerDialogVisible: false,
    };
  },
  computed: {
    currentTabComponent() {
      return `tab-${this.currentTab.toLowerCase()}`;
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  .heading3 {
    margin-bottom: 30px;
  }
  .joinBtn {
    cursor: pointer;
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 180px;
    max-height: 150px;
    // object-fit: contain;
  }
  .fingerPoint {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
