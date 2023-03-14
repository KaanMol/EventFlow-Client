const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rootDirectory = path.resolve(__dirname + "/../");
const coreDirectory = path.resolve(__dirname + "/../core/");
console.log(rootDirectory)
const webDirectory = path.resolve(__dirname);
const {presets, plugins} = require(`${rootDirectory}/babel.config.js`);
const compileNodeModules = [
  // Add every react-native package that needs compiling
  // 'react-native-gesture-handler',
].map((moduleName) => path.resolve(rootDirectory, `node_modules/${moduleName}`));
const babelLoaderConfiguration = {
  test: /\\\\.ts$|tsx?$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(rootDirectory, 'index.web.js'), // Entry to your application
    path.resolve(coreDirectory, 'App.tsx'), // Change this to your main App file
    path.resolve(coreDirectory),
    path.resolve(rootDirectory, 'component'),
    ...compileNodeModules,
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets,
      plugins,
    },
  },
};const svgLoaderConfiguration = {
  test: /\\\\.svg$/,
  use: [
    {
      loader: '@svgr/webpack',
    },
  ],
};
const imageLoaderConfiguration = {
  test: /\.(png|jpe?g|gif)$/i,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
    },
  },
};

module.exports = {
  entry: {
    app: path.join(rootDirectory, 'index.web.js'),
  },
  output: {
    path: path.resolve(rootDirectory, 'dist'),
    publicPath: '/',
    filename: 'rnw.bundle.js',
  },
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.js', '.js'],
    alias: {
      'react-native$': 'react-native-web',
    },
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      svgLoaderConfiguration,
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(webDirectory, '/index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      // See: <https://github.com/necolas/react-native-web/issues/349>
      __DEV__: JSON.stringify(true),
    }),
  ],
};