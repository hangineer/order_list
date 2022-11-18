import Vue from "vue";
import VueRouter from "vue-router";

//views內的page
import List from "../views/List.vue";
import ListInfo from "../views/ListInfo/_id.vue";
import Admin from "../views/Admin.vue";
import AddList from "../views/AddList.vue";
import AddProduct from "../views/AddProduct.vue";
import Product from "../views/Product.vue";
import productInfo from "../views/productInfo/_id.vue";
import NotFound from "../views/NotFound/NotFound.vue";

Vue.use(VueRouter);
// https://juejin.cn/post/7023993296540139528
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
    beforeEnter: (to, from, next) => {
      if (JSON.parse(sessionStorage.getItem("userData")).role != "user") {
        alert("無法修改訂單");
        next({ name: "List" });
      } else {
        next();
      }
    },
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
    beforeEnter: (to, from, next) => {
      if (JSON.parse(sessionStorage.getItem("userData")).role == "user") {
        console.log("無法修改訂單");
        next({ name: "List" });
      } else {
        next();
      }
    },
  },
  {
    path: "/product/:id",
    name: "productInfo",
    component: productInfo,
  },
  {
    path: "/addProduct",
    name: "AddProduct",
    component: AddProduct,
  },
  {
    path: "/404",
    name: "NotFound",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // console.log(to);
  if (to.name != "Admin") {
    if (sessionStorage.getItem("userData")) {
      next(); //放行
    } else {
      // next({ name: "NotFound" });
      next({ name: "Admin" });
    }
  } else {
    next();
  }
});

export default router;
