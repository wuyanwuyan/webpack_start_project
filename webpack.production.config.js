var webpack = require('webpack')
var path = require('path')


const ROOT_PATH = path.resolve(__dirname)
const SRC_PATH = path.resolve(ROOT_PATH, 'src')
const DIST_PATH = path.resolve(ROOT_PATH, 'dist')
const MODULE_PATH = path.resolve(ROOT_PATH, 'node_modules')

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
console.log('+++++++++++++++++++++', path)

module.exports = {
    context: SRC_PATH,
    entry: {
        mainPage: './main/index',
        vendors: ['jquery','bootstrap']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[name].js'
        // , publicPath: "/static/build/",     //webpack-dev-server访问的路径 publicPath是为webpack-dev-server所使用
        // ,chunkFilename: "chunk.[name].js"
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            bootstrap:'bootstrap'
        }),
        new ExtractTextPlugin("[name].css")
        // ,new webpack.optimize.UglifyJsPlugin() // 代码压缩plugin
        // ,new HtmlWebpackPlugin()
       // ,new webpack.optimize.CommonsChunkPlugin('common.js',[])  // // 用于多个HTML页面的时候，默认会把所有入口节点的公共代码提取出来,生成一个common.js ，必须遵循commonJS吗？
       //  { minChunks: 3,
       //      name: "common-app.chunk",
       //      chunks: ["home", "detail", "list"]}
    ],
    module: {
        loaders: [
            // {test: /\.css$/, loader: 'style!css'},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},  ////图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            {test: /\.css$/,loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            {test: path.join(config.path.src, 'jquery'),loader: 'expose?jQuery'}    //将jquery暴露到全局
        ]
    },
    resolveLoader: {
        // root: path.join(__dirname, "node_modules")
    },
    resolve: {
        extensions: ['', '.coffee', '.js'],
        alias: {  // 别名，提高搜索效率，打包效率
            'jquery': path.resolve(SRC_PATH, './libs/jquery.js'),
            'bootstrap':path.resolve(SRC_PATH, './libs/bootstrap/js/bootstrap')
        }
    },
    // externals: {
    //     'jquery': 'jquery' //  需要在HTML文件里用<script>标签引入
    // },
    devtool: 'source-map'
}




