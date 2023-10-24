
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    
    entry: "./src/index.js",

    mode: "development",

    devServer: {
        static: "./dist"
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                      presets: ['@babel/preset-env']
                    }
                  }
            },
            {
                test: /\.scss$/i,
                use: [ 
                    {
                        loader: MiniCssExtractPlugin.loader,
                        // options: {
                        //     hmr: process.env.NODE_ENV === "development"
                        // }
                    },
                    "css-loader", 
                    "postcss-loader",
                    "sass-loader" ]
            }
        ]
    },

    plugins: [
        
        new HtmlWebpackPlugin({
            title : "Webpack try5",
        }),

        new MiniCssExtractPlugin({
            filename: "[name].css"
        })
        
    ],

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    }

}