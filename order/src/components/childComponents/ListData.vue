<template>
  <div>
    <!-- todo 配合json server思考一下路徑的呈現 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="訂單編號" align="center" width="180">
      </el-table-column>
      <el-table-column prop="name" label="商品名稱" align="center" width="180">
      </el-table-column>
      <el-table-column prop="img" label="商品圖片" align="center" width="180">
      </el-table-column>
      <el-table-column
        prop="quantity"
        label="商品數量"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="inventory"
        label="庫存量"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="price"
        label="商品價格"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="note"
        label="訂單備註"
        align="center"
      ></el-table-column>
      <el-table-column fixed="right" width="100">
        <template slot-scope="scope">
          <el-button
            class="data-button"
            size="mini"
            @click="editItem(scope.$index, scope.row)"
            icon="el-icon-edit"
            >編輯</el-button
          >
          <el-button
            class="data-button"
            size="mini"
            @click="centerDialogVisible = true"
            icon="el-icon-delete"
            >刪除</el-button
          >

          <el-dialog
            title="確定要刪除此筆訂單嗎？"
            :visible.sync="centerDialogVisible"
            :modal-append-to-body="false"
            :close-on-click-modal="false"
            width="30%"
            center
          >
            <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible = false">取消</el-button>
              <el-button
                type="primary"
                @click.native.prevent="removeItem(scope.$index, tableData)"
                @click="centerDialogVisible = false"
                >確定</el-button
              >
            </span>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
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
    removeItem(index, rows) {
      this.$store.dispatch("removeTableData", index);
      console.log(this.tableData);
    },
    editItem(index, rows) {
      this.$router.push(`/${rows.id}`);
    },
  },

  // axios.get('')
  // .then(function (response) {
  //   // handle success
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   // handle error
  //   console.log(error);
  // })
  // .finally(function () {
  //   // always executed
  // });
};
</script>
<style lang="scss" scoped>
.data-button {
  margin: 5px !important;
}

//todo 區分表格顏色
el-table:nth-child(odd) {
  background-color: red;
}
</style>
