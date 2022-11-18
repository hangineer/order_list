<template lang="pug">
div
  el-table( :data='tableData'  style='font-size:15px; width: 100% f' :header-cell-style="tableHeaderColor")
    el-table-column(prop='id' label='# 訂單編號' align='center' width='180')
    el-table-column(prop='productName' label='商品名稱' align='center' width='180')
    //- el-table-column(prop='img' label='商品圖片' align='center' width='180')
    el-table-column(prop='quantity' label='購買數量' align='center')
    el-table-column(prop='price' label='商品價格' align ='center')
    el-table-column(prop='total' label='訂單總額' align='center')
    el-table-column(prop='note' label='訂單備註' align='center')
    el-table-column(fixed='right' width='100')
      template(slot-scope='scope')
        el-button.data-button(size='mini' v-if="isAdmin"  @click='editItem(scope.$index, scope.row)' icon='el-icon-edit') 編輯
        el-button.data-button(size='mini' v-if="isAdmin"  @click='removeShow(scope.$index, scope.row)' icon='el-icon-delete') 刪除
        el-dialog(title='確定要刪除此筆訂單嗎？' :visible.sync='centerDialogVisible' :modal-append-to-body='false' :close-on-click-modal='false' width='30%' center='')
          span.dialog-footer(slot='footer')
            el-button(@click='centerDialogVisible = false') 取消
            el-button(type='primary'  @click.native.prevent='removeItem()' @click='centerDialogVisible = false') 確定
  //- el-pagination(:page-size="pagesize" layout='prev, pager, next,total' @current-change="current_change"  :total='total' hide-on-single)

   </el-pagination>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      centerDialogVisible: false, //彈跳視窗
      productData: [],
      selectedProduct: null,
      deleteIndex: null,
      //以下為分頁相關
      // loading: false,
      // total: 0,
      // currentPage: 1,
      // pageSize: 5, //指定要展示多少筆訂單
    };
  },
  computed: {
    tableData() {
      return this.$store.state.listModule.tableData;
    },
    isAdmin() {
      return JSON.parse(sessionStorage.getItem("userData")).role === "user";
    },
  },
  methods: {
    tableHeaderColor() {
      return "background-color: lightgray ; color:#606266";
    },
    // 分頁顯示
    // current_change(currentPage) {
    //   this.currentPage = currentPage;
    // },
    // getList() {
    //   this.loading = true;
    //   const param = {
    //     note: this.tableData.note,
    //     Message: this.tableData.quantity,
    //   };
    //   http.get("http://localhost:3000/orders", param, function (res) {
    //     this.loading = false;
    //     this.tableData = res.data.orders;
    //     this.total = res.data.total;
    //   });
    // },

    //刪除 彈跳視窗
    removeShow(index, row) {
      this.centerDialogVisible = true;
      this.deleteIndex = row.id;
    },
    //刪除
    removeItem() {
      let _this = this;
      let productId = null;
      let quantity = null;
      _this.tableData.forEach((e) => {
        if (e.id == this.deleteIndex) {
          productId = e.productId;
          quantity = e.quantity;
        }
      });
      let inventory =
        Number(quantity) + _this.productData[productId - 1].inventory;
      console.log(inventory);
      axios
        .delete(`http://localhost:3000/orders/${this.deleteIndex}`)
        .then((res) => {
          // console.log("被刪除的資料", tableData[index]);
          // _this.$store.dispatch("listModule/removeTableData", index);
          axios
            .patch(`http://localhost:3000/products/${parseInt(productId)}`, {
              inventory: inventory,
            })
            .then(function (response) {
              _this.getTableData();
            });
        })
        .catch((err) => {
          console.log(err);
          throw error;
        });
    },
    //修改
    editItem(index, rows) {
      this.$router.push(`/list/${rows.id}`);
    },
    async getTableData() {
      let _this = this;
      axios
        //  刪除後get新的內容
        .get("http://localhost:3000/orders")
        .then(function (response) {
          //_this.tableData = response.data;
          _this.$store.dispatch("listModule/renderTableData", response.data);
        })
        .catch(function (error) {
          console.log(error);
          throw error;
        });
      await axios
        .get("http://localhost:3000/products")
        .then(function (response) {
          _this.productData = response.data;
        })
        .catch(function (error) {
          console.log(error);
          throw error;
        });
      this.tableData.forEach((list) => {
        console.log("tableData.productName", list.productId);
        this.productData.forEach((product) => {
          if (product.id === list.productId) {
            list.productName = product.name;
            list.price = product.price;
            list.total = product.price * list.quantity;
          }
        });
      });
    },
  },
  //讀取、顯示
  created() {
    this.getTableData();
  },
};
</script>
<style lang="scss" scoped>
.data-button {
  margin: 5px !important;
}
</style>
