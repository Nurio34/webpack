
const { merge } = require("webpack-merge")
const common = require("./webpack.common")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common,{

    mode : "production",

    module : {

        rules : [

            {
                test : /\.css$/,
                use : [ 
                    {
                        loader : MiniCssExtractPlugin.loader
                    },
                    "css-loader",
                    "postcss-loader"
                ]
            }
        ]
    },

    plugins : [

        new MiniCssExtractPlugin({
            filename : "[name].css"
        }),

        new CopyPlugin({
            patterns: [
                { from: 'src/manifest.json', to: 'manifest.json' }, // Adjust the paths as needed
            ],
        }),
    ]
})