<!--本页为tab标签-->
<template>
  <div>
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      closable
      @tab-remove="removeTab"
      @tab-click="handleClickTab($event.name)"
    >
      <el-tab-pane
        :key="item.name"
        v-for="item in editableTabs"
        :label="item.title"
        :name="item.name"
      >
      </el-tab-pane>
    </el-tabs>
    <!--动态组件 ，更具is的值来确定渲染哪个组件 -->
    <component :is="componentId"></component>
  </div>
</template>

<script>
export default {
  name: "navMain",
  data() {
    return {
      componentId: () =>
        import("@/components/navMain/mainComponents/BasicIndex.vue"),
      editableTabsValue: "BasicIndex",
      editableTabs: [
        {
          title: "首页",
          name: "BasicIndex"
        }
      ],
      tabIndex: 1,
      openedTab: ["BasicIndex"]
    };
  },
  methods: {
    handleClickTab(route) {
      this.$store.commit("changeTab", route);
      this.IsShowComponents(route);
      // this.$router.push(route);
    },
    removeTab(targetName) {
      // 首页不允许被关闭（为了防止el-tabs栏中一个tab都没有）
      if (targetName === "BasicIndex") {
        return false;
      }
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.$store.commit("deductTab", targetName);
      let deductIndex = this.openedTab.indexOf(targetName);
      this.openedTab.splice(deductIndex, 1);
      this.IsShowComponents(activeName);
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      if (this.openedTab.length === 0) {
        this.$store.commit("addTab", "BasicIndex");
        this.IsShowComponents("BasicIndex");
        // this.$router.push("BasicIndex");
      }
    },
    IsShowComponents(newTab) {
      this.componentId = () =>
        import("@/components/navMain/mainComponents/" + newTab + ".vue");
    }
  },
  computed: {
    getOpenedTab() {
      return this.$store.state.openedTab;
    },
    changeTab() {
      return this.$store.state.activeTab;
    }
  },
  watch: {
    getOpenedTab(val) {
      if (val.length > this.openedTab.length) {
        // 添加了新的tab页
        // 导致$store.state中的openedTab长度
        // 大于
        // 标签页中的openedTab长度
        // 因此需要新增标签页
        let newTitle = this.$store.state.openedTitle[val.length - 1];
        let newTab = val[val.length - 1]; // 新增的肯定在数组最后一个
        this.IsShowComponents(newTab);
        ++this.tabIndex;
        this.editableTabs.push({
          title: newTitle,
          name: newTab,
          content: ""
        });
        this.editableTabsValue = newTab;
        this.openedTab.push(newTab);
      }
    },
    changeTab(val) {
      // 监听activetab以实现点击左侧栏时激活已存在的标签
      if (val !== this.editableTabsValue) {
        this.editableTabsValue = val;
        this.IsShowComponents(val);
      }
    }
  },
  created() {
    // 刷新页面时（F11)
    // 因为<router-view>的<keep-alive>，会保留刷新时所在的router
    // 但是tab标签页因为刷新而被重构了，tab没有了
    // 因此需要将router回到index
    this.$router.push("Index");
  }
};
</script>

<style scoped></style>
