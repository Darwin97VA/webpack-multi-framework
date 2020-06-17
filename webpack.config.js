const fs = require('fs')
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const nodeModules = path.resolve(__dirname, 'node_modules');

module.exports = (env, options) => {
  const { mode, proyecto } = options 

  fs.rmdirSync('./dist/' + proyecto, { recursive: true })    

  const plugins = require('./projects/' + proyecto + '/plugins.js')

  return {
    devServer: {
      contentBase: path.join(__dirname, 'dist', proyecto),
      compress: true,
      port: 9000,
    },
    entry: './projects/' + proyecto + '/src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist', proyecto),
        filename: 'bundle.js',
        libraryTarget: 'var',
        library: proyecto,
        globalObject: 'this',
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: './projects/' + proyecto + '/src/index.html'
      }),
      new CopyPlugin({
        patterns: plugins.map(asset => {
            var from, to
            if(typeof asset === 'object') {
                from = path.resolve(__dirname, asset.from)
                to = path.resolve(__dirname, asset.to)
            } else {
                from = path.resolve(__dirname, asset)
                to = path.resolve(__dirname, 'dist', proyecto, 'plugins', asset.split('/').pop())
            }
            return { from, to }
        })
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                  name: '[name].[ext]',
                  outputPath: 'assets/images/'
              }
            },
          ],
        },
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, 
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    optimization: {
      minimize: mode === 'production',
      minimizer: [
        new TerserPlugin({
          extractComments: true,
        }),
      ],
    },
  }
}