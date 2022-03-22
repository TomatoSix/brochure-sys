module.exports = {
  // 可以配置代理服务器、配置别名等等等等
  // publicPath: './'
  // 设置代理
  devServer: {
    proxy: {
      '^/api': {
        // target: 'http://152.136.185.210:5000',
        target: 'http://127.0.0.1:8000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        // 设置别名，@表示src, 只需要直接components即可
        components: '@/components'
      }
    }
  }
}
