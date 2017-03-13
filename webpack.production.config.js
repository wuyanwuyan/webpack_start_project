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

var mainPageChunks = ["libs", "pageIndex/mainPage"];
var mainPageHtmlConfig = {
    favicon : './assets/logo.ico',
    template: 'index_origin.html',    //html模板路径
    filename: 'index.html',
    inject: true,    //允许插件修改哪些内容，包括head与body
    // hash: true,    //为静态资源生成hash值
    showErrors : false,
    chunks: mainPageChunks,
    chunksSortMode: function (a, b) {  // 这边如果用none，排序有问题。自己定义排序
        return mainPageChunks.indexOf(a.names[0]) - mainPageChunks.indexOf(b.names[0]);
    },
    minify: {
        collapseWhitespace : true,
        removeComments : true
    }
}


module.exports = {
    context: SRC_PATH,
    entry: {
        "libs": ['jquery', 'bootstrap', 'ztree'],
        "pageIndex/mainPage": './js/main/index'
    },
    output: {
        path: DIST_PATH,
        filename: 'js/[name].[chunkhash].js',    //'js/[name].[chunkhash].js',
        publicPath: "/",     //webpack-dev-server访问的路径 publicPath是为webpack-dev-server所使用
        // ,chunkFilename: "chunk.[name].js"
    },
    plugins: [
        new HtmlWebpackPlugin(mainPageHtmlConfig),
        new webpack.ProvidePlugin({
            // $: 'jquery',    // 会被打包进entry里面
            // jQuery: 'jquery'
            // WdatePicker : 'WdatePicker'
        }),
        new ExtractTextPlugin("css/[name].[contenthash].css"),
        new webpack.optimize.DedupePlugin(), // 查找相等或近似的模块，去除重复的代码，避免在最终生成的文件中出现重复的模块
        new webpack.optimize.OccurenceOrderPlugin(),  // 按引用频度来排序 ID，以便达到减少文件大小的效果
        new webpack.optimize.UglifyJsPlugin(
            {
                compress: {warnings: false, drop_console: true},
                output: {comments: false},
            }
        ), // 代码压缩plugin
        // ,new webpack.optimize.CommonsChunkPlugin(
        //     {name:'commonHelllo',chunks:['libs']})  // // 用于多个HTML页面的时候，默认会把所有入口节点的公共代码提取出来,生成一个common.js ，必须遵循commonJS吗？
        //  { minChunks: 3,
        //      name: "common-app.chunk",
        //      chunks: ["home", "detail", "list"]}
    ],
    module: {
        // noParse : ["WdatePicker"],
        loaders: [
            // {test: /\.css$/, loader: 'style!css'},   // 将CSS一起打包进js文件
            {test: /\.(png|jpg|gif|svg|ico)$/,
                loader: 'url?limit=8192&name=assets/[name].[hash].[ext]'},  ////图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style", ["css","postcss"])},  // 将CSS文件提取出来
            // { test: require.resolve('jquery'), loader: 'expose?jQuery!expose?$' },    //从 npm 模块中将 jquery 挂载到全局
            // {test: require.resolve('bootstrap'), loader: 'expose?bootstrap'}    //将bootstrap暴露到全局
            {
                test   : /\.woff/,
                loader : 'url?prefix=font/&limit=10000&mimetype=application/font-woff&name=assets/[name].[hash].[ext]'
            }, {
                test   : /\.ttf/,
                loader : 'file?prefix=font/&name=assets/[name].[hash].[ext]'
            }, {
                test   : /\.eot/,
                loader : 'file?prefix=font/&name=assets/[name].[hash].[ext]'
            }
        ]
    },
    resolve: {
        root: [SRC_PATH, MODULE_PATH],
        extensions: ['.js', ''],
        alias: {  // 别名，提高搜索效率，打包效率
            'jquery': path.resolve(SRC_PATH, './js/libs/jquery'),
            'bootstrap': path.resolve(SRC_PATH, './js/libs/bootstrap/js/bootstrap'),
            'ztree': path.resolve(SRC_PATH, './js/libs/zTree/js/jquery.ztree.all'),
            'WdatePicker': path.resolve(SRC_PATH, './js/libs/My97DatePicker/WdatePicker')
        }
    },
    postcss: [
        require('autoprefixer')()
    ]
    // externals: {
    //     'jquery': 'jquery' //  需要在HTML文件里用<script>标签引入
    // }
}




