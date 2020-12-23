const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  publicPath: "./",
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
        // target: process.env.VUE_APP_BASE_API_LQ_URL, // 李强服务器地址
        ws: true, //// 是否启用websockets
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {}, //这里重写路径
      },
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
        additionalData: '@import "@/scss/base.scss";',
      },
    },
  },
  configureWebpack: (config) => {
    if (process.env.VUE_APP_ENV !== "dev") {
      config.optimization = {
        runtimeChunk: "single",
        splitChunks: {
          chunks: "all",
          maxInitialRequests: Infinity,
          minSize: 20000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )[1];
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `lib.${packageName.replace("@", "")}`;
              },
            },
          },
        },
      };
    }
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV !== "production" && process.env.VUE_APP_ENV) {
      config.output.filename("[name].[hash:8].js").end();
      config.output.chunkFilename("[name]_[contenthash:8].js").end();
    }
    config.plugin("compressionPlugin").use(
      new CompressionPlugin({
        test: /\.js$|\.html$|.\css/, // 匹配文件名
        threshold: 10240, // 对超过10k的数据压缩
        deleteOriginalAssets: false, // 不删除源文件
      })
    );
  },
};
