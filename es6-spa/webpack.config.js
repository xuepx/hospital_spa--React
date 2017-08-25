const webpack = require("webpack");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const compiler = webpack({
    entry: "./entry.jsx",
    output:{
        path: path.resolve(__dirname, "./dist"),
        filename:"code.min.js"
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                include:[path.resolve(__dirname, "./")],
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
    //devtool:"cheap-module-eval-source-map",
    plugins: [
        new HtmlWebpackPlugin({
            template:'./temp.html',
            filename:'./index.html',
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

compiler.run((err, stats) => {
    if (err || stats.hasErrors())console.log(stats.compilation.errors);
    else{
        console.log('set \'React\' package success!');
        let num=0;
        const watching = compiler.watch({
            aggregateTimeout: 300,
            poll: undefined
        }, (err, stats) => {
            if (err || stats.hasErrors())console.log(stats.compilation.errors);
        else{console.log('package success : '+(++num))}
        })
    }
})