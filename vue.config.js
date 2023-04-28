module.exports = {
  chainWebpack: config => {
    config.module
      .rule('js')
      .include.add(/node_modules\/v-chart-plugin/)
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        // modify the options...
        return options
      })
  }
}