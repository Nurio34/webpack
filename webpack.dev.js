
const { merge } = require("webpack-merge")
const common = require("./webpack.common")

module.exports = merge(common,{

    mode : "development",

    devServer : {

        static : "./dist",
        hot : true,
        port : 3000,
        open : true,
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
                        }
                    }
                ]
            },
        ]
    },
})