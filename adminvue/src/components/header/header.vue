<template>
  <el-row>
    <el-col :span="4"><div class="grid-content bg-purple">logo</div></el-col>
    <el-col :span="18">
      <div
        class="head-wrap"
        style="text-align: center;display: inline-block;"
      ></div
    ></el-col>
    <el-col :span="2">
      <div class="head-wrap" style="text-align: center;">
        <span class="hidden-xs">{{ UserName }}</span>
        <!-- <i class="el-icon-switch-button"></i> -->
      </div></el-col
    >
  </el-row>
</template>

<script>
export default {
  name: "navHeader",
  data() {
    return {
      UserName: "",
      headerData: {}
    };
  },
  created: function() {
    var ve = this;
    if (ve.$store.getters.user != null) {
      ve.UserName = ve.$store.getters.user[0].username;
    }
  },
  methods: {
    LoginOut() {
      let ve = this;
      ve.$messageBox
        .confirm("此操作将退出系统, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          ve.$store.commit("LOGOUT");
          ve.$router.push({ path: "/" });
          ve.$message({
            type: "success",
            message: "登出成功!"
          });
        })
        .catch(() => {
          ve.$message({
            type: "info",
            message: "取消登出"
          });
        });
    }
  },
  components: {}
};
</script>

<style scoped></style>
