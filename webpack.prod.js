
const { merge } = require("webpack-merge")
const common = require("./webpack.common")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

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
        })
    ]
})