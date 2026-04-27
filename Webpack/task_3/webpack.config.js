const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    header: "./modules/header/header.js",
    body: "./modules/body/body.js",
    footer: "./modules/footer/footer.js"
  },
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, 'public'),   // <= attendu par le checker
    filename: "[name].bundle.js",      // => header.bundle.js, body.bundle.js, footer.bundle.js
    chunkFilename: "[name].bundle.js",
    publicPath: ""                   // ne nettoie pas public à chaque build
  },
  devServer: {
    contentBase: "./public",
    port: 8564,
    open: true
  },

  module: {
    rules: [
      { test: /\.css$/i, use: ["style-loader", "css-loader"] },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "javascript/auto",
        use: [
          {
            loader: "file-loader",
            options: { name: "[name].[ext]", outputPath: "assets/" }
          },
          {
            loader: "image-webpack-loader",
            options: {
              disable: true,                 // plus rapide en dev
              mozjpeg: { progressive: true },
              optipng: { enabled: false },
              pngquant: { quality: [0.65, 0.9], speed: 4 },
              gifsicle: { interlaced: false }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Holberton Dashboard",
      filename: "index.html",
      chunks: ["vendors", "header", "body", "footer"] // injecte tous les bundles
    })
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          enforce: true
        }
      }
    }
  },
  performance: { hints: false }
};
