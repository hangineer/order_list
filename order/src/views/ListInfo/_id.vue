<template lang="pug">
div
  el-form(
    :model="targetItem",
    :rules="rules",
    ref="targetItem",
    label-width="100px",
    size="mini"
  )
    el-form-item(label="訂單編號:") 
      el-input(v-model="targetItem.id", :disabled="true")
    el-form-item(label="商品名稱:") 
      el-select(v-model="targetItem.productId", placeholder="請選擇商品")
        el-option(
          v-for="product in productData",
          :key="product.id",
          :value="product.id",
          :label="product.name"
        ) 
      img(v-model="product.imgUrl", :style="imgSize", :src="product.imgUrl")

    el-form-item(label="購買數量:", prop="quantity")
      el-input(v-model="targetItem.quantity") 
      p.inventory 商品庫存:{{ product.inventory }}
    el-form-item(label="商品價格:")
      el-input.readonly(v-model="product.price", readonly)
    el-form-item(label="訂單總額:")
      el-input.readonly(v-model="total", readonly) 
    el-form-item(label="訂單備註:", prop="note")
      el-input(v-model="targetItem.note", type="textarea") 
    el-form-item
      template(slot-scope="scope")
        el-button(
          size="mini",
          @click="saveBtn(scope.$index, scope.row)",
          type="success",
          icon="el-icon-check"
        ) 儲存
        el-button(
          size="mini",
          @click="cancelBtn",
          type="danger",
          icon="el-icon-close"
        ) 取消
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      //被選產品（動態的）
      product: {},
      //舊的購買數量
      oldQuantity: 0,
      //targetItem的深拷貝，原本的訂單資訊
      oldData: null,
      // productData的深拷貝，產品陣列
      oldProductData: null,
      newContent: null, //拉出來後開始報錯
      imgSize: {
        display: "block",
        width: "200px",
        height: "200px",
        margin: "20px auto",
      },
      rules: {
        quantity: [
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
      return parseInt(this.$route.params.id); //表單抓到的值型態都為字串
      //若沒轉型會有錯誤訊息：Cannot read properties of undefined (reading 'id')
    },
    total() {
      if (this.product) {
        return (
          parseInt(this.product.price) * parseInt(this.targetItem.quantity)
        );
      } else {
        return 0;
      }
    },
    productData() {
      return this.$store.state.productModule.productData;
    },
    targetItem() {
      return this.$store.state.listModule.targetItem;
    },
  },
  methods: {
    updateOrderInfo(targetItem) {
      this.$store.dispatch("listModule/updateTableData", this.newContent);
      // axios
      //   .patch(
      //     `http://localhost:3000/orders/${this.nowId}`,
      //     targetItem //舊Data
      //   )
      //   .then()
      //   .catch((error) => console.log("error", error));
    },
    updateProductInventory(productId, info) {
      // this.$store.dispatch("productModule/updateProductInventory", {
      //   productId,
      //   info,
      // });
      // console.log("updateProductInventory", productId, info);
      axios
        .patch(`http://localhost:3000/products/${productId}`, info)
        .then(function (response) {})
        .catch((error) => console.log("error", error));
    },
    saveBtn(index, rows) {
      // console.log(index, rows);
      // let _this = this;
      this.$refs.targetItem.validate((valid) => {
        //判斷表格不為空且產品庫存要大於購買數量
        if (valid && this.product.inventory > this.targetItem.quantity) {
          this.newContent = {
            id: this.nowId,
            productName: this.product.name,
            quantity: this.targetItem.quantity,
            productId: this.product.id,
            price: this.product.price,
            total: this.total,
            note: this.targetItem.note,
          };
          console.log(
            "變化",
            this.oldData.productId, //舊
            this.targetItem.productId //新
          );

          if (this.oldData.productId == this.targetItem.productId) {
            this.updateOrderInfo(this.newContent);
            //商品相同時
            console.log("商品相同時");
            this.product.inventory =
              this.product.inventory +
              parseInt(this.oldQuantity) -
              parseInt(this.targetItem.quantity);
            this.updateProductInventory(
              this.targetItem.productId,
              this.product
            );
            this.$router.push("/list");
          } else {
            this.updateOrderInfo(this.newContent);
            console.log("商品不同時");
            //商品不同時 先把舊的商品庫存+回去↓
            //舊的商品庫存 [_this.oldData.productId - 1]是為了算出是商品陣列中的第幾個
            this.oldProductData[this.oldData.productId - 1].inventory =
              parseInt(
                this.oldProductData[this.oldData.productId - 1].inventory
              ) + parseInt(this.oldQuantity);
            // console.log(
            //   "更新原本購買的商品庫存",
            //   _this.oldData.productId,
            //   "庫存",
            //   _this.oldProductData[_this.oldData.productId - 1].inventory
            // );
            this.updateProductInventory(this.oldData.productId, {
              inventory:
                this.oldProductData[this.oldData.productId - 1].inventory,
            });
            this.product.inventory =
              parseInt(this.product.inventory) -
              parseInt(this.targetItem.quantity);
            // console.log(
            //   "更新修改購買的商品庫存",
            //   _this.targetItem.productId,
            //   "物件",
            //   _this.product
            // );
            this.updateProductInventory(
              this.targetItem.productId,
              this.product
            );
            this.$router.push("/list");
          }
        } else if (this.product.inventory < this.targetItem.quantity) {
          this.$notify({
            title: "錯誤",
            message: "購買數量需小於商品庫存",
            duration: 1500,
            type: "error",
          });
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
    cancelBtn() {
      this.$router.push("/list");
    },
  },
  async created() {
    let _this = this;
    await this.$store
      .dispatch("productModule/renderProductData")
      .then(function () {
        _this.oldProductData = JSON.parse(JSON.stringify(_this.productData)); //舊商品Data
        console.log("productData", _this.productData);
      })
      .catch(function (error) {
        console.log(error);
        throw error;
      });

    // axios
    // .get("http://localhost:3000/products")
    // .then(function (response) {
    //   _this.productData = response.data;
    //   _this.oldProductData = JSON.parse(JSON.stringify(response.data)); //舊商品Data
    //   // _this.productData.forEach((item) => console.log(item));
    //   console.log(_this.productData);
    // })
    // .catch(function (error) {
    //   console.log(error);
    //   throw error;
    // });
    //訂單明細
    await this.$store
      .dispatch("listModule/getOrderById", parseInt(_this.nowId))
      .then(function () {
        _this.oldQuantity = parseInt(_this.targetItem.quantity);
        console.log("oldQuantity", _this.oldQuantity);
        _this.oldData = JSON.parse(JSON.stringify(_this.targetItem)); //舊Data
        console.log("oldData", _this.oldData);
        _this.productData.forEach((e) => {
          if (e.id == _this.targetItem.productId) {
            _this.product = e;
          }
        });
        console.log("targetItem", _this.targetItem);
      })
      .catch(function (error) {
        console.log(error);
        throw error;
      });

    // await this.$store
    //   .dispatch("productModule/getProductById", this.targetItem.productId)
    //   .then((response) => {
    //     _this.product = response.data;
    //     console.log("getProductById", response.data);
    //   });

    //  axios
    //   .get(`http://localhost:3000/orders/${parseInt(_this.$route.params.id)}`)
    //   .then(function (response) {
    //     _this.targetItem = response.data;
    //     //特別抓取舊的購買數量，要用於之後的庫存計算
    //     _this.oldQuantity = response.data.quantity;
    //     _this.oldQuantity = parseInt(response.data.quantity);
    //     console.log("舊的", _this.oldQuantity);
    //     _this.oldData = JSON.parse(JSON.stringify(response.data)); //舊Data
    //     console.log(_this.oldData);
    //     _this.productData.forEach((e) => {
    //       if (e.id == _this.targetItem.productId) {
    //         _this.product = e;
    //       }
    //     });
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     throw error;
    //   });
  },
  watch: {
    "targetItem.productId": function () {
      this.productData.forEach((e) => {
        if (e.id == this.targetItem.productId) {
          this.product = e;
          console.log("目前產品", this.product);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.readonly {
  opacity: 0.5;
}
.inventory {
  display: flex;
  font-size: 12px;
  color: gray;
  left: 10px;
  top: 25px;
}
</style>
