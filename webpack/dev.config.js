const baseConfig = require('./base.config.js');
const merge = require('webpack-merge');
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');

const serve = new Serve({
  host: 'localhost',
  static: ['../../public/'],
  open: true,
  liveReload: true
});

module.exports = merge(baseConfig, {
  mode: 'development',  
  devtool: 'eval-source-map',
  entry: {
    app: ['webpack-plugin-serve/client']
  },
  plugins: [
    serve
  ],
  watch: true
});
