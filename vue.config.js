/*
 * @Author: 李鹏
 * @Date: 2018-09-20 20:05:17
 * @Last Modified by: 李鹏
 * @Last Modified time: 2019-08-08 18:59:06
 * vue配置文件
 */
const path = require('path')
module.exports = {
  // 基本路径
  // baseUrl: process.env.NODE_ENV === 'production' ? '/' : '/',
  publicPath: process.env.NODE_ENV === 'production' ?
    '/' : '/',

  // 输出文件目录
  outputDir: '../../../egg/eggcli-build/app/public',

  assetsDir: 'assets',

  // outputDir: 'dist',
  devServer: {
    // 前端端口
    port: 8089,
    // 代理地址
    proxy: 'http://127.0.0.1:7001'
    // mock.js
    // before(app) {
    //   app.get('')
    // }
  },

  css: {
    extract: true,
    sourceMap: false,
    // 配置css模块
    loaderOptions: {
      // 向预处理器 Loader 传递配置选项
      less: {
        modifyVars: {
          'tooltip-bg': 'white',
          'tooltip-max-width': '300px',
          // 'layout-header-background': '#202325'
          'popover-min-width': '0px',
          'popover-color': 'black',
          'border-radius-base': '0'
        },
        globalVars: {},
        // 配置less（其他样式解析用法一致）
        javascriptEnabled: true // 设置为true
      }
    },
    modules: false
  },

  configureWebpack: config => {
    console.log(config)
    config.performance = {
      hints: 'warning',
      // 入口起点的最大体积
      maxEntrypointSize: 50000000,
      // 生成文件的最大体积
      maxAssetSize: 30000000,
      // 只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js')
      }
    }
  },
  chainWebpack: config => {
    const imagesRule = config.module.rule('images')
    imagesRule.uses.clear()
    imagesRule.use('file-loader')
      .loader('url-loader')
      .options({
        limit: 1000,
        fallback: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash:8].[ext]'
          }
        }
      })
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/less/global.less')
      ]
    }
  },

  lintOnSave: false
}
