
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {

    entry: {

        bundle: {
            import: "./src/js/index.js",
            dependOn: "shared"
        },
        joke: {
            import: "./src/js/joke.js",
            dependOn: "shared"
        },
        generateJoke: {
            import: "./src/js/generateJoke.js",
            dependOn: "shared"
        },
        shared: "lodash"
    },

    module: {

        rules: [

            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    targets: {
                                        node: "current"
                                    }
                                }
                            ]
                        ]
                    }
                }
            },

            {
                test: /\.(png|jpg|jpeg|svg|gif|jif|webp)$/i,
                type: "asset/resource"
            }
        ]
    },

    plugins: [

        new HtmlWebpackPlugin({
            title: "Webpack Tutorial",
            filename: "index.html",
            template: "./src/template.html"
        }
        )
    ],

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        clean: true,
        assetModuleFilename: "[name][ext]"
    },

    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            chunks: 'all',
        },
    }
}