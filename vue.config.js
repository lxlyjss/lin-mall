module.exports = {
  productionSourceMap: false,
  //反向代理的配置
  devServer: {
    proxy: {
      "/mock": {
        target: process.env.VUE_APP_MOCK_API_URL, //目标地址
        ws: true, //// 是否启用websockets
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: { "^/mock": "/" }, //这里重写路径
      },
      "/api": {
        target: process.env.VUE_APP_BASE_API_URL, //目标地址
        ws: true, //// 是否启用websockets
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: { "^/api": "/" }, //这里重写路径
      }
    },
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-px2rem")({
            //配置项，详见官方文档
            remUnit: 37.5, // 换算的基数
          }),
        ],
      },
      sass: {
        // prependData: `@import "@/scss/base.scss";`
        // sass-loader超过v8版本之后的写法
        additionalData: `@import "@/scss/base.scss";`
      }
    },
  },
};
