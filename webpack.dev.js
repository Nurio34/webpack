
const { merge } = require("webpack-merge")
const common = require("./webpack.common")

module.exports = merge(common,{

    mode : "development",

    devServer : {

        static : "./dist",
        port : 3000,
        open : true,
        hot : true,
        compress : true,
        historyApiFallback : true
    },

    devtool : "inline-source-map",
    
    module : {

        rules : [
            {
                test : /\.css$/,
                use : [
                    "style-loader",
                    {
                        loader : "css-loader",
                        options : {
                            sourceMap : true
                        }
                    },
                    {
                        loader : "postcss-loader",
                        options : {
                            sourceMap : true,

                            postcssOptions : {
                                plugins : [
                                    [
                                        "postcss-preset-env",
                                        {
                                            stage: 3,
                                            features: {
                                              'nesting-rules': true
                                            },
                                            env : "development",
                                            browsers : "last 4 versions",
                                        }
                                    ],
                                    [
                                        "rucksack-css"
                                    ]
                                ]
                            }
                        }
                    }
                ]
            },
        ]
    },
})