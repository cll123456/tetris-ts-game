const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = (options = {}) => {
  console.log(options,'------')
  return {
    mode: options.production ? 'production' : 'development',
    entry: "./src/index.ts",
    output: {
      path: path.resolve(__dirname, 'docs'),
      filename: options.production ? 'js/[name].[chunkhash:5].js' : '[name].js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html'
      }),
      new CleanWebpackPlugin()
    ],
      // 控制台输出的样式控制
      stats: {
        colors: true,
        modules: false
    },
    devtool: 'eval',
   
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: [".ts", ".tsx", ".js"]
    },
    module: {
      rules: [
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        { test: /\.tsx?$/, loader: "ts-loader" }
      ]
    }
  }
}