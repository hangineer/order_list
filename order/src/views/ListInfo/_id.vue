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
    // product() {
    //   if (this.productData.find((e) => e.id === this.selectedProduct)) {
    //     return this.productData.find((e) => e.id === this.selectedProduct);
    //   } else {
    //     return {
    //       // id: -1,
    //       // name: "",
    //       // imgUrl: null,
    //       // quantity: 0,
    //       // price: 0,
    //       // note: "",
    //     };
    //   }
    // },
  },
  methods: {
    saveBtn(index, rows) {
      let _this = this;
      _this.$refs.targetItem.validate((valid) => {
        //判斷表格不為空且產品庫存要大於購買數量
        if (valid && this.product.inventory > this.targetItem.quantity) {
          axios
            .patch(
              `http://localhost:3000/orders/${parseInt(this.$route.params.id)}`,
              _this.targetItem
            )
            .then(function (response) {
              //todo 修改商品庫存
              _this.product.inventory -= parseInt(_this.targetItem.quantity);
              axios
                .patch(
                  `http://localhost:3000/products/${parseInt(
                    _this.targetItem.productId
                  )}`,
                  _this.product
                )
                .then(function (response) {
                  _this.$router.push("/list");
                  // this.$store.dispatch("listModule/updateTableData",this.targetItem);
                });
            })
            .catch(function (error) {
              console.log(error);
              throw error;
            });
        } else if (this.product.inventory < this.targetItem.quantity) {
          alert("購買數量需小於商品庫存");
        } else {
          alert("請確實填寫");
        }
      });
      // let obj = {
      //   index,
      //   rows,
      // };
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
        console.log("test", _this.productData);
        // _this.productData.forEach((item) => console.log(item));
        // console.log(_this.productData);
      })
      .catch(function (error) {
        console.log(error);
        throw error;
      });
    //訂單明細
    axios
      .get(`http://localhost:3000/orders/${parseInt(this.$route.params.id)}`)
      .then(function (response) {
        _this.targetItem = response.data;
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
