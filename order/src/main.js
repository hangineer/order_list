import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//element-ui
import Element from "element-ui";
Vue.use(Element, { size: "small", zIndex: 3000 });
import "element-ui/lib/theme-chalk/index.css";
import { Button, Select, Form, FormItem } from "element-ui";
Vue.use(Element);
Vue.use(Button);
Vue.use(Select);
Vue.use(Form);
Vue.use(FormItem);

// vueEasyTable
import "vue-easytable/libs/theme-default/index.css";
import VueEasytable from "vue-easytable";
Vue.use(VueEasytable);

// todo
// export const itemBus = new Vue({
//   methods: {
//     addItem(id, name, price, note) {
//       this.$emit("addedItem", id, name, price, note);
//     },
//   },
// });

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
Vue.config.productionTip = false;
