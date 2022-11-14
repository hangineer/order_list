import Vue from "vue";
import VueRouter from "vue-router";

//views內的page
import List from "../views/List.vue";
import ListInfo from "../views/ListInfo/_id.vue";
import Admin from "../views/Admin.vue";
import AddList from "../views/AddList.vue";
import AddProduct from "../views/AddProduct.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Admin",
    component: Admin,
  },

  {
    path: "/list",
    name: "List",
    component: List,
  },
  {
    path: "/add",
    name: "AddList",
    component: AddList,
  },
  {
    path: "/:id",
    name: "ListInfo",
    component: ListInfo,
  },
  {
    path: "/product",
    name: "AddProduct",
    component: AddProduct,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
