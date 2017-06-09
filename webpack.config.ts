const path = require('path'),
  webpack = require('webpack');

const IS_PROD: boolean = process.argv.indexOf('-p') > -1;

module.exports = {
  devtool: IS_PROD ? 'source-map' : 'eval',
  entry: path.join(__dirname, 'demo', 'entry.ts'),
  output: {
    filename: 'demo.js',
    path: IS_PROD ? path.join(__dirname, 'demo') : __dirname
  },
  module: {
    rules: [{
      test: /\.ts$/,
      loader: 'tslint-loader?emitErrors=false&failOnHint=false',
      exclude: /node_modules/,
      enforce: 'pre'
    }, {
      test: /\.ts$/,
      loader: 'awesome-typescript-loader',
      exclude: /node_modules/
    },
    {
      test: /\.html$/,
      loaders: [
        "raw-loader",
      ]
    },]
  },
  resolve: {
    extensions: ['.ts', '.js', '.html']
  },
  devServer: {
    port: 8000,
    inline: true,
    hot: true,
    historyApiFallback: true,
    contentBase: 'demo'
  },
  plugins: [
    ...(IS_PROD ? [] : [new webpack.HotModuleReplacementPlugin()]),
    new webpack.DefinePlugin({
      ENV: JSON.stringify(IS_PROD ? 'production' : 'development')
    }),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      path.join(__dirname, 'src')
    )
  ]
};
