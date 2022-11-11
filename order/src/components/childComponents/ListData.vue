<template lang="pug">
div
  el-table(:data='tableData'  style='width: 100%' :header-cell-style="tableHeaderColor")
    el-table-column(prop='id' label='訂單編號' align='center' width='180')
    el-table-column(prop='name' label='商品名稱' align='center' width='180')
    el-table-column(prop='img' label='商品圖片' align='center' width='180')
    el-table-column(prop='quantity' label='商品數量' align='center')
    el-table-column(prop='inventory' label='庫存量' align='center')
    el-table-column(prop='price' label='商品價格' align='center')
    el-table-column(prop='note' label='訂單備註' align='center')
    el-table-column(fixed='right' width='100')
      template(slot-scope='scope')
        el-button.data-button(size='mini' @click='editItem(scope.$index, scope.row)' icon='el-icon-edit') 編輯
        el-button.data-button(size='mini' @click='centerDialogVisible = true' icon='el-icon-delete') 刪除
        el-dialog(title='確定要刪除此筆訂單嗎？' :visible.sync='centerDialogVisible' :modal-append-to-body='false' :close-on-click-modal='false' width='30%' center='')
          span.dialog-footer(slot='footer')
            el-button(@click='centerDialogVisible = false') 取消
            el-button(type='primary' @click.native.prevent='removeItem(scope.$index, tableData)' @click='centerDialogVisible = false') 確定
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      centerDialogVisible: false,
    };
  },
  computed: {
    tableData() {
      return this.$store.state.tableData;
    },
  },
  methods: {
    tableHeaderColor() {
      return "background-color: lightBlue ; color:#606266";
    },
    //刪除
    removeItem(index, tableData) {
      console.log(index); //非id
      let _this = this;
      axios
        .delete(`http://localhost:3000/orders/${index + 1}`)
        .then(function (response) {
          console.log(response.data); //空的
          console.log("被刪除的資料", tableData[index]);
          _this.$store.dispatch("removeTableData", index);
        });
    },
    //修改
    editItem(index, rows) {
      this.$router.push(`/${rows.id}`);
    },
  },
  //讀取/顯示
  created: function () {
    let _this = this;
    axios
      .get("http://localhost:3000/orders")
      .then(function (response) {
        let tableItem = response.data;
        _this.$store.dispatch("renderTableData", tableItem);
      })
      .catch(function (error) {
        console.log(error);
        throw error;
      });
  },
};
</script>
<style lang="scss" scoped>
.data-button {
  margin: 5px !important;
}
</style>
