<template lang="pug">
div
  el-form(:model="targetItem"  
  :rules="rules" ref="targetItem" label-width="100px" size="mini")
    el-form-item(label="訂單編號:") 
      el-input(v-model="targetItem.id" :disabled="true")
    el-form-item(label="商品名稱:") 
      el-select(v-model="targetItem.productId" placeholder="請選擇商品")
        el-option(
          v-for='product in productData'
          :key='product.id' 
          :value="product.id"
          :label="product.name") 
      img( v-model='product.imgUrl' :style="imgSize" :src='product.imgUrl')

    el-form-item(label="購買數量:" prop="quantity")
      el-input(v-model="targetItem.quantity") 
      p(class="inventory") 商品庫存:{{ product.inventory }}
    el-form-item(label='商品價格:')
      el-input(class="readonly" v-model='product.price' readonly)
    el-form-item( label='訂單總額:')
      el-input(class="readonly" v-model="total"  readonly)   
    el-form-item(label="訂單備註:" prop="note")
      el-input(v-model="targetItem.note" type="textarea")   
    el-form-item
      template(slot-scope="scope")
        el-button( size="mini"
              @click="saveBtn(scope.$index, scope.row)"
              type="success"
              icon="el-icon-check") 儲存
        el-button(size="mini"
              @click="cancelBtn"
              type="danger"
              icon="el-icon-close") 取消
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      product: [],
      productData: [],
      oldQuantity: 0,
      oldData: null,
      oldProductData: null,
      // selectedProduct: this.targetItem.id,
      targetItem: {},
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
  },
  methods: {
    saveBtn(index, rows) {
      console.log(index, rows);
      let _this = this;
      _this.$refs.targetItem.validate((valid) => {
        //判斷表格不為空且產品庫存要大於購買數量
        if (valid && this.product.inventory > this.targetItem.quantity) {
          const newContent = {
            id: this.id,
            productName: this.product.name,
            quantity: this.targetItem.quantity,
            productId: this.product.id,
            price: this.product.price,
            total: this.total,
            note: this.targetItem.note,
          };
          console.log(this.product.name);
          console.log(newContent);
          if (_this.oldData.productId == _this.targetItem.productId) {
            //商品相同時
            axios
              .patch(
                `http://localhost:3000/orders/${parseInt(
                  _this.$route.params.id
                )}`,
                newContent
              )
              .then(function (response) {
                // _this.$store.commit("listModule/setUpdateTableData", newContent);
                //修改產品庫存
                _this.product.inventory =
                  _this.product.inventory +
                  parseInt(_this.oldQuantity) -
                  parseInt(_this.targetItem.quantity);
                axios
                  .patch(
                    `http://localhost:3000/products/${parseInt(
                      _this.targetItem.productId
                    )}`,
                    _this.product
                  )
                  .then(function (response) {
                    _this.$router.push("/list");
                  });
              })
              .catch(function (error) {
                console.log(error);
                throw error;
              });
          } else {
            //商品不同時 先把舊的商品庫存+回去↓
            //舊的商品庫存 [_this.oldData.productId - 1]是為了算出是商品陣列中的第幾個
            _this.oldProductData[_this.oldData.productId - 1].inventory =
              parseInt(
                _this.oldProductData[_this.oldData.productId - 1].inventory
              ) + parseInt(_this.oldQuantity);
            axios
              .patch(
                `http://localhost:3000/orders/${parseInt(
                  _this.$route.params.id
                )}`,
                _this.oldData //舊Data
              )
              .then(function (response) {
                axios
                  .patch(
                    `http://localhost:3000/products/${parseInt(
                      _this.oldData.productId //舊Data
                    )}`,
                    {
                      inventory:
                        _this.oldProductData[_this.oldData.productId - 1]
                          .inventory,
                    }
                  )
                  .then(function (response) {
                    //再扣新的商品庫存 ↓
                    axios
                      .patch(
                        `http://localhost:3000/orders/${parseInt(
                          _this.$route.params.id
                        )}`,
                        newContent // 表單上的Data
                      )
                      .then(function (response) {
                        console.log(_this.product);
                        //修改產品庫存
                        _this.product.inventory =
                          parseInt(_this.product.inventory) -
                          parseInt(_this.targetItem.quantity); //新的商品庫存-表單上的數量
                        axios
                          .patch(
                            `http://localhost:3000/products/${parseInt(
                              _this.targetItem.productId
                            )}`,
                            _this.product
                          )
                          .then(function (response) {
                            _this.$router.push("/list");
                          });
                      })
                      .catch(function (error) {
                        console.log(error);
                        throw error;
                      });
                  });
              })
              .catch(function (error) {
                console.log(error);
                throw error;
              });
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
  created() {
    let _this = this;
    axios
      .get("http://localhost:3000/products")
      .then(function (response) {
        _this.productData = response.data;
        _this.oldProductData = JSON.parse(JSON.stringify(response.data)); //舊商品Data
        // _this.productData.forEach((item) => console.log(item));
        console.log(_this.productData);
      })
      .catch(function (error) {
        console.log(error);
        throw error;
      });
    //訂單明細
    axios
      .get(`http://localhost:3000/orders/${parseInt(_this.$route.params.id)}`)
      .then(function (response) {
        _this.targetItem = response.data;
        //特別抓取舊的購買數量，要用於之後的庫存計算
        _this.oldQuantity = parseInt(response.data.quantity);
        console.log("舊的", _this.oldQuantity);
        _this.oldData = JSON.parse(JSON.stringify(response.data)); //舊Data
        console.log(_this.oldData);
        _this.productData.forEach((e) => {
          if (e.id == _this.targetItem.productId) {
            _this.product = e;
          }
        });
      })
      .catch(function (error) {
        console.log(error);
        throw error;
      });
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
