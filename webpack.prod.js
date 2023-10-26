
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
                        loader : MiniCssExtractPlugin.loader,
                        options : {
                            // hmr : process.env.NODE_ENV === "development"
                        }
                    },
                    "css-loader",
                    {
                        loader : "postcss-loader",
                        //** POSTCSS OPTIONS BURAYA */
                        options : {
                            postcssOptions : {
                                //** POSTCSS PLUGIN'LER BURAYA */
                                plugins : [
                                    [
                                        "postcss-preset-env",
                                        {
                                            //** POSTCSS-PRESET-ENV OPTIONS BURAYA */
                                            stage: 3,
                                            features: {
                                              'nesting-rules': true
                                            },
                                            env : "development",
                                            browsers : "last 4 versions",
                                            //** EXTRA AUTOPREFIXER AYARI YAPCAKSAN DA BURAYA */
                                            // // autoprefixer : {
                                            // //     grid : true
                                            // // }
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