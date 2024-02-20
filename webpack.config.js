const glob = require('glob')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const path = require('path')
const webpack = require("webpack");
const constant = require('./constant')
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: () => {
    const paths = [...glob.sync('./src/css/**', {nodir: true}), ...glob.sync('./src/js/**', {nodir: true})]
    let result = {}
    for (let i = 0; i < paths.length; i++) {
      if (paths[i].endsWith('.woff2')) {
        continue
      }
      let k, li = paths[i].lastIndexOf('.')
      if (li >= 0) {
        // 不要src
        k = paths[i].substring(3, li)
      } else {
        throw new Error('文件没有拓展符')
      }
      result[k] = './' + paths[i]
    }
    return result
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/source",
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
              modules: false
            }
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require('sass'),
              additionalData: '$ARTICLE_MAX_WIDTH_PX: ' + constant.ARTICLE_MAX_WIDTH_PX + ';'
            }
          },
        ],
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        // 实践不支持tsx，因为是vue+tsx，找不到相关的loader
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/images',
          to: './images'
        },
        {
          from: './src/static',
          to: './static'
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new webpack.DefinePlugin(constant)
  ],
  watchOptions: {
    ignored: ['**/node_modules']
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  }
}
