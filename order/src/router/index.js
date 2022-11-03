import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddList from "../views/AddList.vue";
import ListData from "../views/ListData.vue";
import ListInfo from "../views/ListInfo/_id.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/list",
    name: "ListData",
    component: ListData,
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
