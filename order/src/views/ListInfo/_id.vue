<template>
  <!--todo 編輯按鈕按下會導向這裡，此頁是否需要變成一個component -->
  <div>
    <el-form
      :model="targetItem"
      :rules="rules"
      ref="targetItem"
      label-width="100px"
      size="mini"
    >
      <el-form-item label="訂單編號:" prop="id">
        <el-input v-model="targetItem.id" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="商品名稱:" prop="name">
        <el-input placeholder="請輸入商品名稱"></el-input>
      </el-form-item>
      <el-form-item label="商品數量:" prop="quantity">
        <el-input placeholder="請輸入商品數量"></el-input>
      </el-form-item>
      <el-form-item label="商品價格:" prop="price">
        <el-input placeholder="請輸入商品價格"></el-input>
      </el-form-item>

      <el-form-item label="訂單備註:" prop="note">
        <el-input type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="saveBtn(scope.$index, scope.row)"
            type="success"
            icon="el-icon-check"
            >儲存</el-button
          >

          <el-button
            size="mini"
            @click="cancelBtn"
            type="danger"
            icon="el-icon-close"
            >取消</el-button
          >
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      targetItem: {
        // this.$store.state.tableData.id
        id: 0,
        name: "",
        img: null,
        quantity: null,
        price: null,
        note: "",
      },
      // ruleForm: {

      // },
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
  methods: {
    saveBtn(index, rows) {
      let obj = {
        index,
        rows,
      };
      this.$store.dispatch("updateTableData", obj);
    },
    cancelBtn() {
      this.$router.push("/");
    },
  },
  mounted() {
    const nowId = this.$route.params.id;
    this.targetItem = this.$store.state.tableData.find(
      (item) => item.id === nowId
    );
    console.log(this.targetItem);
  },
};
</script>
<style lang="scss" scoped></style>
