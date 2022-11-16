<template lang="pug">
div
    el-form(:model='targetProduct' :rules='rules' ref='targetProduct' label-width='100px' size='mini')
    el-form-item(label='產品編號:' prop='targetProduct.id')
        el-input(v-model='id' :disabled='true')
    el-form-item(label='產品名稱:' prop='name')
        el-input(v-model='targetProduct.name' placeholder='請輸入商品名稱')
    el-form-item(label='產品圖片:' prop='imgUrl')
        input(type='file' placeholder='請上傳商品圖片'  @change="imgUpload" accept="image/*" )
        img#imgUrl(v-if="targetProduct.imgUrl" v-model="productForm.imgUrl" :src="productForm.imgUrl" :style="imgSize")   
        //- img#imgUrl(v-if="productForm.imgUrl" v-model="productForm.imgUrl" :src="Base64.decode('this.imgUrl')" :style="imgSize")   
    el-form-item(label='產品價格:' prop='price')
        el-input(v-model='targetProduct.price' placeholder='請輸入產品價格')
    el-form-item( label='產品庫存:' prop='inventory')
        el-input(v-model='targetProduct.inventory' placeholder='請輸入產品庫存')
    el-form-item(label='產品備註:' prop='note')
        el-input(type='textarea' v-model='targetProduct.note')
    
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
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      productData: [],
      targetProduct: {},
      imgSize: {
        display: "block",
        width: "300px",
        height: "250px",
        margin: "20px auto",
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
            required: true,
            pattern: /^\d+$/g,
            message: "請輸入數字(需正數)",
            trigger: "blur",
          },
        ],
        imgUrl: [
          {
            required: true,
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
    nowId() {
      console.log(targetProduct);
      return parseInt(this.$route.params.id);
    },
  },
  methods: {
    saveBtn(index, row) {
      let _this = this;
      _this.$refs.targetProduct.validate((valid) => {
        if (valid) {
          axios
            .patch(
              `http://localhost:3000/products/${parseInt(
                this.$route.params.id,
                _this.targetProduct
              )}`
            )
            .then(function (response) {
              _this.$router.push("/product");
            })
            .catch(function (error) {
              console.log(error);
              throw error;
            });
        } else {
          alert("請確實填寫");
        }
      });
    },
    cancelBtn() {
      this.$router.push("/product");
    },
  },
  created() {
    let _this = this;
    axios
      .get(
        `http://localhost:3000/products/${parseInt(
          this.$route.params.id,
          _this.targetProduct
        )}`
      )
      .then(function (response) {
        _this.productData = response.data;
      })
      .catch(function (error) {
        console.log(error);
        throw error;
      });
  },
  methods: {
    imgUpload(e) {
      const _this = this;
      const file = e.target.files[0];
      // this.file = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.addEventListener("load", () => {
        _this.productForm.imgUrl = fileReader.result;
        console.log(fileReader.result);
        console.warn(_this.productForm.imgUrl);
      });
      console.log("圖片編碼", this.productForm.imgUrl);
    },
  },
};
</script>

<style lang="scss" scoped>
.createProduct {
  margin: 20px !important;
}
</style>
