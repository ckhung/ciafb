// https://alligator.io/tooling/webpack-gulp-grunt-browserify/
// What Tool to Use: webpack vs Gulp vs Grunt vs Browserify
// https://www.valentinog.com/blog/webpack/
// A mostly complete guide to webpack 5 (2020)
//
// https://webpack.js.org/guides/getting-started/
// webpack Getting Started
//
// https://gist.github.com/marcstober/c34bb4bdf7ef622cb24d6675723749bd
// the simplest way to make jQuery DataTables work with npm and webpack
// https://gist.github.com/jrunestone/2fbe5d6d5e425b7c046168b6d6e74e95
// slightly more complicated way
// https://www.npmjs.com/package/datatables
//
// https://neighborhood999.github.io/webpack-tutorial-gitbook/Part1/
// Webpack 簡介
// https://hsiangfeng.github.io/categories/webpack/
// Webpack 5 走起!
// https://ithelp.ithome.com.tw/users/20069901/ironman/1074
// 使用 webpack 模組化你的程式碼，讓人生更美好
//
//
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.csv$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset/resource'
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html")
    })
  ]
};
