<template>
  <el-container style="height: 100%;min-height:100vh;" direction="vertical">
    <el-header class="header">
      <navHeader></navHeader>
    </el-header>
    <el-container>
      <el-aside width="200px" class="el-aside">
        <navMenu></navMenu>
      </el-aside>
      <el-main>
        <navMain></navMain>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import navMenu from "@/components/navMenu/navMenu";
import navHeader from "@/components/header/header";
import navMain from "@/components/navMain/navMain";

export default {
  components: {
    navMenu,
    navHeader,
    navMain
  }
};
</script>

<style>
.header {
  background: #409eff;
  line-height: 60px;
}
.el-container {
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.el-aside {
  display: block;
  /* position: absolute; */
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
</style>
