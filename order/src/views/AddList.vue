<template lang="pug">
div
  //- 欄位名稱註記
  //- product 產品（物件），內含id、名稱、庫存、價格等屬性
  //- quantity:購買數量
  //- total: 訂單總額
  //- inventory: 庫存
  //- note: 訂單備註
  div.relative
   el-button( class="fallback" @click="fallback" icon='el-icon-back' size="small") 返回訂單頁
  el-form(
    :model='ruleForm'
    :rules='rules' 
    ref='ruleForm' 
    label-width='100px' 
    size='mini')
    el-form-item(label='訂單編號:')
      el-input(v-model='id' :disabled='true')
    el-form-item(label='商品名稱:' )
      el-select(v-model="selectedProduct" placeholder="請選擇商品")
        el-option(
          v-for='product in productData'
          :key='product.id' 
          :value="product.id"
          :label="product.name") 
      //- el-radio(
      //-   v-for='product in productData'
      //-   :key='product.id' 
      //-   v-model='selectedProduct' 
      //-   :label="product.id") {{product.name}}
      img( v-model='product.imgUrl' :style="imgSize" :src='product.imgUrl')
    el-form-item( label='購買數量:' prop='quantity')
      el-input(v-model='ruleForm.quantity' placeholder='請輸入購買數量')
      p(class="inventory") 商品庫存:{{ product.inventory }}
    el-form-item(label='商品價格:')
      el-input(class="readonly" v-model='product.price' readonly)
    el-form-item( label='訂單總額:')
      el-input(class="readonly" v-model='total' readonly)   
    el-form-item(label='訂單備註:' prop='note')
      el-input(type='textarea' v-model='ruleForm.note')
    el-form-item
      el-button(class="createItem" type='primary' @click='centerDialogVisible = true' ) 新增
      el-dialog(title='確定新增此筆訂單？' :visible.sync='centerDialogVisible' :modal-append-to-body='false' :close-on-click-modal='false' width='30%' center='')
          span.dialog-footer(slot='footer')
            el-button(@click='centerDialogVisible = false') 取消
            el-button(@click.native.prevent="createItem") 確定
      el-button(@click="resetForm('ruleForm')") 重置
    
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: [],
      productData: [],
      selectedProduct: 1, //select & option element
      imgSize: {
        display: "block",
        width: "200px",
        height: "200px",
        margin: "20px auto",
      },
      centerDialogVisible: false, //新增按鈕的彈出視窗
      ruleForm: {
        // id: 0,
        imgUrl: "",
        quantity: 1, //預設購買數量是1
        note: "",
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
    id() {
      return this.tableData.length + 1;
      // return this.$store.state.tableData.length + 1;
    },
    total() {
      if (this.product) {
        return parseInt(this.product.price) * parseInt(this.ruleForm.quantity);
      } else {
        return 0;
      }
    },
    product() {
      if (this.productData.find((e) => e.id === this.selectedProduct)) {
        return this.productData.find((e) => e.id === this.selectedProduct);
      } else {
        return {
          // id: -1,
          // name: "",
          // imgUrl: null,
          // quantity: 0,
          // price: 0,
          // note: "",
        };
      }
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
      .get("http://localhost:3000/orders")
      .then(function (response) {
        _this.tableData = response.data;
      })
      .catch(function (error) {
        console.log(error);
        throw error;
      });
  },
  methods: {
    //返回列表
    fallback() {
      this.$router.push("/list");
    },
    //新增
    createItem() {
      this.ruleForm.id = this.id;
      this.$refs.ruleForm.validate((valid) => {
        if (valid && this.product.inventory > this.ruleForm.quantity) {
          let _this = this; //在axios不能順利抓到this
          const createData = {
            id: this.ruleForm.id,
            productId: this.product.id,
            productName: this.product.name,
            imgUrl: this.product.imgUrl,
            quantity: parseInt(this.ruleForm.quantity),
            price: parseInt(this.product.price),
            total: this.total,
            note: this.ruleForm.note,
          };
          axios
            .post("http://localhost:3000/orders", createData)
            .then(function (response) {
              console.log("新增成功");
              // let tableItem = response.data;
              _this.$store.dispatch("listModule/pushTableData", createData);

              //修改商品庫存
              this.product.inventory -= parseInt(this.ruleForm.quantity);
              axios
                .patch(
                  `http://localhost:3000/products/${parseInt(this.product.id)}`,
                  this.product
                )
                .then((res) => {
                  console.log("productinfo", res);
                  console.log("庫存修改成功");
                });
            })
            .catch((err) => {
              console.log(err);
              throw error;
            });
          //清空表單
          this.ruleForm = {
            selectedProduct: 1,
            quantity: 1,
            note: "",
          };
          this.$router.push("/list");
        } else if (this.product.inventory < this.ruleForm.quantity) {
          alert("購買數量需小於商品庫存");
        } else {
          alert("請確實填寫正確!");
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.relative {
  // position: absolute;
  width: 100px;
  height: 30px;
  margin-bottom: 10px;
  .fallback {
    padding: 8px;
    text-indent: 0px !important;
    position: relative;
    left: 20px;
    top: 0px;
    box-shadow: 2px 2px 2px darkgray;
  }
}
.readonly {
  opacity: 0.5;
}
.inventory {
  display: flex;
  font-size: 12px;
  color: gray;
  left: 10px;
  top: 25px;
}
</style>
