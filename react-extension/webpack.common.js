const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  entry: {
    popup: path.resolve('src/popup/popup.tsx'),
    options: path.resolve('src/options/options.tsx'),
    background: path.resolve('src/backgroundScript/background.ts'),
    contentScript: path.resolve('src/contentScript/ContentScript.ts'),
  },
  module: {
    rules: [
      {
        use: 'ts-loader',
        test: /\.tsx?$/,
        exclude: /node_modules/,
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/i,
      },
      {
        type: 'asset/resources',
        test: /\.(jpg|jpeg|pmg|woff|woff2|eot|svg)%/, //import a png file directly into tsx file, some modules are pacced with these files
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false, //distribution folder to be wiped out only time we switch from development to pruduction or vice verca
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve('static'),
          to: path.resolve('dist'),
        },
      ],
    }),
    ...getHtmlPlugins(['popup', 'options']),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  output: {
    filename: '[name].js',
    path: path.resolve('dist'),
  },

  optimization: {
    splitChunks: {
      chunks: 'all', //allows for chunks to share modules, sharing single module
    },
  },
}

function getHtmlPlugins(chunks) {
  return chunks.map(
    (chunk) =>
      new HtmlPlugin({
        title: 'React Extension',
        filename: `${chunk}.html`,
        chunks: [chunk],
      })
  )
}
