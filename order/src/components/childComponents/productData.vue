<template lang="pug">
//- todo 需要將資料轉成formData格式？
div
  el-table( :data='productData'  style='width: 100%' :header-cell-style="tableHeaderColor")
    el-table-column(prop='id' label='# 產品編號' align='center' width='180')
    el-table-column(prop='name' label='產品名稱' align='center')
    el-table-column(prop='imgUrl' label='產品圖片' align='center' width='180')
    el-table-column(prop='price' label='產品價格' align ='center')
    el-table-column(prop='inventory' label='產品庫存' align='center')
    el-table-column(prop='note' label='產品備註' align='center')
    el-table-column(fixed='right' width='100')
      template(slot-scope='scope')
        el-button.data-button(size='mini' @click='editItem(scope.$index, scope.row)' icon='el-icon-edit') 編輯
        el-button.data-button(size='mini' @click='removeShow(scope.$index, scope.row)' icon='el-icon-delete') 刪除
        el-dialog(title='確定要刪除此筆訂單嗎？' :visible.sync='centerDialogVisible' :modal-append-to-body='false' :close-on-click-modal='false' width='30%' center='')
          span.dialog-footer(slot='footer')
            el-button(@click='centerDialogVisible = false') 取消
            el-button(type='primary'  @click.native.prevent='removeItem()' @click='centerDialogVisible = false') 確定
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      centerDialogVisible: false, //彈跳視窗
      productData: [],
      // selectedProduct: null,
      deleteIndex: null,
    };
  },
  computed: {
    // productData() {
    //   return this.$store.productModule.state;
    // },
  },
  methods: {
    tableHeaderColor() {
      return "background-color: lightBlue ; color:#606266";
    },
    //刪除 彈跳視窗
    removeShow(index, row) {
      this.centerDialogVisible = true;
      this.deleteIndex = row.id;
    },
    //刪除
    removeItem() {
      let _this = this;
      axios
        .delete(`http://localhost:3000/products/${this.deleteIndex}`)
        .then(function (response) {
          // axios.get("http://localhost:3000/products").then(function (response) {
          //   _this.$store.dispatch(
          //     "productModule/renderProductData",
          //     response.data
          //   );
          // });

          _this.getProductData();
        })
        .catch(function (error) {
          console.log(error);
          throw error;
        });
    },
    //todo 修改
    editItem(index, rows) {
      this.$router.push(`/product/${rows.id}`);
    },
    async getProductData() {
      let _this = this;
      await axios
        //  刪除後get新的內容
        .get("http://localhost:3000/products")
        .then(function (response) {
          _this.productData = response.data;
          _this.$store.dispatch(
            "productModule/renderProductData",
            _this.productData
          );
        })
        .catch(function (error) {
          console.log(error);
          throw error;
        });
      // this.productData.forEach((item) => {
      //   this.productData.forEach((product) => {
      //     if (product.id === item.productId) {
      //       item.productName = product.name;
      //       item.price = product.price;
      //       // item.total = product.price * item.quantity;
      //     }
      //   });
      // });
    },
  },
  //讀取、顯示
  async created() {
    this.getProductData();
  },
};
</script>
<style lang="scss" scoped>
.data-button {
  margin: 5px !important;
}
</style>
