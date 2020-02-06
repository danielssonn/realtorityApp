const { CheckerPlugin } = require('awesome-typescript-loader');
const { join } = require('path');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    contentPage: join(__dirname, 'src/contentPage.ts'),
    backgroundPage: join(__dirname, 'src/backgroundPage.ts')
  },
  output: {
    path: join(__dirname, '../angular/dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts?$/,
        use: 'awesome-typescript-loader?{configFileName: "chrome/tsconfig.json"}'
      }
    ]
  },
  plugins: [new CheckerPlugin(),
    new CopyPlugin([
    { from: join(__dirname, 'manifest.json'), 
      to: join(__dirname,'../angular/dist/manifest.json')
     
    }
   
  ]),],
  resolve: {
    extensions: ['.ts', '.js']
  }
};
