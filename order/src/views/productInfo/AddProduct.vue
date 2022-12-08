<template lang="pug">
div
  div.relative
   el-button( class="fallback" @click="fallback" icon='el-icon-back' size="small") 返回產品頁
  //- 欄位名稱註記
  //- name 產品名稱
  //- imgUrl 產品圖片
  //- price: 產品價格
  //- inventory: 產品庫存
  //- note: 產品備註
  el-form(:model='productForm' :rules='rules' ref='productForm' label-width='100px' size='mini')
    el-form-item(label='產品編號:')
        el-input(v-model='id' :disabled='true')
    el-form-item(label='產品名稱:' prop='name')
        el-input(v-model='productForm.name' placeholder='請輸入產品名稱')
    el-form-item(label='產品圖片:' prop='imgUrl')
        input(type='file' placeholder='請上傳產品圖片'  @change="imgUpload" accept="image/*" )
        img#imgUrl(v-if="productForm.imgUrl" v-model="productForm.imgUrl" :src="productForm.imgUrl" :style="imgSize")   
    el-form-item(label='產品價格:' prop='price')
        el-input(v-model='productForm.price' placeholder='請輸入產品價格')
    el-form-item( label='產品庫存:' prop='inventory')
        el-input(v-model='productForm.inventory' placeholder='請輸入產品庫存')
    el-form-item(label='產品備註:' prop='note')
        el-input(type='textarea' v-model='productForm.note')
    el-form-item
        el-button.createProduct( type='primary' @click="dialogVisible = true") 新增
        el-dialog(title="確定新增此筆訂單？" :close-on-click-modal='false' :visible.sync="dialogVisible" width="30%" center="") 
          span.dialog-footer(slot='footer')    
            el-button(@click="dialogVisible = false") 取消
            el-button#createProductSure(type="primary" @click="createProduct") 確定
        el-button(@click="resetForm('productForm')") 重置
</template>

<script>
export default {
  data() {
    return {
      //新增的彈出視窗
      dialogVisible: false,
      // productData: [],
      imgSize: {
        display: "block",
        width: "300px",
        height: "250px",
        margin: "20px auto",
      },
      productForm: {
        id: null,
        name: "",
        imgUrl: "",
        inventory: null,
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
    //todo id在store裏面印出來的會是null
    id() {
      return this.$store.getters["productModule/id"];
      // return this.productData[this.productData.length - 1]?.id + 1;
    },

    // productData() {
    //   return this.$store.state.productModule.productData;
    // },
  },
  created() {
    this.$store.dispatch("productModule/renderProductData");
    // let _this = this;
    // axios
    //   .get("http://localhost:3000/products")
    //   .then(function (response) {
    //     _this.productData = response.data;
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     throw error;
    //   });
  },
  methods: {
    fallback() {
      this.$router.push("/product");
    },
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
    //新增
    async createProduct() {
      // this.productForm.id = this.id;
      await this.$refs.productForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch(
            "productModule/pushProductData",
            this.productForm
          );
          // let _this = this; //在axios不能順利抓到this
          // axios
          //   .post("http://localhost:3000/products", _this.productForm)
          //   .then(function (response) {
          //     console.log("新增成功");
          //     console.log(response);
          //     let productItem = response.data;
          //     _this.$store.dispatch(
          //       "productModule/pushProductData",
          //       productItem
          //     );
          //   })
          //   .catch(function (error) {
          //     console.log(error);
          //     throw error;
          //   });

          //清空表單
          this.productForm = {
            name: "",
            price: "",
            inventory: "",
            imgUrl: "",
            note: "",
          };
          this.$router.push("/product");
        } else {
          this.$notify({
            title: "注意",
            message: "請確實填寫",
            duration: 1500,
            type: "warning",
          });
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
.createProduct {
  margin: 20px !important;
}
</style>
