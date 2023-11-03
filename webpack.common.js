
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
                test: /\.(png|jpg|jpeg|svg|gif|jif|webp)$/i,
                type: "asset/resource"
            }
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
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        clean: true,
        assetModuleFilename: "[name][ext]"
    },

    
}