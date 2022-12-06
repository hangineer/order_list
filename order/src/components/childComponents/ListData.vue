<template lang="pug">
div
  el-table(:data='tableData'  style='font-size:15px; width: 100%' :header-cell-style="tableHeaderColor" height="600")
    el-table-column(prop='id' label='# 訂單編號' fixed align='center' width='180')
    el-table-column(prop='productName' label='商品名稱' fixed align='center' width='180')
    //- el-table-column( label='時間' align='center' width='180') {{formatTime}}
    el-table-column(prop='quantity' label='購買數量' fixed align='center')
    el-table-column(prop='price' label='商品價格' fixed align ='center')
    el-table-column(prop='total' label='訂單總額' fixed align='center')
    el-table-column(prop='note' label='訂單備註' fixed align='center')
    el-table-column(fixed='right' width='100') 
      template(slot-scope='scope')
        el-button.data-button(size='mini' v-if="isAdmin"  @click='editItem(scope.$index, scope.row)' icon='el-icon-edit' :data-editId="scope.row.id") 編輯
        el-button.data-button(size='mini' v-if="isAdmin"  @click='removeShow(scope.$index, scope.row)' icon='el-icon-delete' :data-removeId="scope.row.id") 刪除
        el-dialog(title='確定要刪除此筆訂單嗎？' :visible.sync='centerDialogVisible' :modal-append-to-body='false' :close-on-click-modal='false' width='30%' center='')
          span.dialog-footer(slot='footer')
            el-button(@click='centerDialogVisible = false') 取消 
            el-button#removeSure(type='primary'  @click.native.prevent='removeItem()' @click='centerDialogVisible = false') 確定

</template>
<script>
export default {
  data() {
    return {
      newDate: 0,
      centerDialogVisible: false, //彈跳視窗
      selectedProduct: null,
      deleteIndex: null,
    };
  },
  computed: {
    tableData() {
      return this.$store.state.listModule.tableData;
    },
    productData() {
      return this.$store.state.productModule.productData;
    },
    isAdmin() {
      return JSON.parse(sessionStorage.getItem("userData")).role === "user";
    },
    //可以嘗試做時間戳記
    // formatTime() {
    //   var dates = new Date();
    //   var year = dates.getFullYear();
    //   var month = dates.getMonth() + 1; //會比現在少一個月
    //   var date = dates.getDate();
    //   var hours = dates.getHours();
    //   var minutes = dates.getMinutes();
    //   return `${year}-${month}-${date}${hours}:${minutes}`;
    // },
  },
  // mounted() {
  //   this.newDate = Math.floor(Date.now() / 1000);
  // },
  methods: {
    tableHeaderColor() {
      return "background-color: lightgray ; color:#606266";
    },

    //刪除 彈跳視窗
    removeShow(index, row) {
      this.centerDialogVisible = true;
      this.deleteIndex = row.id; //抓取訂單id
    },
    updateProductInventory(productId, info) {
      this.$store.dispatch("productModule/updateProductInventory", {
        productId,
        info,
      });
      console.log("updateProductInventory", productId, info);
    },
    //刪除
    async removeItem() {
      let productId = null;
      let quantity = null;
      this.tableData.forEach((e) => {
        if (e.id == this.deleteIndex) {
          productId = e.productId;
          quantity = e.quantity;
          console.log(quantity);
        }
      });
      // let inventory =
      //   Number(quantity) + this.productData[productId - 1].inventory;
      await this.$store.dispatch(
        "listModule/removeTableData",
        this.deleteIndex
      );
      //刪除訂單後要更新庫存
      this.updateProductInventory(productId, {
        inventory: Number(quantity) + this.productData[productId - 1].inventory,
      });
      await this.$store.dispatch("listModule/renderTableData");
      // axios
      //   .delete(`http://localhost:3000/orders/${this.deleteIndex}`)
      //   .then((res) => {
      //     // console.log("被刪除的資料", tableData[index]);
      //     // _this.$store.dispatch("listModule/removeTableData", index);
      //     axios
      //       .patch(`http://localhost:3000/products/${parseInt(productId)}`, {
      //         inventory: inventory,
      //       })
      //       .then(function (response) {
      //         _this.getTableData();
      //       });
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     throw err;
      //   });
    },
    //修改
    editItem(index, rows) {
      this.$router.push(`/list/${rows.id}`);
    },
    //取得訂單列表資訊
    async getTableData() {
      await this.$store.dispatch("listModule/renderTableData");
      await this.$store.dispatch("productModule/renderProductData");
      await this.tableData.forEach((list) => {
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
