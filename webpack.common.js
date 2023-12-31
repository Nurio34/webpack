
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {

    entry: {

        bundle: {
            import: "./src/js/index.js",
            dependOn: "shared"
        },
        shared: "lodash"
    },

    module: {

        rules: [

            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },

            {
                test: /\.(png|jpe?g|gif|svg|mp3|wav|webp)$/i,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: 'assets/',
                    },
                  },
                ],
            },
        ]
    },

    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },

    plugins: [

        new HtmlWebpackPlugin({
            title: "Webpack Tutorial",
            filename: "index.html",
            template: "./src/template.html",
            inject : true
        })
    ],

    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].js",
        clean: true,
        assetModuleFilename: "[name][ext]"
    },

    
}