<template>
  <div>
    <div>
      <!-- <a
        url="https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fblogger&access_type=offline&include_granted_scopes=true&response_type=code&state=12312312312312&redirect_uri=https://www.javalc.com&client_id=412203340733-u967qfcquf5od4fdr5h7lnc4g71d35rh.apps.googleusercontent.com"
        >授权</a
      > -->
    </div>
    <el-form
      ref="loginForm"
      :model="form"
      :rules="rules"
      label-width="80px"
      class="login-box"
    >
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="账号" prop="username">
        <el-input
          type="text"
          placeholder="请输入账号"
          v-model="form.username"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="form.password"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="onSubmit('loginForm')"
          >登录</el-button
        >
      </el-form-item>
    </el-form>

    <el-dialog
      title="温馨提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>请输入账号和密码</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: ""
      },

      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        username: [
          { required: true, message: "账号不可为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不可为空", trigger: "blur" }]
      },

      // 对话框显示和隐藏
      dialogVisible: false
    };
  },
  created: function() {
    // var params = {
    //   appid: "wxb5c0cfee805aa269",
    //   secret: "f40acbc565de48d2c3d43e62c160f8e0",
    //   code: "",
    //   grant_type: "authorization_code"
    // };
    // ve.request.get(ve.Api.wxToken.token, res => {
    //   console.log(res.data);
    //   if (res.code == 200) {
    //     console.log(res.data);
    //   }
    // });
    // this.GoLogin();
  },
  methods: {
    onSubmit(formName) {
      let ve = this;
      var param = {
        passWord: ve.form.password,
        userName: ve.form.username
      };
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          ve.request.post(ve.Api.login.login, JSON.stringify(param), res => {
            if (res.code == 200) {
              if (res.data != null) {
                ve.$store.commit("setUser", res.data);
                this.$router.push("/Index");
              }
            } else {
              this.$router.push("/");
            }
          });
          // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
        } else {
          this.dialogVisible = true;
          return false;
        }
      });
    },
    GoLogin() {
      let ve = this;
      var param = {
        password: ve.password,
        userName: ve.username
      };
      console.log("来了");
      ve.request.post(ve.Api.login.login, JSON.stringify(param), res => {
        if (res.code == 200) {
          console.log(res.data);
        }
      });
    },
    handleClose() {}
  }
};
</script>

<style scoped>
.login-box {
  border: 1px solid #dcdfe6;
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
</style>
