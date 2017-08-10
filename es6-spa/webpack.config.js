const webpack = require("webpack");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const compiler = webpack({
    entry: {
        family: ["react", "react-dom" ,"react-router-dom","react-redux","redux","redux-thunk","react-addons-css-transition-group","iscroll"],
        main : ["./entry.jsx"]
    },
    output:{
        path: path.resolve(__dirname, "./dist"),
        filename:"code.min.js"
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                include:[path.resolve(__dirname, "./css")],
                loader:"style-loader!css-loader?minimize=true"
            },
            {
                test:/\.js$/,
                include:[path.resolve(__dirname, "./")],
                loader:"babel-loader",
                options: {
                    presets: ['es2015',"stage-0"]
                }
            },
            {
                test:/\.jsx$/,
                include:[path.resolve(__dirname, "./")],
                loader:"babel-loader",
                options: {
                    presets: ['es2015',"stage-0","react"],
                    plugins: ["transform-decorators-legacy"]
                }
            },
            {
                test: /\.(png|jpeg|jpg)$/,
                include:[path.resolve(__dirname, "./img")],
                loader:'file-loader?name=img/[name]-[hash].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "family",
            filename: "family.min.js"
        }),
        new HtmlWebpackPlugin({
            template:'./temp.html',
            filename:'./spa.html',
            inject:'body',
            minify:{
                removeComments:true,
                collapseWhitespace:true
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new UglifyJSPlugin({
            comments:false
        }),
    ]
});


let num=0;
const watching = compiler.watch({
    aggregateTimeout: 300,
    poll: undefined
}, (err, stats) => {
    if (err || stats.hasErrors())console.log(stats.compilation.errors);
    else{console.log('package success : '+(++num))}
})