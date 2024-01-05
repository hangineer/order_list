<template lang="pug">
div
  el-table(:data='productData'  style='font-size:15px;'  height="600" :header-cell-style="tableHeaderColor")
    el-table-column(prop='id' label='# 產品編號' fixed align='center' width='180')
    el-table-column(prop='name' label='產品名稱' fixed align='center')
    el-table-column(prop='imgUrl' label='產品圖片' fixed align='center' width='180')
      template(slot-scope='scope')
        img(:src="scope.row.imgUrl" :style="imgSize")
    el-table-column(prop='price' label='產品價格' fixed align ='center')
    el-table-column(prop='inventory' label='產品庫存' fixed align='center')
    el-table-column(prop='note' label='產品備註' fixed align='center')
    el-table-column(fixed='right' width='100')
      template(slot-scope='scope')
        el-button.data-button(size='mini' @click='editItem(scope.$index, scope.row)' icon='el-icon-edit' :data-editId="scope.row.id") 編輯
        el-button.data-button(size='mini' @click='removeShow(scope.$index, scope.row)' icon='el-icon-delete' :data-removeId="scope.row.id") 刪除
        el-dialog(title='確定要刪除此筆訂單嗎？' :visible.sync='centerDialogVisible' :modal-append-to-body='false' :close-on-click-modal='false' width='30%' center='')
          span.dialog-footer(slot='footer')
            el-button(@click='centerDialogVisible = false') 取消
            el-button#removeSure(type='primary'  @click.native.prevent='removeItem()' @click='centerDialogVisible = false') 確定
</template>
<script>
export default {
  data() {
    return {
      centerDialogVisible: false, //彈跳視窗
      deleteIndex: null,
      imgSize: {
        display: "block",
        width: "100px",
      },
    };
  },
  computed: {
    productData() {
      return this.$store.state.productModule.productData;
    },
  },
  methods: {
    tableHeaderColor() {
      return "background-color: lightgray ; color:#606266";
    },
    //刪除 彈跳視窗
    removeShow(index, row) {
      this.centerDialogVisible = true;
      this.deleteIndex = row.id;
    },
    //刪除
    async removeItem() {
      await this.$store.dispatch(
        "productModule/removeProductData",
        this.deleteIndex
      );
      await this.$store.dispatch("productModule/renderProductData");
    },
    editItem(index, rows) {
      this.$router.push(`/product/${rows.id}`);
    },
    async getProductData() {
      await this.$store.dispatch("productModule/renderProductData");
    },
  },
  //讀取、顯示
  created() {
    this.getProductData();
  },
};
</script>
<style lang="scss" scoped>
.data-button {
  margin: 5px !important;
}
</style>
