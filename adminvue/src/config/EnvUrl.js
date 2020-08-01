//根据不同的环境更改不同的baseUrl
let apiUrl = "/apiTest";

if (process.env.NODE_ENV == "development") {
  apiUrl = "/apiTest"; //获取vue.config.js\devServer配置
} else if (process.env.NODE_ENV == "production") {
  apiUrl = "/apiTest";
}

export default apiUrl /*导出baseUrl*/;
