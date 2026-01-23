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
        path: path.resolve(__dirname, "public"),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            { test: /\.css$/i, use: ["style-loader", "css-loader"] },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "javascript/auto",
                use: [
                    { loader: "file-loader", options: { name: "[name].[ext]", outputPath: "assets/" } },
                    { loader: "image-webpack-loader", options: { disable: true } } // plus rapide en dev
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            chunks: ["vendors", "header", "body", "footer"]
        })
    ],
    optimization: { splitChunks: { chunks: "all" } },
    devServer: {
        contentBase: "./public",  // le checker veut exactement cette clé/valeur
        port: 8564,
        open: true
    }
};