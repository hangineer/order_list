import Vue from "vue";
import VueRouter from "vue-router";

//views內的page
import List from "../views/List.vue";
import ListInfo from "../views/ListInfo/_id.vue";
import Admin from "../views/Admin.vue";
import AddList from "../views/AddList.vue";
import AddProduct from "../views/AddProduct.vue";
import Product from "../views/Product.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Admin",
    component: Admin,
  },
  //訂單相關
  {
    path: "/list",
    name: "List",
    component: List,
    // children: [

    // ],
  },
  {
    path: "/list/:id",
    name: "ListInfo",
    component: ListInfo,
  },
  {
    path: "/add",
    name: "AddList",
    component: AddList,
  },
  //產品相關
  {
    path: "/product",
    name: "Product",
    component: Product,
    // children: [
    //   {
    //     path: "test",
    //     name: AddProduct,
    //     component: AddProduct,
    //   },
    // ],
  },
  {
    path: "/addProduct",
    name: AddProduct,
    component: AddProduct,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
