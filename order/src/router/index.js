import Vue from "vue";
import VueRouter from "vue-router";

//import views內的需要用到的page
import List from "../views/List.vue";
import ListInfo from "../views/ListInfo/_id.vue";
import Admin from "../views/Admin.vue";
import AddList from "../views/AddList.vue";
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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
