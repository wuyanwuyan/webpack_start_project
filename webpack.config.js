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
        valis:['jquery','bootstrap','test1','test2']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[name].js'
        // , publicPath: "/static/build/",     //webpack-dev-server访问的路径 publicPath是为webpack-dev-server所使用
        // ,chunkFilename: "chunk.[name].js"
    },
    plugins: [
        new webpack.ProvidePlugin({
            // $: 'jquery',    // 会被打包进entry里面
            // jQuery: 'jquery'
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
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},  ////图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            {test: /\.css$/,loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            // { test: require.resolve('jquery'), loader: 'expose?jQuery!expose?$' },    //从 npm 模块中将 jquery 挂载到全局
            // {test: require.resolve('bootstrap'), loader: 'expose?bootstrap'}    //将bootstrap暴露到全局
        ]
    },
    resolveLoader: {
        // root: path.join(__dirname, "node_modules")
    },
    resolve: {
        extensions: ['.js', ''],
        alias: {  // 别名，提高搜索效率，打包效率
            'jquery': path.resolve(SRC_PATH, './libs/jquery'),
            'bootstrap':path.resolve(SRC_PATH, './libs/bootstrap/js/bootstrap'),
            'test1':path.resolve(SRC_PATH, './libs/testJs'),
            'test2':path.resolve(SRC_PATH, './libs/testJs2')
        }
    },
    // externals: {
    //     'jquery': 'jquery' //  需要在HTML文件里用<script>标签引入
    // },
    devtool: 'source-map'
}




