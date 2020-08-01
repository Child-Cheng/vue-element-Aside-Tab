import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id: "123456",
    openedTab: ["BasicIndex"],
    openedTitle: ["首页"],
    activeTab: "",
    // 初始化状态值
    user: {},
    token: "",
    headerData: {}
  },
  mutations: {
    setUser(state, user) {
      sessionStorage.setItem("user", JSON.stringify(user));
      state.user = user;
    },
    setToken(state, token) {
      sessionStorage.setItem("token", token);
      state.token = token;
    },
    LOGOUT(state) {
      sessionStorage.clear();
      state.user = {};
      state.token = null;
    },
    setheaderData(state, data) {
      state.headerData = data;
    },
    addTab(state, obj) {
      state.openedTab.push(obj["componentName"]);
      state.openedTitle.push(obj["name"]);
    },
    changeTab(state, componentName) {
      state.activeTab = componentName;
    },
    deductTab(state, componentName) {
      let index = state.openedTab.indexOf(componentName);
      state.openedTab.splice(index, 1);
    }
  },
  getters: {
    user(state) {
      if (Object.keys(state.user).length === 0) {
        state.user = JSON.parse(sessionStorage.getItem("user"));
      }
      return state.user;
    },
    token(state) {
      return state.token;
    },
    headerData(state) {
      return state.headerData;
    }
  }
});
