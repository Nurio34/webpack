
const { merge } = require("webpack-merge")
const common = require("./webpack.common")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = merge(common,{

    mode : "production",

    devtool : "source-map",

    module : {

        rules : [

            {
                test : /\.css$/,
                use : [ 
                    {
                        loader : MiniCssExtractPlugin.loader
                    },
                    "css-loader",
                    {
                        loader : "postcss-loader",
                        options : {

                            postcssOptions : {
                                plugins : [
                                    [
                                        "postcss-preset-env",
                                        {
                                            stage: 3,
                                            features: {
                                              'nesting-rules': true
                                            },
                                            env : "production",
                                            browsers : "last 4 versions",
                                        }
                                    ],
                                    [
                                        "cssnano"
                                    ],
                                    [
                                        "rucksack-css"
                                    ]
                                ]
                            }
                        }
                    }
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