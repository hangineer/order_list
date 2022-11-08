<template>
  <div>
    <!-- todo 若配合json server tableData可以改成list? -->
    <!-- <el-table-column
      label="日期"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column> -->
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
          <!-- todo 版面還沒排好 -->
          <el-button
            class="data-button"
            size="mini"
            @click="edit(scope.$index, scope.row)"
            icon="el-icon-edit"
            >編輯</el-button
          >
          <el-button
            class="data-button"
            size="mini"
            @click.native.prevent="remove(scope.$index, tableData)"
            icon="el-icon-delete"
            >刪除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    tableData() {
      return this.$store.state.tableData;
    },
  },
  methods: {
    remove(index, rows) {
      let obj = rows.slice();
      obj.splice(index, 1);
      this.$store.dispatch("updateTableData", obj);
      console.log(this.tableData);
    },
    edit(index, rows) {},
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
