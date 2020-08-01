// vue.config.js 配置说明
// 这里只列一部分，具体配置惨考文档啊
// const PrerenderSPAPlugin = require("prerender-spa-plugin");
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
// const path = require("path");
module.exports = {
  // lintOnSave:false,

  chainWebpack: config => {
    config.plugins.delete("fork-ts-checker"); // 禁用fork-ts-checker
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    //extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS requireModuleExtension for all css / pre-processor files.
    requireModuleExtension: false
  },
  //baseUrl 从 Vue CLI 3.3 起已弃用，请使用publicPath
  publicPath: process.env.NODE_ENV === "production" ? "/" : "./",
  // outputDir: 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）
  outputDir: "dist",
  //用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: "public",

  filenameHashing: false,

  lintOnSave: true,
  // productionSourceMap：{ type:Bollean,default:true } 生产源映射
  // 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
  productionSourceMap: false,
  // devServer:{type:Object} 3个属性host,port,https
  // 它支持webPack-dev-server的所有选项
  devServer: {
    port: 8088, // 端口号
    // host: "localhost",
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    proxy: {
      "/apiTest": {
        target: "http://localhost:8080", //设置调用接口域名和端口号别忘了加http
        secure: true, // 如果是https接口，需要配置这个参数
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          "^/apiTest": "/" //这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
          // 比如我要调用'http://0.0:300/user/add'，直接写‘/api/user/add’即可 代理后地址栏显示/
        }
      },
      "/apis": {
        target: "http://xxx.xxx.com", //设置调用接口域名和端口号别忘了加http
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          "^/apis": "/"
        }
      }
    }
  }
};
