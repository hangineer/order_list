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
        <el-input
          v-model="targetItem.name"
          placeholder="請輸入商品名稱"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品數量:" prop="quantity">
        <el-input
          v-model="targetItem.quantity"
          placeholder="請輸入商品數量"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品價格:" prop="price">
        <el-input
          v-model="targetItem.price"
          placeholder="請輸入商品價格"
        ></el-input>
      </el-form-item>

      <el-form-item label="訂單備註:" prop="note">
        <el-input v-model="targetItem.note" type="textarea"></el-input>
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
        // id: 0,
        // name: "",
        // img: null,
        // quantity: null,
        // price: null,
        // note: "",
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
    nowId() {
      return parseInt(this.$route.params.id); //表單抓到的值型態都為字串
      //若沒轉型會有錯誤訊息：Cannot read properties of undefined (reading 'id')
    },
  },
  methods: {
    saveBtn(index, rows) {
      console.log("saveBtn", index, rows); //undefined undefined
      //判斷表格不為空
      this.$refs.targetItem.validate((valid) => {
        if (valid) {
          this.$store.dispatch("updateTableData", this.targetItem).then(() => {
            this.$router.push("/"); //修改完按下儲存後，將導回根目錄
          });
        } else {
          alert("請確實填寫");
        }
      });
      // let obj = {
      //   index,
      //   rows,
      // };
    },
    cancelBtn() {
      this.$router.push("/");
    },
  },
  created: function () {
    this.targetItem = JSON.parse(
      JSON.stringify(
        this.$store.state.tableData.find((item) => item.id === this.nowId)
      )
    );
  },
  // mounted() {

  // },
};
</script>
<style lang="scss" scoped></style>
