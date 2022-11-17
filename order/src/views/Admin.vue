<template>
  <!-- todo 存到session storage -->
  <div class="container">
    <a @click="centerDialogVisible = true"
      ><img
        class="joinBtn"
        src="../assets/image/btn_join.png"
        alt="join button"
    /></a>
    <el-dialog
      :visible.sync="centerDialogVisible"
      :close-on-click-modal="false"
      width="30%"
      center
    >
      <span slot="footer" class="dialog-footer">
        <el-tabs v-model="activeName" type="card">
          <!-- 登入 -->
          <el-tab-pane label="登入" name="first">
            <el-form
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

              <el-button type="primary" @click="submitLoginForm"
                >登入</el-button
              >
              <el-button @click="resetLoginForm('ruleForm')">重置</el-button>
            </el-form>
          </el-tab-pane>
          <!-- 註冊 -->
          <el-tab-pane label="註冊" name="second">
            <el-form
              label-position="left"
              :model="signupForm"
              status-icon
              :rules="rules"
              ref="signupForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="電子郵件" prop="signupEmail">
                <el-input
                  type="email"
                  v-model="signupForm.signupEmail"
                  autocomplete="on"
                ></el-input>
              </el-form-item>
              <el-form-item label="密碼" prop="signupPassword">
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
              <el-form-item label="選擇身份" prop="role">
                <el-radio class="role" v-model="signupForm.role" label="user"
                  >買家</el-radio
                >
                <el-radio class="role" v-model="signupForm.role" label="admin"
                  >管理者</el-radio
                >
              </el-form-item>

              <el-button type="primary" @click="submitSignupForm"
                >註冊</el-button
              >

              <el-button @click="resetSignupForm">重置</el-button>
            </el-form>
          </el-tab-pane>
        </el-tabs>

        <!-- 
        <el-button type="primary"  @click="centerDialogVisible = false"
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
import axios from "axios";
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
      activeName: "first", //預設要顯示哪個tab
      userData: [],
      centerDialogVisible: false, //彈出視窗
      loginForm: {
        loginEmail: "",
        loginPassword: "",
      },
      signupForm: {
        signupEmail: "",
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
        signupEmail: [
          {
            required: true,
            pattern:
              /^\w+((\-\w+)|(\.\w+))*\@[A-Za-z\d]+((\.|\-)[A-Za-z\d]+)*\.[A-Za-z]+$/g,
            message: "須包含英文字母及＠符號",
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
  methods: {
    getData() {
      let _this = this;
      axios
        .get("http://localhost:3000/users")
        .then(function (response) {
          _this.userData = response.data;
          console.log(_this.userData);
        })
        .catch(function (error) {
          console.log(error);
          throw error;
        });
    },
    submitSignupForm() {
      this.$refs.signupForm.validate((valid) => {
        if (valid) {
          let this2 = this;
          const userInfo = {
            email: this2.signupForm.signupEmail,
            password: Base64.encode(this2.signupForm.signupPassword),
            role: this2.signupForm.role,
          };
          // todo 判斷是否有重複的email
          axios
            .post("http://localhost:3000/users", userInfo)
            .then(function (response) {
              alert("註冊成功，請先登入");
              this2.$store.commit("setUserInfo", userInfo);
            })
            .catch(function (error) {
              console.log(error);
              throw error;
            });
          // 清空表單;
          this.signupForm = {
            signupEmail: "",
            signupPassword: "",
            checkPassword: "",
          };
        } else {
          alert("請確實填寫");
        }
      });
    },
    resetSignupForm() {
      this.$refs.signupForm.resetFields();
    },
    submitLoginForm() {
      console.log("userData", this.userData.length);
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          const findUser = this.userData.find((user) => {
            return user.email === this.loginForm.loginEmail;
          });
          if (!findUser) {
            alert("查無此帳號");
          } else {
            if (
              Base64.decode(findUser.password) === this.loginForm.loginPassword
            ) {
              alert("登入成功!");
              //名稱  要存的物件
              console.log(findUser);
              sessionStorage.setItem(userData, JSON.stringify(findUser));
              this.$router.push("/list");
            } else {
              alert("帳號密碼輸入錯誤!");
            }
          }
        } else {
          alert("請確實填寫正確!");
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
  .role {
    // display: flex;
    display: block;
    text-align: left !important;
    margin: 7px 0;
  }
}
</style>
