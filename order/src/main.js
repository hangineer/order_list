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

//element plus
// import "../public/element-variables.scss";
// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";
// Vue.use(ElementPlus);

//js-base64
import { Base64 } from "js-base64";
Vue.use(Base64);

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
Vue.config.productionTip = false;
