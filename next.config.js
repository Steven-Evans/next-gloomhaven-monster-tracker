const webpack = require('webpack');
const { parsed: localEnv } = require('dotenv').config();

module.exports = {
  webpack: (config) => {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));

    return config
  }
};
