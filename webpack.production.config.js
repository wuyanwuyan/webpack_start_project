var dev = 'release'

var webpack = require('webpack')
var path = require('path')


const ROOT_PATH = path.resolve(__dirname)
const SRC_PATH = path.resolve(ROOT_PATH, 'src')
const DIST_PATH = path.resolve(ROOT_PATH, dev)
const MODULE_PATH = path.resolve(ROOT_PATH, 'node_modules')

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');

var mainPageChunks = ["libs", "pageIndex/mainPage"];
var mainPageHtmlConfig = {
    favicon: './assets/logo.ico',
    template: 'index_origin.html',    //html模板路径
    filename: 'index.html',
    inject: true,    //允许插件修改哪些内容，包括head与body
    // hash: true,    //为静态资源生成hash值
    showErrors: false,
    chunks: mainPageChunks,
    chunksSortMode: function (a, b) {  // 这边如果用none，排序有问题。自己定义排序
        return mainPageChunks.indexOf(a.names[0]) - mainPageChunks.indexOf(b.names[0]);
    },
    minify: {
        removeComments: true,
        collapseWhitespace: true
    }
}

/**
 * 根据debug的配置，修改差异性，成为最终发布的配置
 */
var debugConfig = require('./webpack.config');
debugConfig.output = {
    path: DIST_PATH,
    filename: 'js/[name].[chunkhash].js',    //'js/[name].[chunkhash].js',
    publicPath: "/",     //webpack-dev-server访问的路径 publicPath是为webpack-dev-server所使用
    // ,chunkFilename: "chunk.[name].js"
}

debugConfig.plugins = [
    new HtmlWebpackPlugin(mainPageHtmlConfig),
    new webpack.ProvidePlugin({
        // $: 'jquery',    // 会被打包进entry里面
        // jQuery: 'jquery'
        // WdatePicker : 'WdatePicker'
    }),
    new ExtractTextPlugin("css/[name].[chunkhash].css"),
    new WebpackMd5Hash(), // 解决修改css改变js的hash问题
    new CopyWebpackPlugin([{ from: 'js/libs/polyfill', to: 'js/polyfill' }]),   // 拷贝文件（一些腻子脚本）到发布目录
    new webpack.optimize.UglifyJsPlugin(
        {
            compress: {warnings: false},
            output: {comments: false},
            except: ['$'] //排除关键字
        }
    ) // 代码压缩plugin

]

debugConfig.module = {
    // noParse : ["WdatePicker"],
    loaders: [
        // {test: /\.css$/, loader: 'style!css'},   // 将CSS一起打包进js文件
        {
            test: /\.(png|jpg|gif|svg|ico)$/,
            loader: 'url?limit=8192&name=assets/[name].[hash].[ext]'
        },  ////图片文件使用 url-loader 来处理，小于8kb的直接转为base64
        {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader?"+ JSON.stringify({discardComments: {removeAll: true}}))},  // 将CSS文件提取出来
        // { test: require.resolve('jquery'), loader: 'expose?jQuery!expose?$' },    //从 npm 模块中将 jquery 挂载到全局
        // {test: require.resolve('bootstrap'), loader: 'expose?bootstrap'}    //将bootstrap暴露到全局
        {
            test: /\.woff/,
            loader: 'url?prefix=font/&limit=10000&mimetype=application/font-woff&name=assets/[name].[hash].[ext]'
        }, {
            test: /\.(ttf|eot)$/,
            loader: 'file?prefix=font/&name=assets/[name].[hash].[ext]'
        },
        { test: /\.html$/, loader: "html?-minimize"  } //避免压缩html,https://github.com/webpack/html-loader/issues/50
    ]
}

delete debugConfig.devtool;

module.exports = debugConfig;




