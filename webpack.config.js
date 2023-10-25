
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {

    mode : "development",

    entry : {

        bundle : path.resolve(__dirname, "./src/index.js"),
    },

    output : {
        path : path.resolve(__dirname, "dist"),
        filename : "[name].js",
        clean : true,
        assetModuleFilename : "[name][ext]"
    },

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

    devtool : "source-map", // "inline-source-map" written in docs.

    // optimization : {
    //     runTimeChunk : "single" //! throws error
    // },
    

    module : {

        rules : [

            {
                test : /\.css$/,
                use : [ 
                    "style-loader", 
                    "css-loader",
                    {
                        loader : "postcss-loader",
                        options : {
                            postcssOptions : {
                                plugins : [
                                    "postcss-preset-env"
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test : /\.js$/,
                exclude : /node_modules/,
                use : {
                    loader : "babel-loader",
                    options : {
                        presets : ["@babel/preset-env"]
                    }
                }
            },
            {
                test : /\.(png|jpg|jpeg|svg|gif|jif|webp)$/i,
                type : "asset/resource"
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            }
        ]
    },

    plugins : [

        new HtmlWebpackPlugin({
            title : "Webpack Tutorial",
            filename : "index.html",
            template : "./src/template.html"
        })
    ]

}