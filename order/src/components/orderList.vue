<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    size="mini"
  >
    <!-- todo -->
    <el-form-item label="訂單編號:" prop="id">
      <el-input v-model="id" :disabled="true"> </el-input>
    </el-form-item>

    <el-form-item label="商品名稱:" prop="name">
      <el-input v-model="ruleForm.name" placeholder="請輸入商品名稱"></el-input>
    </el-form-item>
    <el-form-item label=" 商品價格:" prop="price">
      <el-input
        v-model="ruleForm.price"
        placeholder="請輸入商品價格"
      ></el-input>
    </el-form-item>
    <el-form-item label="商品數量:" prop="quantity">
      <el-input
        v-model="ruleForm.quantity"
        placeholder="請輸入商品數量"
      ></el-input>
    </el-form-item>
    <el-form-item label="訂單備註:" prop="note">
      <el-input type="textarea" v-model="ruleForm.note"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">新增</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
// import { itemBus } from "../main";
export default {
  data() {
    return {
      ruleForm: {
        id: "1",
        name: "",
        price: null,
        quantity: null,
        note: "",
      },
      rules: {
        name: [
          { required: true, message: "請輸入商品名稱", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "長度在10字內(不包含0)",
            trigger: "blur",
          },
        ],
        price: [
          {
            type: "integer",
            required: true,
            message: "請輸入整數",
            trigger: "blur",
          },
        ],
        quantity: [
          {
            type: "integer",
            required: true,
            message: "請輸入整數",
            trigger: "blur",
          },
        ],
        note: [
          {
            message: "請寫下備註",
            trigger: "change",
          },
        ],
      },
    };
  },
  computed: {
    id: function id() {
      const format = "#OD";
      let rowIndex = 0;
      return format + (rowIndex += 1);
    },
  },
  methods: {
    //todo
    // submitForm() {
    //   itemBus.addItem(this.id, this.name, this.price, this.quantity, this.note);
    //   this.id = 123;
    //   this.name = "";
    //   this.price = null;
    //   this.quantity = null;
    //   this.note = "";
    // },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped></style>
<style src="../../public/reset.css"></style>
