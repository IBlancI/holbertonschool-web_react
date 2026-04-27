const path = require("path");

module.exports = {
  mode: "production",
  entry: "./js/dashboard_main.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      { test: /\.css$/i, use: ["style-loader", "css-loader"] },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "javascript/auto",
        use: [
          { loader: "file-loader", options: { name: "[name].[ext]", outputPath: "assets/" } },
          { loader: "image-webpack-loader", options: { disable: true } }
        ]
      }
    ]
  }
};
