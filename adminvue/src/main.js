import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import api from "./config/api"; //导入配置好的接口api统一封装
import request from "./config/http"; //导入配置好的接口请求封装

Vue.use(ElementUI);
Vue.prototype.Api = api;
Vue.prototype.request = request;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
