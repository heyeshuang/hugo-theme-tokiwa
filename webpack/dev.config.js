const baseConfig = require('./base.config.js');
const { merge } = require('webpack-merge');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  watch: true
});