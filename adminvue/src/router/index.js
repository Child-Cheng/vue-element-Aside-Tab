import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../Views/Login.vue";
import Index from "../Views/Index.vue";
import BasicIndex from "@/components/navMain/mainComponents/BasicIndex";
import BasicLayout from "@/components/navMain/mainComponents/BasicLayout";
import BasicContainer from "@/components/navMain/mainComponents/BasicContainer";
import BasicCheckbox from "@/components/navMain/mainComponents/BasicCheckbox";
import BasicRadio from "@/components/navMain/mainComponents/BasicRadio";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/Index",
    name: "Index",
    component: Index,
    meta: {
      title: "Index",
      type: "login" // 不需要鉴权
    }
  },
  {
    path: "/BasicIndex",
    name: "BasicIndex",
    component: BasicIndex
  },
  {
    path: "/BasicLayout",
    name: "BasicLayout",
    component: BasicLayout
  },
  {
    path: "/BasicContainer",
    name: "BasicContainer",
    component: BasicContainer
  },
  {
    path: "/BasicCheckbox",
    name: "BasicCheckbox",
    component: BasicCheckbox
  },
  {
    path: "/BasicRadio",
    name: "BasicRadio",
    component: BasicRadio
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
/* 路由拦截器 路由跳转前的操作 */
router.beforeEach((to, from, next) => {
  // const user = router.app.$options.store.getters.user;
  // if (to.meta.title) {
  //   document.title = to.meta.title;
  // }
  // const type = to.meta.type;
  // 判断该路由是否需要登录权限
  // if (type === "login") {
  //   if (user != null) {
  //     next();
  //   } else {
  //     next("/");
  //   }
  // } else {
  next(); // 确保一定要有next()被调用
  // }
});
/* 路由拦截器 路由跳转后的操作 */
// eslint-disable-next-line no-unused-vars
router.afterEach(to => {});
export default router;
