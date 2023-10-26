
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
// // const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {

    // // mode : "development",

    entry : {

        bundle : path.resolve(__dirname, "./src/index.js"),
    },

    // // devServer : {

    // //     static : {
    // //         directory : path.resolve(__dirname, "dist")
    // //     },
    // //     port : 3000,
    // //     open : true,
    // //     hot : true,
    // //     compress : true,
    // //     historyApiFallback : true
    // // },

    // // devtool : "source-map",

    // optimization : {
    //     runTimeChunk : "single" //! throws error
    // },
    

    module : {

        rules : [

            // // {
            // //     test : /\.css$/,
            // //     use : [ 
            // //         // // {
            // //         // //     loader : MiniCssExtractPlugin.loader,
            // //         // //     options : {
            // //         // //         // hmr : process.env.NODE_ENV === "development"
            // //         // //     }
            // //         // // },
            // //         {
            // //             loader : "css-loader",
            // //         },
            // //         {
            // //             loader : "postcss-loader",
            // //             //** POSTCSS OPTIONS BURAYA */
            // //             options : {
            // //                 sourceMap : true,
            // //                 postcssOptions : {
            // //                     //** POSTCSS PLUGIN'LER BURAYA */
            // //                     plugins : [
            // //                         [
            // //                             "postcss-preset-env",
            // //                             {
            // //                                 //** POSTCSS-PRESET-ENV OPTIONS BURAYA */
            // //                                 stage: 3,
            // //                                 features: {
            // //                                   'nesting-rules': true
            // //                                 },
            // //                                 env : "development",
            // //                                 browsers : "last 4 versions",
            // //                                 //** EXTRA AUTOPREFIXER AYARI YAPCAKSAN DA BURAYA */
            // //                                 // // autoprefixer : {
            // //                                 // //     grid : true
            // //                                 // // }
            // //                             }
            // //                         ],
            // //                         [
            // //                             "cssnano"
            // //                         ],
            // //                         [
            // //                             "rucksack-css"
            // //                         ]
            // //                     ]
            // //                 }
            // //             }
            // //         }
            // //     ]
            // // },
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
            }
            // // {
            // //     test: /\.(woff|woff2|eot|ttf|otf)$/i,
            // //     type: 'asset/resource',
            // // }
        ]
    },

    plugins : [

        new HtmlWebpackPlugin({
            title : "Webpack Tutorial",
            filename : "index.html",
            template : "./src/template.html"
            }
        )

        // // new MiniCssExtractPlugin({
        // //     filename : "[name].css"
        // // })
    ],

    output : {
        path : path.resolve(__dirname, "dist"),
        filename : "[name].js",
        clean : true,
        assetModuleFilename : "[name][ext]"
    }
}