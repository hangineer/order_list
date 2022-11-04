<template>
  <div>
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
        prop="price"
        label="商品價格"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="note"
        label="訂單備註"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="inventory"
        label="庫存量"
        align="center"
      ></el-table-column>
      <el-table-column label="編輯" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            icon="el-icon-edit"
            >編輯</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 0,
          name: "咖啡拿鐵",
          img: null,
          quantity: "2",
          price: "90",
          note: "",
          inventory: null,
        },
      ],
    };
  },
};
</script>
<style></style>
