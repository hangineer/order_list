<template lang="pug">
div
    el-form(:model='productForm' :rules='rules' ref='productForm' label-width='100px' size='mini')
    el-form-item(label='產品編號:' prop='id')
        el-input(v-model='id' :disabled='true')
    el-form-item(label='產品名稱:' prop='name')
        el-input(v-model='productForm.name' placeholder='請輸入商品名稱')
    el-form-item(label='產品圖片:' prop='imgUrl')
        //- todo 圖片上傳的不用element ui的元件，那submit form時會遇到問題嗎
        input(type='file' placeholder='請上傳商品圖片'  @change="imgUpload")
        img( v-model='productForm.imgUrl'  :src='productForm.imgUrl')   
        //- ls="el-input" v-model='productForm.imgUrl' v-if='this.imgUrl'
        //- el-upload(:action='url' :on-success='handleAvatarSuccess' :on-preview="handlePreview"
        //- :on-remove="handleRemove" )
        //-   img(v-if='productForm.imgUrl' :src='productForm.imgUrl')
        //-   el-button(size='mini' type='primary') 點擊上傳
        //-   .el-upload__tip(slot='tip') 只能上傳jpg/png
    el-form-item( label='產品庫存:' prop='inventory')
        el-input(v-model='productForm.inventory' placeholder='請輸入產品庫存')
    el-form-item(label='產品價格:' prop='price')
        el-input(v-model='productForm.price' placeholder='請輸入產品價格')
    el-form-item(label='產品備註:' prop='note')
        el-input(type='textarea' v-model='productForm.note')
    el-form-item
        el-button(type='primary' @click='createItem') 新增
        el-button(@click="resetForm('productForm')") 重置
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      //   tableData: [],
      productData: [],
      imgSize: {
        display: "block",
        width: "200px",
        height: "200px",
        margin: "20px auto",
      },
      centerDialogVisible: false, //新增的pop box
      productForm: {
        id: 0,
        imgUrl: "",
        quantity: 1,
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
        imgUrl: [
          {
            // required: true,
            message: "請上傳圖片",
            trigger: "change",
          },
        ],
        inventory: [
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
      return this.productData.length + 1;
      // return this.$store.state.tableData.length + 1;
    },
  },

  methods: {
    imgUpload(e) {
      const file = e.target.files.item(0);
      const fileReader = new FileReader();
      fileReader.addEventListener("load", this.imgUploaded);
      fileReader.readAsDataURL(file);
    },
    imgUploaded(e) {
      this.imgUrl = e.target.result;
    },

    //新增
    createItem() {
      this.productForm.id = this.id;
      this.$refs.productForm.validate((valid) => {
        if (valid) {
          let _this = this; //在axios不能順利抓到this
          const createData = {
            productId: this.product.id,
            productName: this.product.name,
            imgUrl: this.product.imgUrl,
            quantity: parseInt(this.productForm.quantity),
            total: this.total,
            note: this.productForm.note,
          };
          axios
            .post("http://localhost:3000/products", createData)
            .then(function (response) {
              console.log("新增成功");
              // let tableItem = response.data;
              // _this.$store.dispatch("pushTableData", tableItem);
            });

          //清空表單
          this.productForm = {
            selectedProduct: 1,
            quantity: 1,
            note: "",
          };
          this.$router.push("/list");
        } else if (this.product.inventory > this.productForm.quantity) {
          alert("購買數量需大於商品庫存");
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

<style lang="scss" scoped></style>
