<template lang="pug">
.container
  a(@click='centerDialogVisible = true')
    img.joinBtn(src='../assets/image/pressBtn.png' alt='press button')
  el-dialog(:visible.sync='centerDialogVisible' :close-on-click-modal='false' width='30%' center="")
    span.dialog-footer(slot='footer')
      el-tabs(v-model='activeName' type='card')
        // 登入
        el-tab-pane(label='登入' name='first')
          el-form(label-position='left' :model='loginForm' status-icon='' :rules='rules' ref='loginForm' label-width='100px')
            el-form-item(label='電子郵件' prop='loginEmail')
              el-input(type='email' v-model='loginForm.loginEmail' autocomplete='off')
            el-form-item(label='密碼' prop='loginPassword')
              el-input( type='password' v-model='loginForm.loginPassword' autocomplete='off')
            el-button( type='primary'  @click="dialogVisible = true") 登入
            el-button( @click="resetLoginForm") 重置
              el-dialog(
              :append-to-body='true'
              :visible.sync="dialogVisible" 
              :close-on-click-modal="false"
              width="30%" center)
                span 確定登入嗎?
                span.dialog-footers#loginFooter(slot="footer")
                  el-button(@click="dialogVisible = false") 取消
                  el-button(type="primary" @click="dialogVisible = false ;submitLoginForm()" plan) 確定
        // 註冊
        el-tab-pane(label='註冊' name='second')
          el-form(label-position='left' :model='signupForm' status-icon='' :rules='rules' ref='signupForm' label-width='100px')
            el-form-item(label='電子郵件' prop='signupEmail')
              el-input(type='email' v-model='signupForm.signupEmail'  autocomplete='on')
            el-form-item(label='暱稱' prop='signupName')
              el-input(type='text' v-model='signupForm.signupName'  autocomplete='on')
            el-form-item(label='密碼' prop='signupPassword')
              el-input(type='password' v-model='signupForm.signupPassword' autocomplete='off')
            el-form-item(label='確認密碼' prop='checkPassword')
              el-input(type='password' v-model='signupForm.checkPassword' autocomplete='off')
            el-form-item(label='選擇身份' prop='role')
              el-radio.role(v-model='signupForm.role' label='user') 買家
              el-radio.role(v-model='signupForm.role' label='admin') 管理者
            el-button(type='primary'  @click="signupDialogVisible = true") 註冊
            el-button(@click='resetSignupForm') 重置
              el-dialog(
                :append-to-body='true'
                :visible.sync="signupDialogVisible" 
                :close-on-click-modal="false"
                width="30%" center)
                  span 確定註冊嗎?
                  span.dialog-footers#signUpFooter(slot="footer")
                    el-button(@click="signupDialogVisible = false") 取消
                    el-button(type="primary" @click="signupDialogVisible = false ;submitSignupForm()" plan) 確定
  img.fingerPoint(src='../assets/image/btn_joinHand.gif' alt='finger point')

</template>
<script>
import { Base64 } from "js-base64";

export default {
  data() {
    // 密碼檢查
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("請輸入密碼"));
      } else {
        if (this.signupForm.checkPassword !== "") {
          this.$refs.signupForm.validateField("checkPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("請再次輸入密碼"));
      } else if (value !== this.signupForm.signupPassword) {
        callback(new Error("密碼輸入不一致!"));
      } else {
        callback();
      }
    };
    return {
      //登入的彈出視窗
      dialogVisible: false,
      //註冊的彈出視窗
      signupDialogVisible: false,
      //預設要顯示哪個tab
      activeName: "first",
      //JoinBtn的彈出視窗
      centerDialogVisible: false,
      loginForm: {
        loginEmail: "",
        loginPassword: "",
      },
      signupForm: {
        signupEmail: "",
        signupName: "",
        signupPassword: "",
        checkPassword: "",
        role: "user",
      },
      rules: {
        signupPassword: [
          {
            required: true,
            pattern: /^[A-Za-z\d]{6,}$/g,
            validator: validatePass,
            message: "密碼至少為六位數",
            trigger: "blur",
          },
        ],
        signupEmail: [
          {
            required: true,
            pattern:
              /^\w+((\-\w+)|(\.\w+))*\@[A-Za-z\d]+((\.|\-)[A-Za-z\d]+)*\.[A-Za-z]+$/g,
            message: "須包含英文字母及＠符號",
            trigger: "blur",
          },
        ],
        signupName: [
          {
            // \u4e00-\u9fa5 指中文範圍
            required: true,
            pattern: /^[\u4e00-\u9fa5]{2,6}$|^[a-zA-z]{2,}$/g,
            message: "暱稱需兩個字以上",
            trigger: "blur",
          },
        ],

        checkPassword: [
          {
            required: true,
            pattern: /^[A-Za-z\d]{6,}$/g,
            validator: validatePass2,
            trigger: "blur",
          },
        ],
        loginEmail: [
          {
            required: true,
            pattern:
              /^\w+((\-\w+)|(\.\w+))*\@[A-Za-z\d]+((\.|\-)[A-Za-z\d]+)*\.[A-Za-z]+$/g,
            message: "須包含英文字母及＠符號",
            trigger: "blur",
          },
        ],
        loginPassword: [
          {
            required: true,
            pattern: /^[A-Za-z\d]{6,}$/g,
            message: "密碼至少為六位數",
            trigger: "blur",
          },
        ],

        role: [
          {
            required: true,
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getData();
  },
  computed: {
    userData() {
      return this.$store.state.adminModule.userData;
    },
  },
  methods: {
    getData() {
      this.$store.dispatch("adminModule/getUserData");
      // let _this = this;
      // axios
      //   .get("http://localhost:3000/users")
      //   .then(function (response) {
      //     _this.userData = response.data;
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //     throw error;
      //   });
    },
    submitSignupForm() {
      this.$refs.signupForm.validate((valid) => {
        if (valid) {
          let this2 = this;
          const userInfo = {
            email: this2.signupForm.signupEmail,
            signupName: this2.signupForm.signupName,
            password: Base64.encode(this2.signupForm.signupPassword),
            role: this2.signupForm.role,
          };
          // 判斷是否有重複的email
          this2.getData();
          let noDuplicateEmail = this2.userData.every((item) => {
            if (item.email == this2.signupForm.signupEmail) {
              this2.$notify.error({
                title: "錯誤",
                duration: 1500,
                message: "此電子郵件已被註冊",
              });
            } else {
              return true;
            }
          });
          if (noDuplicateEmail) {
            this.$store.dispatch("adminModule/signupUserData", userInfo);
            this2.$notify({
              message: "註冊成功，請先登入",
              type: "success",
            });
            // 清空表單;
            this2.signupForm = {
              signupEmail: "",
              signupName: "",
              signupPassword: "",
              checkPassword: "",
              role: "user",
            };
            this2.activeName = "first";
            // axios
            //   .post("http://localhost:3000/users", userInfo)
            //   .then(function (response) {
            //     this2.$notify({
            //       message: "註冊成功，請先登入",
            //       type: "success",
            //     });
            //     // 清空表單;
            //     this2.signupForm = {
            //       signupEmail: "",
            //       signupPassword: "",
            //       checkPassword: "",
            //       role: "user",
            //     };
            //     this2.activeName = "first";
            //   })
            //   .catch(function (error) {
            //     console.log(error);
            //     throw error;
            //   });
          }
        }
      });
    },
    resetSignupForm() {
      this.$refs.signupForm.resetFields();
    },
    resetLoginForm() {
      this.$refs.loginForm.resetFields();
    },
    submitLoginForm() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          const findUser = this.userData.find((user) => {
            return user.email === this.loginForm.loginEmail;
          });
          if (!findUser) {
            this.$notify.error({
              title: "錯誤",
              duration: 1500,
              message: "查無此帳號，請先註冊",
            });
            this.loginForm = {
              loginEmail: "",
              loginPassword: "",
            };
            this.activeName = "second";
          } else {
            if (
              Base64.decode(findUser.password) === this.loginForm.loginPassword
            ) {
              this.$notify({
                message: "登入成功!",
                duration: 1500,
                type: "success",
              });

              //名稱  要存的物件
              console.log(findUser);
              sessionStorage.setItem("userData", JSON.stringify(findUser));
              this.$store.commit("adminModule/setIsLogin", true);
              this.$router.push("/list");
            } else {
              this.$notify.error({
                title: "錯誤",
                duration: 1500,
                message: "帳號密碼輸入錯誤!",
              });
            }
          }
        } else {
          this.$notify({
            title: "注意",
            message: "請填寫完整",
            duration: 1500,
            type: "warning",
          });
        }
      });
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
    top: 65%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 550px;
    height: 450px;
    // object-fit: contain;
  }
  .fingerPoint {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .role {
    display: block;
    text-align: left !important;
    margin: 7px 0;
  }
}
</style>
