const {defineConfig} = require('@vue/cli-service')
let webpack = require('webpack')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,   //关闭eslint校验
    configureWebpack: {
        // disable performance hints
        performance: {
            hints: false
        },
        plugins: [
            new webpack.optimize.MinChunkSizePlugin({minChunkSize: 10000})
        ]
    },

    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',

    outputDir: 'dist',
    crossorigin: "anonymous",
    devServer: {
        allowedHosts: ['localhost:5678'],
        port: 8888,
		proxy: {
      '/api': {
        target: 'http://localhost:5678',//代理地址，这里设置的地址会代替axios中设置的baseURL
        secure: false, //如果是https接口需要进行此配置 
        changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
        //pathRewrite方法重写url
        pathRewrite: {
          // '^/api': '/aaa' //如果没有pathRewrite属性 调用的接口就是http://cloud/api/xxx/xxxx 如果有 pathRewrite属性 调用的接口就是 http://cloud/aaa/xxx/xxxx
		  '^/api': '/api' //如果没有pathRewrite属性 调用的接口就是http://cloud/api/xxx/xxxx 如果有 pathRewrite属性 调用的接口就是 http://cloud/aaa/xxx/xxxx
         }
        }
      }    
    }
})
