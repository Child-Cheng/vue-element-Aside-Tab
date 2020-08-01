<template>
  <div class="dormitory">
    <div class="searchWord">
      <div style="display: inline-block">搜索：</div>
      <el-input
        v-model="search"
        style="display: inline-block;width: 1300px"
        placeholder="请输入搜索内容"
      >
      </el-input
      ><el-button @click="GetPageSearchList">搜索</el-button>
    </div>
    <div class="dormitoryData">
      <el-table
        ref="dormitoryTable"
        :data="tables"
        tooltip-effect="dark"
        stripe
        style="width: 100%"
      >
        <el-table-column type="selection" width="45"></el-table-column>
        <el-table-column label="主键" type="id" width="65"></el-table-column>
        <el-table-column label="商品ID" prop="assignmentid"> </el-table-column>
        <el-table-column label="商品类型" prop="releasetimestamp">
        </el-table-column>
        <el-table-column label="商品内容" prop="shopname"> </el-table-column>
        <el-table-column label="价格" prop="commissionstring">
        </el-table-column>
        <!-- <el-table-column label="URL" prop="execg"> </el-table-column>
        <el-table-column label="认识年限" prop="year"> </el-table-column>
        <el-table-column label="成名之作" prop="works"> </el-table-column> -->
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "BasicIndex",
  data() {
    return {
      tables: [],
      pageIndex: 1,
      pageSize: 5,
      search: "",
      count: "" // 倒计时
    };
  },
  created: function() {
    this.getData();
  },
  methods: {
    getData() {
      let ve = this;
      var param = {
        pageIndex: ve.pageIndex,
        pageSize: ve.pageSize,
        name: ve.search
      };
      ve.request.post(
        ve.Api.getData.GetPageList,
        JSON.stringify(param),
        res => {
          if (res.code == 200) {
            ve.tables = res.data;
          }
        }
      );
    },
    GetPageSearchList() {
      let ve = this;
      if (ve.search == "") {
        ve.$message("请输入搜索关键字");
        return false;
      }
      if (ve.$store.getters.user != null) {
        let user = ve.$store.getters.user;
        var param = {
          pageIndex: ve.pageIndex,
          pageSize: ve.pageSize,
          name: ve.search,
          userName: user.username,
          id: user.id
        };
        ve.request.post(
          ve.Api.getData.GetPageSearchList,
          JSON.stringify(param),
          res => {
            if (res.code == 200) {
              if (res.data == null) {
                ve.$message(res.msg);
              }
              ve.tables = res.data;
            }
          }
        );
      } else {
        ve.$message("请先登录再使用搜索功能");
        ve.goChoicePeople();
      }
    },
    //2秒后跳转到选人加分界面
    goChoicePeople() {
      const TIME_COUNT = 2;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
            // 跳转到选人加分界面
            this.$router.push("/");
          }
        }, 1000);
      }
    }
  }
};
</script>

<style scoped></style>
