
const { merge } = require("webpack-merge")
const common = require("./webpack.common")
const path = require("path")
module.exports = merge(common,{

    mode : "development",

    devServer : {

        static : {
            directory : path.resolve(__dirname, "dist")
        },
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
                    {
                        loader : "css-loader",
                    },
                    {
                        loader : "postcss-loader",
                        //** POSTCSS OPTIONS BURAYA */
                        options : {
                            sourceMap : true,
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
            },
        ]
    },
})