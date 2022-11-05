<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      size="mini"
    >
      <el-form-item label="訂單編號:" prop="id">
        <el-input v-model="id" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="商品名稱:" prop="name">
        <el-input
          v-model="ruleForm.name"
          placeholder="請輸入商品名稱"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品數量:" prop="quantity">
        <el-input
          v-model="ruleForm.quantity"
          placeholder="請輸入商品數量"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品價格:" prop="price">
        <el-input
          v-model="ruleForm.price"
          placeholder="請輸入商品價格"
        ></el-input>
      </el-form-item>

      <el-form-item label="訂單備註:" prop="note">
        <el-input type="textarea" v-model="ruleForm.note"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="newItem">新增</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        id: 0,
        name: "",
        img: null,
        quantity: null,
        price: null,
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
        quantity: [
          {
            required: true,
            pattern: /^\d+$/g,
            message: "請輸入數字(需正數)",
            trigger: "blur",
          },
        ],
        price: [
          {
            required: true,
            pattern: /^\d+$/g,
            message: "請輸入數字(需正數)",
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
    id() {
      // const format = "";
      // let rowIndex = 0;
      // return (rowIndex += 1);
      return this.$store.state.tableData.length + 1;
    },
  },
  methods: {
    newItem() {
      this.ruleForm.id = this.id;
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch("updateTableData", this.ruleForm).then(() => {
            this.ruleForm = {
              id: 0,
              name: "",
              img: null,
              quantity: null,
              price: null,
              note: "",
            };
          });
        } else {
          alert("請確實填寫正確!");
          // return false;
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
<style src="../../../public/reset.css"></style>
