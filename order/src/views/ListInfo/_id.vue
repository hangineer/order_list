<template lang="pug">
div
  el-form(:model="targetItem" 
  :rules="rules" ref="targetItem" label-width="100px" size="mini")
    el-form-item(label="訂單編號:" prop="id")
      el-input(v-model="targetItem.id" :disabled="true")

    el-form-item(label="商品名稱:") {{product.name}}
      //- el-input( v-model="targetItem.name"
      //-     placeholder="請輸入商品名稱")
         
    el-form-item(label="購買數量:" prop="quantity")
      el-input(v-model="targetItem.quantity")
    el-form-item(label="商品價格:" readonly)
        el-input(v-model="targetItem.price")  
    el-form-item(label="訂單備註:" prop="note")
      el-input(v-model="targetItem.note" type="textarea")   
    el-form-item
      template(slot-scope="scope")
        el-button( size="mini"
              @click="saveBtn(scope.$index, scope.row)"
              type="success"
              icon="el-icon-check") 儲存
        el-button(size="mini"
              @click="cancelBtn"
              type="danger"
              icon="el-icon-close") 取消
  //-       </template>
  //-     </el-form-item>
  //-   </el-form>
  //- </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      productData: [],
      targetItem: {
        // id: 0,
        // name: "",
        // img: null,
        // quantity: null,
        // price: null,
        // note: "",
      },

      rules: {
        quantity: [
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
      let _this = this;
      this.$refs.targetItem.validate((valid) => {
        if (valid) {
          axios
            .patch(
              `http://localhost:3000/orders/${parseInt(this.$route.params.id)}`,
              _this.targetItem
            )
            .then(function (response) {
              _this.$router.push("/");
            })
            .catch(function (error) {
              console.log(error);
              throw error;
            });

          // this.$store.dispatch("updateTableData", this.targetItem)
          // .then(() => {
          //   this.$router.push("/"); //修改完按下儲存後，將導回根目錄
          // });
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
  created() {
    let _this = this;
    axios
      .get("http://localhost:3000/products")
      .then(function (response) {
        _this.productData = response.data;
      })
      .catch(function (error) {
        console.log(error);
        throw error;
      });
    axios
      .get(`http://localhost:3000/orders/${parseInt(this.$route.params.id)}`)
      .then(function (response) {
        _this.targetItem = response.data;
      })
      .catch(function (error) {
        console.log(error);
        throw error;
      });

    //todo axios get
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
