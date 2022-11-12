<template lang="pug">
div
  //- todo 欄位名稱註解
  //- el-button(@click="fallback") 返回列表
  el-form(
    :model='ruleForm'
    :rules='rules' 
    ref='ruleForm' 
    label-width='100px' 
    size='mini')
    el-form-item(label='訂單編號:')
      el-input(v-model='id' :disabled='true')
    el-form-item(label='商品名稱:' prop='productId')
      el-radio(
        v-for='product in productData'
        :key='product.id' 
        v-model='selectedProduct' 
        :label="product.id") {{product.name}}
      //- el-input(v-model='ruleForm.name' placeholder='請輸入商品名稱')
    
    //- el-form-item(label='商品圖片:' prop='imgUrl')
      //- todo 圖片上傳的不用element ui的元件，那submit form時會遇到問題嗎
      input(type='file' placeholder='請上傳商品圖片'  @change="imgUpload")
      img( v-model='ruleForm.imgUrl'  :src='ruleForm.imgUrl')
      
      
      //- ls="el-input" v-model='ruleForm.imgUrl' v-if='this.imgUrl'
      //- el-upload(:action='url' :on-success='handleAvatarSuccess' :on-preview="handlePreview"
      //- :on-remove="handleRemove" )
      //-   img(v-if='ruleForm.imgUrl' :src='ruleForm.imgUrl')
      //-   el-button(size='mini' type='primary') 點擊上傳
      //-   .el-upload__tip(slot='tip') 只能上傳jpg/png
    el-form-item( label='購買數量:' prop='quantity')
      el-input(v-model='ruleForm.quantity' placeholder='請輸入商品數量')
      p(class="inventory") 商品庫存:{{ product.inventory }}
    el-form-item(label='商品價格:')
      el-input(v-model='product.price',readonly)
    el-form-item(label='訂單總額:')
      el-input(v-model='total' ,readonly)   
    el-form-item(label='訂單備註:' prop='note')
      el-input(type='textarea' v-model='ruleForm.note')
    el-form-item
      el-button(@click='createItem') 新增
      el-button(@click="resetForm('ruleForm')") 重置
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: [],
      productData: [],
      selectedProduct: 1, //radio box
      ruleForm: {
        id: 0,
        imgUrl: "",
        quantity: 1, //預設購買數量是1
        note: "",
      },
      rules: {
        // name: [
        //   { required: true, message: "請輸入商品名稱", trigger: "blur" },
        //   {
        //     min: 1,
        //     max: 10,
        //     message: "長度在10字內(不包含0)",
        //     trigger: "blur",
        //   },
        // ],
        imgUrl: [
          {
            // required: true,
            message: "請上傳圖片",
            trigger: "change",
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
    // imgUpload(e) {
    //   const file = e.target.files.item(0);
    //   const fileReader = new FileReader();
    //   fileReader.addEventListener("load", this.imgUploaded);
    //   fileReader.readAsDataURL(file);
    // },
    // imgUploaded(e) {
    //   this.imgUrl = e.target.result;
    // },

    //新增
    createItem() {
      this.ruleForm.id = this.id;
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let _this = this; //在axios不能順利抓到this
          const createData = {
            productId: this.product.id,
            productName: this.product.name,
            total: this.total,
            quantity: parseInt(this.ruleForm.quantity),
            note: this.ruleForm.note,
          };
          axios
            .post("http://localhost:3000/orders", createData)
            .then(function (response) {
              // let tableItem = response.data;
              // _this.$store.dispatch("pushTableData", tableItem);
            });
          this.product.quantity =
            this.product.quantity - parseInt(this.ruleForm.amount);
          axios
            .patch(
              `http://localhost:3000/products/${parseInt(this.product.id)}`,
              this.product
            )
            .then((res) => {
              console.log(res);
            });
          //清空表單
          this.ruleForm = {
            selectedProduct: 1,
            imgUrl: "",
            quantity: 1,
            note: "",
          };
          this.$router.push("/list");
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
p.inventory {
  display: flex;
  font-size: 12px;
  color: gray;
  left: 10px;
  top: 25px;
}
</style>
