<template>
  <div>
    <!-- <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="訂單編號" align="center" width="180">
      </el-table-column>
      <el-table-column prop="name" label="商品名稱" align="center" width="180">
      </el-table-column>
      <el-table-column
        prop="quantity"
        label="商品數量"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="price"
        label="商品價格"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="note"
        label="訂單備註"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="inventory"
        label="庫存量"
        align="center"
      ></el-table-column>
    </el-table> -->
    <el-form
      :model="ruleForm.domains"
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
          v-model="ruleForm.domains.name"
          placeholder="請輸入商品名稱"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品數量:" prop="quantity">
        <el-input
          v-model="ruleForm.domains.quantity"
          placeholder="請輸入商品數量"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品價格:" prop="price">
        <el-input
          v-model="ruleForm.domains.price"
          placeholder="請輸入商品價格"
        ></el-input>
      </el-form-item>

      <el-form-item label="訂單備註:" prop="note">
        <el-input type="textarea" v-model="ruleForm.domains.note"></el-input>
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
      // tableData: [
      //   {
      //     id: 0,
      //     name: "咖啡拿鐵",
      //     price: "90",
      //     quantity: "2",
      //     note: "",
      //   },
      // ],
      ruleForm: {
        domains: [
          {
            id: 0,
            name: "",
            price: null,
            quantity: null,
            note: "",
          },
        ],
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
    id: function id() {
      // const format = "";
      // let rowIndex = 0;
      return this.tableData.length;
    },
  },
  methods: {
    //todo 把表單新增到頁面上，並加上修改按鈕
    newItem() {
      if (
        this.ruleForm.domains.name &&
        this.ruleForm.domains.price &&
        this.ruleForm.domains.quantity !== null
      ) {
        this.tableData.push({
          id: this.tableData.length,
          name: this.ruleForm.domains.name,
          price: this.ruleForm.domains.price,
          quantity: this.ruleForm.domains.quantity,
          note: this.ruleForm.domains.note,
        });
      } else {
        return;
      }
    },

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
