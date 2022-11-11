<template lang="pug">
div
  el-form(:model='ruleForm' :rules='rules' ref='ruleForm' label-width='100px' size='mini')
    el-form-item(label='訂單編號:' prop='id')
      el-input(v-model='id' :disabled='true')
    el-form-item(label='商品名稱:' prop='name')
      el-input(v-model='ruleForm.name' placeholder='請輸入商品名稱')
    el-form-item(label='商品圖片:' prop='imgUrl')
      //- todo 圖片上傳的不用element ui的元件，那submit form時會遇到問題嗎
      input(type='file' placeholder='請上傳商品圖片'  @change="imgUpload")
      img( v-model='ruleForm.imgUrl'  :src='ruleForm.imgUrl')
      
      
      //- ls="el-input" v-model='ruleForm.imgUrl' v-if='this.imgUrl'
      //- el-upload(:action='url' :on-success='handleAvatarSuccess' :on-preview="handlePreview"
      //- :on-remove="handleRemove" )
      //-   img(v-if='ruleForm.imgUrl' :src='ruleForm.imgUrl')
      //-   el-button(size='mini' type='primary') 點擊上傳
      //-   .el-upload__tip(slot='tip') 只能上傳jpg/png
    el-form-item( label='商品數量:' prop='quantity')
      el-input(v-model='ruleForm.quantity' placeholder='請輸入商品數量')
      p(class="inventory" v-model='ruleForm.inventory' :disabled='true' prop='inventory') 商品庫存:{{ ruleForm.inventory }}

    el-form-item(label='商品價格:' prop='price')
      el-input(v-model='ruleForm.price' placeholder='請輸入商品價格')
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
      ruleForm: {
        id: 0,
        name: "",
        imgUrl: "",
        quantity: null,
        inventory: 10,
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
      return this.$store.state.tableData.length + 1;
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
    //todo 庫存的判斷
    createItem() {
      this.ruleForm.id = this.id;
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let _this = this; //在axios不能順利抓到this
          axios
            .post("http://localhost:3000/orders", this.ruleForm)
            .then(function (response) {
              let tableItem = response.data;
              _this.$store.dispatch("pushTableData", tableItem);
            });
          //清空表單
          this.ruleForm = {
            id: 0,
            name: "",
            img: null,
            quantity: null,
            inventory: this.ruleForm.inventory - 1,
            price: null,
            note: "",
          };
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
