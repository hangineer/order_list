import Vue from "vue";
import VueRouter from "vue-router";
// import AddList from "../views/AddList.vue";
// import ListData from "../views/ListData.vue";

//只import views內的需要用到的page
import List from "../views/List.vue";
import ListInfo from "../views/ListInfo/_id.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: List,
  },
  // {
  //   path: "/list",
  //   name: "ListData",
  //   component: ListData,
  // },
  // {
  //   path: "/add",
  //   name: "AddList",
  //   component: AddList,
  // },
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
