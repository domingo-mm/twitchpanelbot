module.exports = {
  devServer: {
    host: 'localhost'
    },
    pluginOptions: {
      electronBuilder: {
        mainProcessFile: 'src/background.js',
        chainWebpackRendererProcess(config) {
          config.plugins.delete('workbox')
          config.plugins.delete('pwa')
        },
        preload: 'src/preload.js',
      }
    },
    publicPath: process.env.NODE_ENV  ===  'production'  ?  './'  :  '/'
  }