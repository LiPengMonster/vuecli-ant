/*
 * @Author: 吴占超
 * @Date: 2018-09-20 20:05:17
 * @Last Modified by: 吴占超
 * @Last Modified time: 2019-03-31 20:23:43
 * vue配置文件
 */
module.exports = {
  // 基本路径
  // baseUrl: process.env.NODE_ENV === 'production' ? '/wxapp' : '/',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/public' : '/',
  // 输出文件目录
  outputDir: '../../../egg/eggcli-build/app/public',
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
    // 配置css模块
    loaderOptions: {
      // 向预处理器 Loader 传递配置选项
      less: {
        // 配置less（其他样式解析用法一致）
        javascriptEnabled: true // 设置为true
      }
    }
  }
}
